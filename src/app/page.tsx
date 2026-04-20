"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Zhi_Mang_Xing } from 'next/font/google';

const zhiMangXing = Zhi_Mang_Xing({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const charRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);

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

      // Animate title from bottom to top
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      // Animate nav links from bottom to top with stagger
      if (navLinksRef.current) {
        gsap.from(navLinksRef.current.filter(Boolean), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

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
          className="text-[clamp(120px,100vw,450px)] font-normal leading-none py-1 select-none"
          style={{ ...zhiMangXing.style, transform: 'rotate(25deg)' }}
          aria-label="Xun"
        >
          讯
        </span>
        <div className="text-center pt-3">
          <h1 ref={titleRef} className="text-3xl font-semibold select-none">Shyn.</h1>
          <nav ref={navRef} className="mt-6 flex gap-10">
            <Link ref={(el) => { navLinksRef.current[0] = el; }} href="/about" className="text-md font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              About
            </Link>
            <Link ref={(el) => { navLinksRef.current[1] = el; }} href="/project" className="text-md font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Projects
            </Link>
            <Link ref={(el) => { navLinksRef.current[2] = el; }} href="/contact" className="text-md font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}


