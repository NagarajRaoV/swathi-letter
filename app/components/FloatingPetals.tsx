"use client";
import { useEffect, useState } from "react";

interface PetalData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
  opacity: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<PetalData[]>([]);

  useEffect(() => {
    const emojis = ["🌸", "🌹", "✨", "🌺", "💮", "🌷"];
    const generated: PetalData[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 10,
      size: 14 + Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      opacity: 0.25 + Math.random() * 0.35,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute select-none"
          style={{
            left: `${petal.left}%`,
            top: "-40px",
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
            animationName: "petalFall",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
}
