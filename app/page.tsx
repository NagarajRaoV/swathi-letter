"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SectionReveal from "./components/SectionReveal";
import FeelingsSection from "./components/FeelingsSection";
import CommitmentsSection from "./components/CommitmentsSection";
import TimelineSection from "./components/TimelineSection";
import FinalButtons from "./components/FinalButtons";
import Analytics from "./components/Analytics";

const FloatingPetals = dynamic(() => import("./components/FloatingPetals"), { ssr: false });

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const openLetter = () => {
    setLetterOpen(true);
    setTimeout(() => {
      document.getElementById("apology")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", position: "relative" }}>
      <FloatingPetals />
      <Analytics />

      {/* ============ HERO SECTION ============ */}
      <section
        id="hero"
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "100vh",
          padding: "2rem 1.5rem",
          background: "radial-gradient(ellipse at 50% 30%, #fef0ec 0%, #fdf8f2 60%, #fdf5ee 100%)",
        }}
      >
        {/* Decorative border */}
        <div
          className="absolute inset-4 sm:inset-8 rounded-3xl pointer-events-none"
          style={{ border: "1px solid rgba(201,169,110,0.25)" }}
        />

        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
            maxWidth: "640px",
          }}
        >
          {/* Decorative flourish */}
          <p
            className="font-script mb-3"
            style={{ fontSize: "1.1rem", color: "var(--gold)", letterSpacing: "0.05em" }}
          >
            a letter, written with love
          </p>

          <div className="divider-gold mb-6" />

          {/* Name */}
          <h1
            className="hero-title font-serif mb-6"
            style={{
              fontSize: "clamp(4rem, 12vw, 7rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--maroon)",
              letterSpacing: "-0.01em",
            }}
          >
            Swathi{" "}
            <span
              className="animate-heart inline-block"
              style={{ display: "inline-block" }}
            >
              ❤️
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="font-serif mb-10"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
              fontStyle: "italic",
              color: "var(--text-mid)",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
            }}
          >
            I don&apos;t know if these words can reach your heart…<br />
            but I need you to know what is in mine.
          </p>

          <div className="divider-gold mb-10" />

          {/* CTA Button */}
          <button
            onClick={openLetter}
            className="inline-flex items-center gap-3 rounded-full px-10 py-4"
            style={{
              background: "linear-gradient(135deg, var(--maroon) 0%, var(--maroon-light) 100%)",
              color: "white",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.15rem",
              fontStyle: "italic",
              letterSpacing: "0.02em",
              boxShadow: "0 6px 30px rgba(107,26,42,0.3)",
              border: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 40px rgba(107,26,42,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 30px rgba(107,26,42,0.3)";
            }}
          >
            <span>Read what I couldn&apos;t say properly…</span>
            <span style={{ fontSize: "0.9rem" }}>↓</span>
          </button>

          {/* Subtitle hint */}
          <p
            className="mt-8"
            style={{ fontSize: "0.75rem", color: "var(--text-light)", fontFamily: "Lato, sans-serif", opacity: 0.65 }}
          >
            Take your time. There is no rush here.
          </p>
        </div>
      </section>

      {/* ============ CONTENT (hidden until CTA is clicked) ============ */}
      <div
        style={{
          maxHeight: letterOpen ? "none" : "0px",
          overflow: letterOpen ? "visible" : "hidden",
          transition: letterOpen ? "none" : "max-height 0.6s ease",
        }}
      >
        {/* ============ APOLOGY SECTION ============ */}
        <SectionReveal id="apology">
          <section
            className="relative z-10 py-24 px-4"
            style={{
              background:
                "linear-gradient(180deg, #fef5f0 0%, #fdf8f2 100%)",
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-sm uppercase tracking-widest mb-6"
                style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
              >
                From my heart to yours
              </p>

              <h2
                className="font-serif mb-8"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 4rem)",
                  fontWeight: 300,
                  color: "var(--maroon)",
                }}
              >
                I am truly sorry.
              </h2>

              <div className="divider-gold mb-10" />

              {/* Apology body */}
              <div
                className="letter-paper rounded-3xl p-8 sm:p-12 text-left"
                style={{
                  border: "1px solid rgba(201,169,110,0.3)",
                  boxShadow: "0 8px 40px rgba(107,26,42,0.08)",
                }}
              >
                <p
                  className="font-serif mb-6"
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.85",
                    color: "var(--text-dark)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  Swathi, I am writing this not to defend myself, win an argument, or ask you to forget what has happened.
                </p>

                <p
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "1rem",
                    lineHeight: "1.85",
                    color: "var(--text-mid)",
                    marginBottom: "1.5rem",
                  }}
                >
                  I am writing this because I know I have made mistakes. Some of my words and actions have hurt you — and you did not deserve that.
                </p>

                <blockquote
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "linear-gradient(135deg, #fff5f5, #fef0f0)",
                    borderLeft: "4px solid var(--maroon-light)",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      color: "var(--maroon)",
                      lineHeight: "1.8",
                    }}
                  >
                    &ldquo;I am sorry for the moments when I hurt you, disappointed you, failed to understand you, or made you feel that your feelings didn&apos;t matter. You deserved patience, kindness and understanding from me.&rdquo;
                  </p>
                </blockquote>

                <p
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "1rem",
                    lineHeight: "1.85",
                    color: "var(--text-mid)",
                    marginBottom: "1.75rem",
                  }}
                >
                  I know that an apology without changed behaviour is just words. I am not asking you to trust me right now. I am just asking you to know that I see where I went wrong — and I am genuinely, deeply sorry.
                </p>

                <div
                  className="text-center py-4"
                  style={{
                    borderTop: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <p
                    className="font-serif gold-shimmer"
                    style={{
                      fontSize: "1.3rem",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    &ldquo;I cannot change yesterday. But I can change how I show up tomorrow.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ============ FEELINGS SECTION ============ */}
        <SectionReveal delay={100}>
          <FeelingsSection />
        </SectionReveal>

        {/* ============ LOVE SECTION ============ */}
        <SectionReveal delay={100}>
          <section
            id="love"
            className="relative z-10 py-24 px-4"
            style={{
              background: "linear-gradient(180deg, #fdf8f2 0%, #fef5f0 100%)",
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-sm uppercase tracking-widest mb-4"
                style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
              >
                The truth in my heart
              </p>

              <h2
                className="font-serif mb-10"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--maroon)",
                }}
              >
                You mean the world to me.
              </h2>

              <div
                className="letter-paper rounded-3xl p-8 sm:p-12 text-left"
                style={{
                  border: "1px solid rgba(201,169,110,0.3)",
                  boxShadow: "0 8px 40px rgba(107,26,42,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative corner hearts */}
                <span style={{ position: "absolute", top: "1rem", left: "1.5rem", fontSize: "1.2rem", opacity: 0.3 }}>❤️</span>
                <span style={{ position: "absolute", top: "1rem", right: "1.5rem", fontSize: "1.2rem", opacity: 0.3 }}>❤️</span>

                {[
                  "Swathi, I love you. I don't want this message to sound like a dramatic promise. I want it to be the truth from my heart.",
                  "You mean the world to me.",
                  "You are not just someone I married. You became a part of my dreams, my everyday life and the future I imagined for myself.",
                  "I still want to build the rest of my life with you.",
                  "I want us to laugh together again. I want us to travel together, grow together, support each other, build our home and create memories that are stronger than the difficult moments we have gone through.",
                  "I don't want perfection. I want understanding.",
                  "I don't want us to keep hurting each other. I want us to learn how to love each other better.",
                  "I want to be with you.",
                ].map((para, i) => (
                  <p
                    key={i}
                    className="font-serif"
                    style={{
                      fontSize: i === 1 || i === 5 || i === 6 || i === 7
                        ? "1.4rem"
                        : "1.1rem",
                      fontStyle: "italic",
                      fontWeight: i === 1 ? 500 : 300,
                      color: i === 1 ? "var(--maroon)" : "var(--text-dark)",
                      lineHeight: "1.85",
                      marginBottom: "1.2rem",
                      textAlign: i === 1 ? "center" : "left",
                    }}
                  >
                    {para}
                  </p>
                ))}

                <div className="text-center mt-6">
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "1.8rem",
                      fontStyle: "italic",
                      color: "var(--maroon)",
                      fontWeight: 500,
                    }}
                  >
                    I love you so much. ❤️
                  </p>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* ============ COMMITMENTS SECTION ============ */}
        <SectionReveal delay={100}>
          <CommitmentsSection />
        </SectionReveal>

        {/* ============ TIMELINE SECTION ============ */}
        <SectionReveal delay={100}>
          <TimelineSection />
        </SectionReveal>

        {/* ============ FINAL LETTER ============ */}
        <SectionReveal delay={100}>
          <section
            id="final-letter"
            className="relative z-10 py-24 px-4"
            style={{
              background: "linear-gradient(180deg, #fdf8f2 0%, #fef5f0 50%, #fdf8f2 100%)",
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-sm uppercase tracking-widest mb-6"
                style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
              >
                With all my love
              </p>

              <h2
                className="font-serif mb-10"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 300,
                  color: "var(--maroon)",
                }}
              >
                A letter to you.
              </h2>

              <div
                className="letter-paper rounded-3xl p-8 sm:p-14 text-left"
                style={{
                  border: "1px solid rgba(201,169,110,0.35)",
                  boxShadow: "0 12px 50px rgba(107,26,42,0.1)",
                  position: "relative",
                }}
              >
                {/* Stamp decoration */}
                <div
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center rounded-full"
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "2px solid rgba(201,169,110,0.4)",
                    fontSize: "1.5rem",
                    opacity: 0.6,
                  }}
                >
                  ❤️
                </div>

                <p
                  className="font-serif mb-6"
                  style={{ fontSize: "1.3rem", fontStyle: "italic", color: "var(--maroon)", fontWeight: 500 }}
                >
                  Swathi,
                </p>

                {[
                  "I don't know what is going on in your heart right now.",
                  "Maybe you're angry.",
                  "Maybe you're hurt.",
                  "Maybe you need time.",
                  "And I will respect that.",
                ].map((line, i) => (
                  <p
                    key={i}
                    className="font-serif"
                    style={{
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "var(--text-mid)",
                      lineHeight: "1.8",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {line}
                  </p>
                ))}

                <div className="divider-gold my-8" />

                <p
                  className="font-serif mb-3"
                  style={{ fontSize: "1.05rem", fontStyle: "italic", fontWeight: 300, color: "var(--text-dark)", lineHeight: "1.75" }}
                >
                  But there is one thing I don&apos;t want you to doubt.
                </p>

                <p
                  className="font-serif text-center mb-8"
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "var(--maroon)",
                    lineHeight: "1.4",
                  }}
                >
                  I love you.
                  <br />
                  I love you deeply.
                </p>

                {[
                  "You mean more to me than I have sometimes been able to express.",
                  "I want to reconnect with you.",
                  "I want to understand you.",
                  "I want to become a better husband.",
                  "I want to rebuild your trust.",
                  "And if you are willing, I want to build the rest of my life with you.",
                ].map((line, i) => (
                  <p
                    key={i}
                    className="font-serif"
                    style={{
                      fontSize: "1.05rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "var(--text-dark)",
                      lineHeight: "1.8",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {line}
                  </p>
                ))}

                <div className="divider-gold my-8" />

                <p
                  className="font-serif"
                  style={{
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--text-mid)",
                    lineHeight: "1.85",
                    marginBottom: "1.5rem",
                  }}
                >
                  Not because everything between us is perfect.
                  <br />
                  But because I believe what we have is worth fighting for — with patience, respect, kindness and love.
                </p>

                <p
                  className="font-serif text-center mb-8"
                  style={{
                    fontSize: "1.3rem",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "var(--maroon)",
                    lineHeight: "1.6",
                  }}
                >
                  You are my everything.
                </p>

                <p
                  className="font-serif text-center mb-6"
                  style={{ fontSize: "1.15rem", fontStyle: "italic", color: "var(--maroon)", fontWeight: 400 }}
                >
                  I love you, Swathi. ❤️
                </p>

                <div
                  className="text-center rounded-2xl p-5"
                  style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
                >
                  <p
                    className="font-serif"
                    style={{ fontSize: "1.05rem", fontStyle: "italic", color: "var(--text-mid)", lineHeight: "1.9" }}
                  >
                    Whenever you are ready, I am here.
                    <br />
                    <span style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>
                      No pressure.
                      <br />
                      No demands.
                      <br />
                      Just love.
                    </span>
                  </p>
                </div>

                {/* Signature */}
                <div className="text-right mt-8">
                  <p
                    className="font-script"
                    style={{ fontSize: "1.8rem", color: "var(--maroon)", opacity: 0.7 }}
                  >
                    — Always yours
                  </p>
                </div>
              </div>

              {/* Final action buttons */}
              <FinalButtons />
            </div>
          </section>
        </SectionReveal>

        {/* ============ FOOTER ============ */}
        <footer
          className="relative z-10 text-center py-10 px-4"
          style={{
            background: "var(--cream)",
            borderTop: "1px solid rgba(201,169,110,0.2)",
          }}
        >
          <p
            className="font-script mb-2"
            style={{ fontSize: "1.6rem", color: "var(--maroon)", opacity: 0.6 }}
          >
            With love, always.
          </p>
        </footer>
      </div>
    </div>
  );
}
