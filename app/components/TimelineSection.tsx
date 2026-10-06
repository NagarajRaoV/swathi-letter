"use client";

const steps = [
  { label: "Today", emoji: "💌", desc: "This letter, written with love and vulnerability." },
  { label: "Healing", emoji: "🌿", desc: "We allow ourselves to breathe and feel." },
  { label: "Talking", emoji: "🕊️", desc: "One gentle conversation, when you are ready." },
  { label: "Understanding", emoji: "🤝", desc: "Listening deeply — not just to respond, but to truly hear." },
  { label: "Rebuilding Trust", emoji: "🌟", desc: "Through consistent, small acts of love and respect." },
  { label: "Growing Together", emoji: "🌱", desc: "Learning to love each other better, every day." },
  { label: "Our Future", emoji: "❤️", desc: "The life we dreamed of, built one day at a time." },
];

export default function TimelineSection() {
  return (
    <section
      id="future"
      className="relative z-10 py-20 px-4"
      style={{ background: "linear-gradient(180deg, #fdf8f2 0%, #fef5f5 100%)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-sm uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "Lato, sans-serif", letterSpacing: "0.2em" }}
        >
          A journey together
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
          I still see a future with you.
        </h2>

        {/* Timeline */}
        <div className="relative mt-16 mb-12">
          {/* Vertical line — sits behind the dots */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, var(--gold), var(--blush-dark), var(--gold), transparent)",
            }}
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className="timeline-node relative flex items-center mb-8"
                style={{ flexDirection: "row" }}
              >
                {/* Left half */}
                <div
                  className="flex-1"
                  style={{
                    textAlign: isLeft ? "right" : "left",
                    paddingRight: isLeft ? "1.5rem" : "0",
                    paddingLeft: isLeft ? "0" : "1.5rem",
                    opacity: isLeft ? 1 : 0,
                    pointerEvents: isLeft ? "auto" : "none",
                  }}
                >
                  {isLeft && (
                    <>
                      <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 500, color: "var(--maroon)", marginBottom: "0.2rem" }}>
                        {step.label}
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-light)", fontFamily: "Lato, sans-serif" }}>
                        {step.desc}
                      </p>
                    </>
                  )}
                </div>

                {/* Center dot — in normal flow, centered by flexbox */}
                <div
                  className="timeline-dot flex items-center justify-center rounded-full"
                  style={{
                    width: "42px",
                    height: "42px",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, var(--blush), var(--cream))",
                    border: "2px solid var(--gold)",
                    fontSize: "1.2rem",
                    zIndex: 2,
                    position: "relative",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {step.emoji}
                </div>

                {/* Right half */}
                <div
                  className="flex-1"
                  style={{
                    textAlign: isLeft ? "left" : "right",
                    paddingLeft: isLeft ? "1.5rem" : "0",
                    paddingRight: isLeft ? "0" : "1.5rem",
                    opacity: isLeft ? 0 : 1,
                    pointerEvents: isLeft ? "none" : "auto",
                  }}
                >
                  {!isLeft && (
                    <>
                      <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 500, color: "var(--maroon)", marginBottom: "0.2rem" }}>
                        {step.label}
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-light)", fontFamily: "Lato, sans-serif" }}>
                        {step.desc}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing quote */}
        <div
          className="max-w-xl mx-auto rounded-3xl p-8"
          style={{
            background: "white",
            border: "1px solid var(--blush-dark)",
            boxShadow: "0 4px 24px rgba(107,26,42,0.07)",
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "var(--text-dark)",
              lineHeight: "1.9",
            }}
          >
            &ldquo;I don&apos;t expect us to go from hurt to happiness overnight.
            <br /><br />
            Maybe we start with one conversation.
            <br />
            Then another.
            <br />
            Then slowly rebuild what was broken.
            <br /><br />
            One day at a time.
            <br /><br />
            I want to walk that journey with you.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
