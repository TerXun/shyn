"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const CONTACT_ITEMS = [
  { label: "Email", value: "terxun@gmail.com", href: "mailto:terxun@gmail.com" },
  { label: "GitHub", value: "github.com/terxun", href: "https://github.com/terxun" },
  { label: "LinkedIn", value: "@terxun-ng", href: "https://linkedin.com/in/terxun-ng-537554231" },
];

function splitToSpans(text: string, refs: { current: Array<HTMLSpanElement | null> }) {
  return text.split("").map((ch, i) => (
    <span
      key={i}
      ref={(el: HTMLSpanElement | null) => { refs.current[i] = el; }}
      className="inline-block"
      aria-hidden={ch === " "}
    >
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

export default function Contact() {
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(lettersRef.current.filter(Boolean), {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
      });

      gsap.from(listRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power2.out",
      });
    }, headerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-neutral-900 dark:text-neutral-50 font-sans">
      <main className="w-full max-w-3xl px-6 py-24">
        <div className="flex flex-col items-center gap-8">
          <h1 ref={headerRef} className="text-center text-6xl md:text-8xl font-extrabold leading-none tracking-tight">
            {splitToSpans("Contact", lettersRef)}
          </h1>

          <div ref={listRef} className="w-full max-w-md bg-white/70 dark:bg-white/7 backdrop-blur-sm border border-neutral-200/40 dark:border-neutral-800/40 rounded-lg p-6 shadow-lg">
            <p className="mb-4 text-center text-sm text-neutral-600 dark:text-neutral-300">I'd love to hear from you.</p>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map((c) => (
                <li key={c.label} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{c.label}</span>
                      <a
                        href={c.href}
                        className="group flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="truncate">{c.value}</span>
                        <span className="ml-1 inline-block transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-out" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-xs text-neutral-500">Updated April 2026</p>
        </div>
      </main>
    </div>
  );
}
