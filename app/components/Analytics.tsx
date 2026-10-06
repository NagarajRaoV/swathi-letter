"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    __analytics?: {
      sessionId: string;
      trackSection: (section: string) => void;
      trackFeeling: (feeling: string) => void;
      trackFinalChoice: (choice: string) => void;
    };
  }
}

function generateSessionId() {
  const existing = sessionStorage.getItem("swathi_session_id");
  if (existing) return existing;
  const id = "s_" + Math.random().toString(36).slice(2, 12);
  sessionStorage.setItem("swathi_session_id", id);
  return id;
}

export type AnalyticsEvent =
  | { type: "section_opened"; section: string }
  | { type: "feeling_selected"; feeling: string }
  | { type: "final_choice"; choice: string };

export default function Analytics() {
  useEffect(() => {
    const sessionId = generateSessionId();
    const events: Array<{ timestamp: number; event: AnalyticsEvent }> = [];

    const record = (event: AnalyticsEvent) => {
      const entry = { timestamp: Date.now(), event };
      events.push(entry);
      try {
        const stored = JSON.parse(sessionStorage.getItem("swathi_events") || "[]");
        stored.push(entry);
        sessionStorage.setItem("swathi_events", JSON.stringify(stored));
      } catch {
        // Storage unavailable — silently skip
      }
      // Send to server for email notification
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, session: sessionId }),
      }).catch(() => {});
      if (process.env.NODE_ENV === "development") {
        console.log("[Analytics]", { sessionId, ...event });
      }
    };

    // Expose analytics tracker globally
    window.__analytics = {
      sessionId,
      trackSection: (section: string) => record({ type: "section_opened", section }),
      trackFeeling: (feeling: string) => record({ type: "feeling_selected", feeling }),
      trackFinalChoice: (choice: string) => record({ type: "final_choice", choice }),
    };

    // Track section visibility
    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            record({ type: "section_opened", section: id });
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      sectionObserver.disconnect();
      delete window.__analytics;
    };
  }, []);

  return null;
}
