"use client";
import { useEffect, useRef } from "react";

interface SectionObserverProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  id,
}: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("section-hidden");

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("section-visible");
            el.classList.remove("section-hidden");
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
}
