"use client";

import { useEffect, useRef, useState } from "react";

/** Local presentation state only. These tours never call business APIs. */
export function useProductTour(count: number, interval = 5500) {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const readPreference = () => setReducedMotion(media.matches);
    const readVisibility = () => setPageVisible(!document.hidden);
    readPreference();
    readVisibility();
    media.addEventListener("change", readPreference);
    document.addEventListener("visibilitychange", readVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", readPreference);
      document.removeEventListener("visibilitychange", readVisibility);
    };
  }, []);

  const running =
    visible && pageVisible && !paused && !focused && !reducedMotion;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setSelected((value) => (value + 1) % count),
      interval,
    );
    return () => window.clearTimeout(timer);
  }, [count, interval, running, selected]);

  function select(index: number) {
    setSelected(index);
    setRevision((value) => value + 1);
    setPaused(true);
  }

  return {
    selected,
    revision,
    select,
    paused,
    running,
    reducedMotion,
    interval,
    regionProps: {
      ref,
      "data-running": running,
      "data-visible": visible,
      onFocusCapture: () => {
        setFocused(true);
      },
      onBlurCapture: (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
          setPaused(false);
        }
      },
    },
  };
}

export type ProductTour = ReturnType<typeof useProductTour>;
