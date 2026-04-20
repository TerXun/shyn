"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "about",
    title: "About me",
    body: `I'm Ter Xun (Shin), an Iowa State University graduate with a Bachelor's degree in Computer Science, and a product-minded developer who enjoys building clean, maintainable code by adhering to best practices. I focus on shipping small, meaningful features and learning by doing — whether that's solving problems, exploring new APIs, or improving UX. I'm also passionate about food and playing ball games :)`,
    mediaLabel: "Portrait — About",
    mediaStyle: "bg-neutral-800",
    mediaAlt: "Abstract portrait block",
    mediaSrc: "/images/terxun.jpg",
  },
  {
    id: "work",
    title: "Work Experience",
    companies: [
      {
        id: "petronas",
        name: "PETRONAS",
        role: "DevOps Engineer/Technical Delivery",
        duration: "May 2024 - Present",
      },
      {
        id: "lex-books",
        name: "Lex Books (Contract)",
        role: "Frontend Engineer",
        duration: "Sep 2025 - Dec 2025",
      },
      {
        id: "kingland",
        name: "Kingland Systems",
        role: "Data Research Analyst",
        duration: "Mar 2023 - Aug 2023",
      },
    ],
  },
  {
    id: "skills",
    title: "Skillsets",
    body: `• Frontend Development\n• Backend Designs\n• Database Management\n• Automation Scripts\n• CI/CD Pipelines\n• Cloud Infrastructure\n• Java  |  Python  |  C/C++  |  TypeScript`,
    subBody: `• Contract Management\n• Business Delivery\n• Technical Support & Leadership\n• Solution Planning & Analysis`,
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

        const about = el.querySelector(".about-text") as HTMLElement | null;
        const media = el.querySelector(".about-media") as HTMLElement | null;
        const section = el.querySelector(".section-text") as HTMLElement | null;
        
        // Animation direction
        const fromX = i % 2 === 0 ? -60 : 60;
        const fromXNeg = i % 2 === 0 ? 60 : -60;

        // Animate about
        if (about) {
          gsap.from(about, {
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
        // Animate section
        if (section) {
          gsap.from(section, {
            x: fromXNeg,
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
    <div className="min-h-screen text-neutral-900 dark:text-neutral-50 font-sans">
      <main className="max-w-6xl mx-auto py-20 px-6" ref={containerRef}>

        <div className="space-y-16">
          {sections.map((s, i) => {
            // About section with media
            if (s.id === "about") {
              return (
                <div
                  key={s.id}
                  ref={(el) => {
                    sectionRefs.current = sectionRefs.current || [];
                    sectionRefs.current[i] = el;
                  }}
                  className="flex flex-col md:flex-row gap-6 md:items-center md:gap-12"
                >
                  <article className="about-text md:w-1/2 prose max-w-none">
                    <h2 className="text-3xl font-semibold mb-3">{s.title}</h2>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {s.body}
                    </p>
                  </article>

                  <div className="about-media md:w-1/2">
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-[0_0_20px_rgba(200,200,200,0.5)] ${s.mediaStyle}`}
                    >
                      {s.mediaSrc ? (
                        <Image
                          src={s.mediaSrc}
                          alt={s.mediaAlt}
                          fill
                          className="object-cover opacity-80"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            }

            // Other sections
            return null;
          })}

          <div className="grid md:grid-cols-2 gap-12">
            {sections.map((s, i) => {
              if (s.id === "about") return null;

              // Work section
              if (s.id === "work") {
                return (
                  <div
                    key={s.id}
                    ref={(el) => {
                      sectionRefs.current = sectionRefs.current || [];
                      sectionRefs.current[i] = el;
                    }}
                  >
                    <div className="section-text">
                      <h2 className="text-3xl font-semibold mb-6">{s.title}</h2>
                      <div className="space-y-4">
                        {s.companies?.map((company) => (
                          <div key={company.id} className="pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                              {company.name}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                              {company.role}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                              {company.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Skill section
              return (
                <div
                  key={s.id}
                  ref={(el) => {
                    sectionRefs.current = sectionRefs.current || [];
                    sectionRefs.current[i] = el;
                  }}
                >
                  <article className="section-text prose max-w-none">
                    <h2 className="text-3xl font-semibold mb-3">{s.title}</h2>
                    <p className="pb-6 border-b border-neutral-700 text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {s.body}
                    </p>
                    <p className="pt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {s.subBody}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center mt-16 text-sm text-neutral-500">Updated April 2026</p>
      </main>
    </div>
  );
}
