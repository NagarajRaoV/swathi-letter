"use client";
import { useState } from "react";

const feelings = [
  {
    emoji: "😡",
    label: "I am still angry",
    response:
      "I understand. You don't have to stop being angry just because I am saying sorry. Take your time. I don't want to silence your feelings. I want to understand them.",
    color: "#c0392b",
    bg: "#fff5f5",
  },
  {
    emoji: "💔",
    label: "I am still hurt",
    response:
      "I'm sorry that my actions left a wound in your heart. I don't expect one message to heal it. If you ever allow me the chance, I want to rebuild your trust slowly, through my actions — not my words.",
    color: "#8e44ad",
    bg: "#fdf5ff",
  },
  {
    emoji: "😔",
    label: "I don't know what I feel",
    response:
      "That's okay. You don't have to have everything figured out. Sometimes 'I don't know' is the most honest answer there is. I'm here, without any pressure, whenever you're ready.",
    color: "#5c6bc0",
    bg: "#f5f5ff",
  },
  {
    emoji: "🥺",
    label: "I miss you",
    response:
      "I miss you too. More than I can properly explain. I miss your presence, your voice, your little expressions, and simply having you beside me. Every single day.",
    color: "#c0392b",
    bg: "#fff5f5",
  },
  {
    emoji: "❤️",
    label: "I still care",
    response:
      "Knowing that means everything to me. I care deeply too. And I want to show that through how I act — not just through words on a screen.",
    color: "#e91e8c",
    bg: "#fff0f8",
  },
  {
    emoji: "🌱",
    label: "Maybe we can talk",
    response:
      "Thank you. I won't take that opportunity for granted. We don't have to solve everything in one conversation. We can simply start by listening to each other — with open hearts.",
    color: "#27ae60",
    bg: "#f0fff4",
  },
  {
    emoji: "🤍",
    label: "I am okay now",
    response:
      "That makes me genuinely happy. I hope you're taking care of yourself. And if someday you feel ready — whenever that is — I would love the chance to talk peacefully.",
    color: "#7f8c8d",
    bg: "#f9f9f9",
  },
];

export default function FeelingsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    // Anonymous analytics
    if (typeof window !== "undefined" && window.__analytics) {
      window.__analytics.trackFeeling(feelings[index].label);
    }
  };

  const current = selected !== null ? feelings[selected] : null;

  return (
    <section
      id="feelings"
      className="relative z-10 py-20 px-4"
      style={{ background: "linear-gradient(180deg, #fdf8f2 0%, #fef0ec 100%)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-sm uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
        >
          An open heart
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
          Tell me what your heart feels…
        </h2>
        <p
          className="mb-3"
          style={{ color: "var(--text-light)", fontSize: "0.95rem", fontFamily: "Lato, sans-serif" }}
        >
          These choices are entirely optional. Whatever you feel is valid.
        </p>
        <p
          className="mb-10 text-xs"
          style={{ color: "var(--text-light)", fontFamily: "Lato, sans-serif", opacity: 0.7 }}
        >
          🔒 This website doesn&apos;t collect your location or private information. Your choices here are simply a way for me to understand what you feel comfortable sharing.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {feelings.map((f, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`feeling-btn rounded-2xl p-4 text-left ${selected === i ? "selected" : ""}`}
              style={{
                background: selected === i ? f.bg : "white",
                boxShadow: "0 2px 12px rgba(107,26,42,0.07)",
                borderColor: selected === i ? f.color : "transparent",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{f.emoji}</div>
              <div
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "0.82rem",
                  color: selected === i ? f.color : "var(--text-mid)",
                  fontWeight: selected === i ? 600 : 400,
                  lineHeight: "1.3",
                }}
              >
                {f.label}
              </div>
            </button>
          ))}
        </div>

        {current && (
          <div
            className="mx-auto max-w-xl rounded-3xl p-8 text-left animate-fade-in"
            style={{
              background: current.bg,
              border: `1px solid ${current.color}30`,
              boxShadow: `0 4px 24px ${current.color}15`,
            }}
          >
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "2rem" }}>{current.emoji}</span>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  color: "var(--text-dark)",
                  lineHeight: "1.7",
                }}
              >
                &ldquo;{current.response}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
