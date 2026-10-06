"use client";
import { useState } from "react";

const commitments = [
  {
    icon: "👂",
    title: "Listen better",
    body: "I will try to understand your feelings before defending myself. Your voice matters, and I want to truly hear it.",
    accent: "#9b3a4a",
  },
  {
    icon: "🕊️",
    title: "Communicate calmly",
    body: "When we disagree, I want us to talk instead of hurting each other. Disagreements can be handled with kindness.",
    accent: "#5c6bc0",
  },
  {
    icon: "🌿",
    title: "Respect your space",
    body: "I won't force you to respond before you're ready. Your peace matters, and I will honour it.",
    accent: "#27ae60",
  },
  {
    icon: "🌟",
    title: "Earn your trust",
    body: "I understand that trust is rebuilt through consistent actions, not promises. I want to prove it through what I do.",
    accent: "#c9a96e",
  },
  {
    icon: "💑",
    title: "Choose us",
    body: "I want to work on our relationship instead of treating every disagreement like the end. I choose us, every day.",
    accent: "#c0392b",
  },
];

export default function CommitmentsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="commitments"
      className="relative z-10 py-20 px-4"
      style={{ background: "linear-gradient(180deg, #fef5f0 0%, #fdf8f2 100%)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-sm uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
        >
          My promise to you
        </p>
        <h2
          className="mb-4"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 300,
            color: "var(--maroon)",
          }}
        >
          If you give us another chance…
        </h2>
        <p
          className="mb-12"
          style={{ color: "var(--text-light)", fontSize: "1rem", fontFamily: "Lato, sans-serif", maxWidth: "500px", margin: "0 auto 3rem" }}
        >
          These are not grand promises. They are sincere intentions I want to grow into.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {commitments.map((c, i) => (
            <button
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="commitment-card rounded-3xl p-6 text-left w-full"
              style={{
                background: expanded === i ? `${c.accent}10` : "white",
                border: `1px solid ${expanded === i ? c.accent + "40" : "#f0e4dc"}`,
                boxShadow: "0 2px 16px rgba(107,26,42,0.06)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{c.icon}</div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color: expanded === i ? c.accent : "var(--maroon)",
                  marginBottom: "0.5rem",
                }}
              >
                {c.title}
              </h3>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: expanded === i ? "200px" : "0px",
                  transition: "max-height 0.4s ease, opacity 0.4s ease",
                  opacity: expanded === i ? 1 : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "0.92rem",
                    color: "var(--text-mid)",
                    lineHeight: "1.65",
                    paddingTop: "0.25rem",
                  }}
                >
                  {c.body}
                </p>
              </div>
              <div
                className="mt-3 flex items-center gap-1"
                style={{ color: c.accent, fontSize: "0.8rem", fontFamily: "Lato, sans-serif" }}
              >
                {expanded === i ? "▲ close" : "▼ read more"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
