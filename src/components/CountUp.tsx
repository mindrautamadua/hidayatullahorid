"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/* Quiet count-up for the impact stats. Animates only the numeric part of a
   value and preserves any prefix/suffix ("600+", "±34"). Values with no digits
   ("Ribuan") render verbatim. Fires once, on scroll into view. */

function split(value: string) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], target: parseInt(m[2], 10), suffix: m[3] };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  // Memoize so `parts` keeps a stable identity across renders — otherwise the
  // effect below re-runs on every setDisplay tick and restarts the animation
  // from 0 forever (the counter never settles on its target).
  const parts = useMemo(() => split(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(parts ? "0" : value);

  useEffect(() => {
    if (!parts || !inView) return;
    if (reduce) {
      setDisplay(String(parts.target));
      return;
    }
    const controls = animate(0, parts.target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, reduce, parts]);

  if (!parts) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {parts.prefix}
      {display}
      {parts.suffix}
    </span>
  );
}
