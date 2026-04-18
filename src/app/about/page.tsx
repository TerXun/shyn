"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "about",
    title: "About me",
    body: `I'm Ter Xun (Shin), an Iowa State University graduate with a Bachelor's degree in Computer Science, and a product-minded developer who enjoys building clean, maintainable code by adhering to best practices. I focus on shipping small, meaningful features and learning by doing — whether that's solving problems, exploring new APIs, or improving UX. I'm also passionate about food and playing ball games :)`,
    mediaLabel: "Portrait — About",
    mediaStyle: "bg-gradient-to-br from-neutral-900 to-neutral-700",
    mediaAlt: "Abstract portrait block",
    mediaLeft: false,
  },
  {
    id: "work",
    title: "Work experience",
    body: "PETRONAS \nDevOps Engineer/Technical Delivery\nMay 2024 - Present\n\nLex Books\nFrontend Engineer\nSep 2025 - Dec 2025\n\nKingland Systems\nData Research Analyst\nMar 2023 - Aug 2023",
    mediaLabel: "Office — Work",
    mediaStyle: "bg-gradient-to-br from-slate-800 to-slate-600",
    mediaAlt: "Office photo placeholder",
    mediaLeft: true,
  },
  {
    id: "projects",
    title: "Personal projects",
    body: `Shyn - Portfolio\nA fun little playground to express my creativity, practice skills, and share my work.\n\nRecipe Catalogue (WIP)\nAn internal cookbook and reference for my culinary experiences as a home cook who struggles to keep track of recipes and ideas.`,
    mediaLabel: "Workshop — Projects",
    mediaStyle: "bg-gradient-to-br from-emerald-800 to-emerald-600",
    mediaAlt: "Projects photo placeholder",
    mediaLeft: false,
  },
  {
    id: "skills",
    title: "Skillsets",
    body: `Frontend Development\nBackend Designs\nDatabase Management\nAutomation Scripts\nCI/CD Pipelines\nCloud Infrastructure`,
    mediaLabel: "Tools — Skills",
    mediaStyle: "bg-gradient-to-br from-indigo-800 to-indigo-600",
    mediaAlt: "Skills photo placeholder",
    mediaLeft: true,
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;

        const text = el.querySelector(".about-text") as HTMLElement | null;
        const media = el.querySelector(".about-media") as HTMLElement | null;
        
        // Animation direction
        const fromX = i % 2 === 0 ? -60 : 60;

        // Animate text
        if (text) {
          gsap.from(text, {
            x: fromX,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
        // Animate media
        if (media) {
          gsap.from(media, {
            x: -fromX,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-neutral-900 dark:text-neutral-50 font-sans">
      <main className="max-w-6xl mx-auto py-20 px-6" ref={containerRef}>

        <div className="space-y-16">
          {sections.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                sectionRefs.current = sectionRefs.current || [];
                sectionRefs.current[i] = el;
              }}
              className={`flex flex-col md:flex-row gap-6 md:items-center md:gap-12 ${
                s.mediaLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              <article className="about-text md:w-1/2 prose max-w-none">
                <h2 className="text-2xl font-semibold mb-3">{s.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {s.body}
                </p>
              </article>

              <div className="about-media md:w-1/2">
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg ${s.mediaStyle}`}
                  role="img"
                  aria-label={s.mediaAlt}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-100 text-sm md:text-base font-medium opacity-90">
                    {s.mediaLabel}
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs text-neutral-200/80">{s.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 text-sm text-neutral-500">Updated April 2026</p>
      </main>
    </div>
  );
}
