"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Animate supporting objects once. The server-rendered content stays visible. */
export default function Scene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.entered = "true";
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} data-consumer-scene="">
      {children}
    </div>
  );
}
