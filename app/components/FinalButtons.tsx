"use client";
import { useState } from "react";

// Configure your WhatsApp number here (format: international, no +)
const WHATSAPP_NUMBER = ""; // e.g. "919876543210"

const finalChoices = [
  {
    emoji: "❤️",
    label: "I want to talk",
    response:
      "My heart is full right now. Whenever you're ready — one hour, one day, or one week from now — I will be here. Just say the word, and we will find a time that works for you.",
    color: "#c0392b",
    bg: "#fff5f5",
    message: "I want to talk. Can we arrange a time?",
  },
  {
    emoji: "🤍",
    label: "I need some time",
    response:
      "Take all the time you need. I mean that genuinely. There is no deadline here, no pressure. When you feel ready to reach out, I will be waiting — with patience, not expectation.",
    color: "#7f8c8d",
    bg: "#f9f9f9",
    message: "I need some time, but I received your message.",
  },
  {
    emoji: "🌱",
    label: "Let's start slowly",
    response:
      "Slowly is perfectly fine. We can start with something small — a short message, a quiet coffee, or just saying hello. Every tiny step towards each other matters to me.",
    color: "#27ae60",
    bg: "#f0fff4",
    message: "Let's start slowly. Can we take it one step at a time?",
  },
];

export default function FinalButtons() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelected(i);
    if (typeof window !== "undefined" && window.__analytics) {
      window.__analytics.trackFinalChoice(finalChoices[i].label);
    }
  };

  const openWhatsApp = (message: string) => {
    if (!WHATSAPP_NUMBER) return;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  const current = selected !== null ? finalChoices[selected] : null;

  return (
    <div className="mt-16 text-center">
      <p
        className="mb-8"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.3rem",
          fontStyle: "italic",
          color: "var(--text-mid)",
        }}
      >
        Whenever you feel ready, you can let me know…
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {finalChoices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="rounded-full px-7 py-4 text-sm font-medium"
            style={{
              fontFamily: "Lato, sans-serif",
              background: selected === i ? choice.color : "white",
              color: selected === i ? "white" : choice.color,
              border: `2px solid ${choice.color}`,
              boxShadow: selected === i
                ? `0 4px 20px ${choice.color}40`
                : "0 2px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              transform: selected === i ? "scale(1.05)" : "scale(1)",
            }}
          >
            {choice.emoji} {choice.label}
          </button>
        ))}
      </div>

      {current && (
        <div
          className="mx-auto max-w-lg rounded-3xl p-8 mt-8 animate-fade-in"
          style={{
            background: current.bg,
            border: `1px solid ${current.color}25`,
            boxShadow: `0 4px 24px ${current.color}15`,
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "var(--text-dark)",
              lineHeight: "1.8",
            }}
          >
            &ldquo;{current.response}&rdquo;
          </p>

          {WHATSAPP_NUMBER && (
            <button
              onClick={() => openWhatsApp(current.message)}
              className="mt-6 rounded-full px-6 py-3 text-sm flex items-center gap-2 mx-auto"
              style={{
                background: "#25d366",
                color: "white",
                fontFamily: "Lato, sans-serif",
                border: "none",
                boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send via WhatsApp
            </button>
          )}
        </div>
      )}
    </div>
  );
}
