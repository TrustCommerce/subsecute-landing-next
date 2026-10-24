"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** A one-time product illustration entrance. Content remains visible without JS. */
export function ProductReveal({
  children,
  className,
  revealTarget,
}: {
  children: ReactNode;
  className: string;
  revealTarget?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    // Long mobile copy can enter before the artwork does.
    const target = revealTarget
      ? ref.current?.querySelector(revealTarget)
      : ref.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [revealTarget]);
  return (
    <div ref={ref} className={className} data-entered={entered}>
      {children}
    </div>
  );
}
