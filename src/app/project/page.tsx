"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "project1",
    title: "Lex Books",
    body: `Development • Contract • September 2025`,
    mediaLabel: "Lex Books",
    mediaSrc: "/images/lex-books.png",
    mediaAlt: "Lex Books",
    link: "https://lex-books.com/",
  },
  {
    id: "project2",
    title: "Subme Sports",
    body: `Development • Client-Based FYP • December 2023`,
    mediaLabel: "Subme Sports",
    mediaSrc: "/images/subme-sports.png",
    mediaAlt: "Subme Sports",
    link: "https://submesports.com/how-it-works/",
  },{
    id: "project3",
    title: "Recipe Catalog (WIP)",
    body: `Development • Personal • Present`,
    mediaLabel: "Project Image",
    mediaSrc: "/images/recipe-catalog.png",
    mediaAlt: "Project image",
    link: "",
  },{
    id: "project4",
    title: "Proxmox Home Server (WIP)",
    body: `Development • Personal • Present`,
    mediaLabel: "Project Image",
    mediaSrc: "/images/proxmox.webp",
    mediaAlt: "Project image",
    link: "",
  },
];


const Project = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        const text = el.querySelector(".project-text") as HTMLElement | null;
        const media = el.querySelector(".project-media") as HTMLElement | null;

        // Animate text
        if (text) {
          gsap.from(text, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
        // Animate media
        if (media) {
          gsap.from(media, {
            y: -60,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
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
      <main className="max-w-4xl mx-auto py-10 px-6" ref={containerRef}>
        <div className="space-y-16">
          {sections.map((section, i) => (
            <div
              key={section.id}
              ref={el => {
                sectionRefs.current = sectionRefs.current || [];
                sectionRefs.current[i] = el;
              }}
              className="flex flex-col items-center gap-8"
            >
              <div className="project-media w-full flex justify-center">
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[5/3] w-full max-w-xl overflow-hidden rounded-lg shadow-lg bg-neutral-800 transition-all duration-500 hover:shadow-[0_0_20px_rgba(200,200,200,0.7)]"
                >
                  {section.mediaSrc ? (
                    <Image
                      src={section.mediaSrc}
                      alt={section.mediaAlt}
                      fill
                      className="object-fill opacity-80"
                    />
                  ) : null}
                </a>
              </div>
              <article className="project-text w-full max-w-xl prose text-center">
                <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-500 font-semibold leading-relaxed whitespace-pre-wrap">{section.body}</p>
              </article>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-sm text-neutral-500">Updated April 2026</p>
      </main>
    </div>
  );
};

export default Project;