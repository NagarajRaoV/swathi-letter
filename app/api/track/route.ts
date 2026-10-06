import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "";

const LABELS: Record<string, string> = {
  section_opened: "📖 Opened section",
  feeling_selected: "💬 Selected feeling",
  final_choice: "✅ Made final choice",
};

interface GeoResult {
  city?: string;
  regionName?: string;
  country?: string;
  isp?: string;
  status: string;
}

function parseUserAgent(ua: string): string {
  if (!ua) return "Unknown";

  // Device type
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  // OS
  let os = "Unknown OS";
  if (/Windows NT 10/i.test(ua)) os = "Windows 11/10";
  else if (/Windows NT 6\.3/i.test(ua)) os = "Windows 8.1";
  else if (/Windows/i.test(ua)) os = "Windows";
  else if (/iPhone OS ([\d_]+)/i.test(ua)) os = `iOS ${ua.match(/iPhone OS ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/iPad.*OS ([\d_]+)/i.test(ua)) os = `iPadOS ${ua.match(/iPad.*OS ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/Android ([\d.]+)/i.test(ua)) os = `Android ${ua.match(/Android ([\d.]+)/i)![1]}`;
  else if (/Mac OS X ([\d_]+)/i.test(ua)) os = `macOS ${ua.match(/Mac OS X ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/Linux/i.test(ua)) os = "Linux";

  // Browser
  let browser = "Unknown Browser";
  if (/Edg\/([\d.]+)/i.test(ua)) browser = `Edge ${ua.match(/Edg\/([\d.]+)/i)![1]}`;
  else if (/OPR\/([\d.]+)/i.test(ua)) browser = `Opera ${ua.match(/OPR\/([\d.]+)/i)![1]}`;
  else if (/Chrome\/([\d.]+)/i.test(ua)) browser = `Chrome ${ua.match(/Chrome\/([\d.]+)/i)![1].split(".")[0]}`;
  else if (/Firefox\/([\d.]+)/i.test(ua)) browser = `Firefox ${ua.match(/Firefox\/([\d.]+)/i)![1].split(".")[0]}`;
  else if (/Safari\/([\d.]+)/i.test(ua) && /Version\/([\d.]+)/i.test(ua)) browser = `Safari ${ua.match(/Version\/([\d.]+)/i)![1].split(".")[0]}`;

  return `${device} · ${browser} · ${os}`;
}

async function getGeo(ip: string): Promise<string> {
  // Skip loopback / private IPs (local dev)
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return "localhost (dev)";
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country,isp`, {
      signal: AbortSignal.timeout(3000),
    });
    const data: GeoResult = await res.json();
    if (data.status !== "success") return ip;
    return [data.city, data.regionName, data.country].filter(Boolean).join(", ");
  } catch {
    return ip;
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY || !NOTIFY_EMAIL) {
    return NextResponse.json({ ok: false, reason: "not configured" }, { status: 200 });
  }

  let body: { type: string; [key: string]: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Resolve IP from headers (works on Vercel, Netlify, and plain Next.js)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const location = await getGeo(ip);
  const ua = req.headers.get("user-agent") ?? "";
  const deviceInfo = parseUserAgent(ua);

  const { type, ...rest } = body;
  const label = LABELS[type] ?? type;
  const detail = Object.entries(rest)
    .map(([k, v]) => `<b>${k}:</b> ${v}`)
    .join("<br>");
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  await resend.emails.send({
    from: "Swathi Letter <onboarding@resend.dev>",
    to: NOTIFY_EMAIL,
    subject: `${label} — ${Object.values(rest)[0] ?? ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="color:#6b1a2a;margin-bottom:4px;">${label}</h2>
        <p style="color:#888;font-size:13px;margin-top:0;">${time} IST</p>
        <div style="background:#fff5f5;border-radius:12px;padding:16px;margin-top:16px;font-size:15px;line-height:1.7;">
          ${detail}
          <br><b>📍 location:</b> ${location}
          <br><b>💻 device:</b> ${deviceInfo}
          <br><b>🌐 ip:</b> ${ip}
        </div>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
