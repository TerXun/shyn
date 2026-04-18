"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Zhi_Mang_Xing } from 'next/font/google';

const zhiMangXing = Zhi_Mang_Xing({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const charRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (!charRef.current) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(charRef.current, {
        scale: 0.5,
        opacity: 0.5,
        duration: 1,
        ease: "power3.out",
      });

      // Hover animation
      const char = charRef.current;
      if (char) {
        char.addEventListener("mouseenter", () => {
          gsap.to(char, { color: '#171717', webkitTextStroke: '2px #e5e5e5', duration: 0.4, ease: "power1.out" });
        });
        char.addEventListener("mouseleave", () => {
          gsap.to(char, { color: '#e5e5e5', webkitTextStroke: '', duration: 0.4, ease: "power1.out" });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <span
          ref={charRef}
          className="text-[clamp(120px,100vw,500px)] font-normal leading-none py-1 select-none"
          style={{ ...zhiMangXing.style, transform: 'rotate(25deg)' }}
          aria-label="Xun"
        >
          讯
        </span>
        <div className="text-center pt-3">
          <h1 className="text-2xl font-semibold select-none">Shyn.</h1>
        </div>
      </div>
    </div>
  );
}


