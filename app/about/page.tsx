"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const IMG = {
  tower: "/images/manifold-about/tower.webp",
  facade: "/images/manifold-about/workplace.webp",
};

const SUBS = [
  {
    code: "MCL",
    name: "Manifold Computers Limited",
    href: "/companies/manifold-computers",
    focus: "Enterprise technology foundations",
  },
  {
    code: "MES",
    name: "Manifold Enterprise Solutions",
    href: "/companies/manifold-enterprise-solutions",
    focus: "Digital transformation",
  },
] as const;

const OFFICES = [
  { city: "Lagos", country: "Nigeria", role: "Group Head Office" },
  { city: "Abuja", country: "Nigeria", role: "Regional Office" },
  { city: "Port Harcourt", country: "Nigeria", role: "Regional Office" },
  { city: "Accra", country: "Ghana", role: "Regional Office" },
] as const;

// Original draft history retained. Replace with verified milestones before launch.
const MILESTONES = [
  {
    period: "Year TBC",
    title: "Founding milestone",
    body: "Placeholder. Describe the founding of the first Manifold business and its original focus on enterprise infrastructure.",
  },
  {
    period: "Year TBC",
    title: "Growth milestone",
    body: "Placeholder. Describe a significant expansion in capability, client base or partnership with a global technology provider.",
  },
  {
    period: "Year TBC",
    title: "Regional milestone",
    body: "Placeholder. Describe the opening of additional offices across Nigeria and Ghana.",
  },
  {
    period: "Year TBC",
    title: "Transformation milestone",
    body: "Placeholder. Describe the establishment of Manifold Enterprise Solutions and the move into cloud, software, security and Data & AI.",
  },
  {
    period: "Year TBC",
    title: "Group milestone",
    body: "Placeholder. Describe the formation of Manifold Holdings as the parent of the group’s operating companies.",
  },
] as const;

const APPROACH = [
  {
    t: "Understand",
    d: "Every engagement begins with the client’s environment as it actually exists — the systems in place, the constraints, the regulatory context and the business objectives the technology must serve.",
  },
  {
    t: "Build",
    d: "We design and deliver the foundations: infrastructure, networks, platforms and security that are resilient, supportable and sized for the organisation’s real requirements.",
  },
  {
    t: "Transform",
    d: "On those foundations, we help organisations modernise how they operate — through cloud, data, software and automation that deliver measurable improvements rather than technology for its own sake.",
  },
  {
    t: "Evolve",
    d: "Technology priorities change. Through managed services and long-term relationships, the group continues to support clients as their environments and ambitions develop.",
  },
] as const;

type Leader = { name: string; title: string; linkedin?: string };
const LEADERS: readonly Leader[] = [
  { name: "Name to be confirmed", title: "Group Chief Executive Officer" },
  {
    name: "Name to be confirmed",
    title: "Managing Director, Manifold Computers Limited",
  },
  {
    name: "Name to be confirmed",
    title: "Managing Director, Manifold Enterprise Solutions",
  },
  { name: "Name to be confirmed", title: "Group Chief Financial Officer" },
];

const HERO_TITLE = "Built over decades. Evolving for what comes next.";

/* Shared presentation helpers. These forward standard HTML/data attributes. */
function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}
      {...props}
    />
  );
}

function Eyebrow({
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#fd018b] sm:text-xs ${className}`}
      {...props}
    />
  );
}

function H2({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-[clamp(2rem,3.5vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.045em] ${className}`}
      {...props}
    />
  );
}

function M({ children }: { children: ReactNode }) {
  return <span className="text-[#fd018b]">{children}</span>;
}

function Prose({
  light = false,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { light?: boolean }) {
  return (
    <div
      className={`space-y-5 text-base leading-[1.8] sm:text-lg ${light ? "text-white/70" : "text-black/65"} ${className}`}
      {...props}
    />
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`size-5 shrink-0 ${className}`}
    >
      <path
        d="M4 12h15M13 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-5 border-b border-current py-2 text-sm font-semibold transition-colors hover:text-[#fd018b]"
    >
      {children}
      <Arrow className="transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
    </Link>
  );
}

function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      data-about-parallax
      className={`relative isolate overflow-hidden ${className}`}
    >
      <div data-about-image className="absolute -inset-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <span className="tabular-nums">
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        <span data-about-count={to}>{to}</span>
        {suffix}
      </span>
    </span>
  );
}

/* All GSAP work is page-scoped and reverted on unmount and media-query changes. */
function useAboutMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const select = <T extends Element = HTMLElement>(query: string) =>
        Array.from(root.querySelectorAll<T>(query));
      const media = gsap.matchMedia();
      let disposed = false;
      let refreshFrame = 0;

      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };

      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // Avoid replaying the opening sequence over a restored scroll position.
          if (window.scrollY < 80 && !window.location.hash) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from("[data-about-hero-eyebrow]", {
                y: 18,
                opacity: 0,
                duration: 0.6,
              })
              .from(
                "[data-about-word]",
                {
                  yPercent: 110,
                  rotate: 3,
                  opacity: 0,
                  stagger: 0.055,
                  duration: 1.05,
                  clearProps: "transform,opacity",
                },
                0.08,
              )
              .from(
                "[data-about-hero-copy]",
                {
                  y: 24,
                  opacity: 0,
                  duration: 0.85,
                  clearProps: "transform,opacity",
                },
                0.34,
              )
              .from(
                "[data-about-hero-frame]",
                {
                  clipPath: "inset(14% 0 0 0)",
                  opacity: 0,
                  duration: 1.2,
                  clearProps: "clipPath,opacity",
                },
                0.24,
              );
          }

          select<HTMLElement>("[data-about-reveal]").forEach((element) => {
            // SSR content and restored/previously visible content stay readable.
            if (element.getBoundingClientRect().top < window.innerHeight * 0.92)
              return;
            gsap.from(element, {
              y: 36,
              opacity: 0,
              duration: 0.95,
              delay: Number(element.dataset.aboutDelay || 0),
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: element, start: "top 94%", once: true },
            });
          });

          // Timeline: continuous line growth with separately sequenced milestone dots.
          const story = root.querySelector<HTMLElement>("[data-about-story]");
          const storyLine = root.querySelector<HTMLElement>(
            "[data-about-story-line]",
          );
          if (story && storyLine) {
            gsap.fromTo(
              storyLine,
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                  trigger: story,
                  start: "top 65%",
                  end: "bottom 65%",
                  scrub: 0.5,
                },
              },
            );
            select<HTMLElement>("[data-about-milestone]").forEach((item) => {
              const dot = item.querySelector("[data-about-dot]");
              if (!dot) return;
              gsap.fromTo(
                dot,
                { scale: 0.65, backgroundColor: "#f4f4f3" },
                {
                  scale: 1,
                  backgroundColor: "#fd018b",
                  duration: 0.45,
                  ease: "back.out(2)",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
          }

          const structure = root.querySelector<HTMLElement>(
            "[data-about-structure]",
          );
          if (structure) {
            gsap
              .timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                  trigger: structure,
                  start: "top 85%",
                  once: true,
                },
              })
              .from(structure.querySelectorAll("[data-about-parent]"), {
                y: 24,
                opacity: 0,
                duration: 0.75,
              })
              .from(
                structure.querySelectorAll("[data-about-connector-y]"),
                {
                  scaleY: 0,
                  transformOrigin: "top",
                  stagger: 0.1,
                  duration: 0.65,
                },
                0.2,
              )
              .from(
                structure.querySelectorAll("[data-about-connector-x]"),
                {
                  scaleX: 0,
                  transformOrigin: "center",
                  duration: 0.65,
                },
                0.32,
              )
              .from(
                structure.querySelectorAll("[data-about-company]"),
                {
                  y: 24,
                  opacity: 0,
                  stagger: 0.12,
                  duration: 0.8,
                  clearProps: "transform,opacity",
                },
                0.5,
              );
          }

          select<HTMLElement>("[data-about-rule]").forEach((line) => {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: line, start: "top 90%", once: true },
            });
          });

          const counters = select<HTMLElement>("[data-about-count]");
          counters.forEach((element) => {
            const target = Number(element.dataset.aboutCount);
            const value = { current: 0 };
            if (!Number.isFinite(target)) return;
            gsap.to(value, {
              current: target,
              duration: 2.1,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
              onStart: () => {
                element.textContent = "0";
              },
              onUpdate: () => {
                element.textContent = String(Math.round(value.current));
              },
              onComplete: () => {
                element.textContent = String(target);
              },
            });
          });

          gsap.fromTo(
            "[data-about-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
              },
            },
          );

          // DOM text mutations are restored explicitly when reduced motion changes.
          return () => {
            counters.forEach((element) => {
              element.textContent = element.dataset.aboutCount || "";
            });
          };
        },
        root,
      );

      // Touch devices retain natural scrolling and static cards.
      media.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const removeListeners: Array<() => void> = [];
          select<HTMLElement>("[data-about-parallax]").forEach((frame) => {
            const image = frame.querySelector("[data-about-image]");
            if (!image) return;
            gsap.fromTo(
              image,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          select<HTMLElement>("[data-about-tilt]").forEach((card) => {
            // quickTo tweens are created inside this GSAP context, not in listeners.
            gsap.set(card, {
              transformPerspective: 900,
              transformOrigin: "center",
            });
            const rotateX = gsap.quickTo(card, "rotationX", {
              duration: 0.55,
              ease: "power3.out",
            });
            const rotateY = gsap.quickTo(card, "rotationY", {
              duration: 0.55,
              ease: "power3.out",
            });
            const lift = gsap.quickTo(card, "y", {
              duration: 0.55,
              ease: "power3.out",
            });
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const bounds = card.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width - 0.5;
              const y = (event.clientY - bounds.top) / bounds.height - 0.5;
              rotateX(-y * 5);
              rotateY(x * 5);
              lift(-4);
            };
            const reset = () => {
              rotateX(0);
              rotateY(0);
              lift(0);
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", reset);
            card.addEventListener("pointercancel", reset);
            removeListeners.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", reset);
              card.removeEventListener("pointercancel", reset);
            });
          });

          // Keep the actual link hit area stationary; move only its inner content.
          select<HTMLElement>("[data-about-magnetic]").forEach((link) => {
            const inner = link.querySelector<HTMLElement>(
              "[data-about-magnetic-inner]",
            );
            if (!inner) return;
            const xTo = gsap.quickTo(inner, "x", {
              duration: 0.5,
              ease: "power3.out",
            });
            const yTo = gsap.quickTo(inner, "y", {
              duration: 0.5,
              ease: "power3.out",
            });
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const bounds = link.getBoundingClientRect();
              xTo((event.clientX - bounds.left - bounds.width / 2) * 0.12);
              yTo((event.clientY - bounds.top - bounds.height / 2) * 0.15);
            };
            const reset = () => {
              xTo(0);
              yTo(0);
            };
            link.addEventListener("pointermove", move);
            link.addEventListener("pointerleave", reset);
            link.addEventListener("pointercancel", reset);
            link.addEventListener("blur", reset);
            removeListeners.push(() => {
              link.removeEventListener("pointermove", move);
              link.removeEventListener("pointerleave", reset);
              link.removeEventListener("pointercancel", reset);
              link.removeEventListener("blur", reset);
            });
          });
          return () => removeListeners.forEach((remove) => remove());
        },
        root,
      );

      const images = select<HTMLImageElement>("img");
      images.forEach((image) => image.addEventListener("load", refresh));
      const resize =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(refresh)
          : null;
      resize?.observe(root);
      void document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      refresh();

      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        resize?.disconnect();
        images.forEach((image) => image.removeEventListener("load", refresh));
        media.revert();
        // useGSAP also reverts its context. Never kill another page's ScrollTriggers.
      };
    },
    { scope, dependencies: [], revertOnUpdate: true },
  );

  return scope;
}

function PageHero() {
  return (
    <section
      className="bg-black pb-10 pt-16 text-white sm:pb-14 sm:pt-20 lg:pb-20 lg:pt-24"
      aria-labelledby="about-title"
    >
      <Container>
        <Eyebrow data-about-hero-eyebrow>About Manifold</Eyebrow>
        <div className="mt-7 grid gap-8 pb-14 sm:pb-16 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-20">
          <h1
            id="about-title"
            aria-label={HERO_TITLE}
            className="min-w-0 text-[clamp(2.75rem,5.8vw,6.3rem)] font-medium leading-[1.08] tracking-[-0.055em] lg:col-span-8"
          >
            <span aria-hidden="true">
              {HERO_TITLE.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                  <span className="inline-block overflow-hidden align-top pb-[0.09em] -mb-[0.09em]">
                    <span
                      data-about-word
                      className={`inline-block origin-bottom ${word === "next." ? "text-[#fd018b]" : ""}`}
                    >
                      {word}
                    </span>
                  </span>{" "}
                </span>
              ))}
            </span>
          </h1>
          <p
            data-about-hero-copy
            className="max-w-2xl text-base leading-[1.8] text-white/65 sm:text-lg lg:col-span-4 lg:pb-1"
          >
            Manifold has grown alongside the changing technology needs of
            enterprise — from the infrastructure that keeps organisations
            running to the digital capabilities shaping how they operate today.
          </p>
        </div>
        <div data-about-hero-frame>
          <ParallaxImage
            src={IMG.tower}
            alt="Modern glass office towers viewed from below"
            priority
            sizes="(min-width: 1600px) 1600px, 120vw"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.65/1]"
          />
        </div>
      </Container>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="who-we-are-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div data-about-reveal className="lg:col-span-5">
            <Eyebrow>Who We Are</Eyebrow>
            <H2 id="who-we-are-title" className="mt-6">
              Technology has changed. So has the role of the technology{" "}
              <M>partner.</M>
            </H2>
          </div>
          <div
            data-about-reveal
            data-about-delay="0.1"
            className="lg:col-span-6 lg:col-start-7 lg:pt-12"
          >
            <Prose>
              <p className="text-xl leading-relaxed text-black">
                For more than three decades, businesses within the Manifold
                group have worked with organisations across West Africa to
                design, deploy and support critical technology environments.
              </p>
              <p>As enterprise technology has evolved, so has Manifold.</p>
              <p>
                What began with a strong foundation in enterprise infrastructure
                has expanded into a broader technology group spanning cloud,
                software, cybersecurity, automation, Data &amp; AI and managed
                services.
              </p>
              <p>
                Today, Manifold Holdings brings these capabilities together
                through specialised operating companies while preserving the
                expertise and focus that make each one distinct.
              </p>
            </Prose>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Story() {
  return (
    <section
      id="our-story"
      className="scroll-mt-28 bg-[#f4f4f3] py-24 lg:py-32"
      aria-labelledby="story-title"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
            <div data-about-reveal>
              <Eyebrow>Our Story</Eyebrow>
              <H2 id="story-title" className="mt-6">
                Three decades of <M>growth.</M>
              </H2>
              <p className="mt-6 max-w-sm leading-[1.7] text-black/60">
                The milestones that have shaped Manifold, from its origins in
                enterprise infrastructure to the group it is today.
              </p>
              <p className="mt-8 inline-block border-l-2 border-[#fd018b] pl-3 text-xs text-black/50">
                Placeholder entries — to be replaced with verified dates and
                milestones.
              </p>
            </div>
          </div>
          <div
            data-about-story
            className="relative lg:col-span-7 lg:col-start-6"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-black/15"
            >
              <span
                data-about-story-line
                className="absolute inset-0 origin-top bg-[#fd018b]"
              />
            </div>
            <ol>
              {MILESTONES.map((milestone) => (
                <li
                  key={milestone.title}
                  data-about-milestone
                  className="relative pb-12 pl-10 last:pb-0"
                >
                  <span
                    data-about-dot
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-[#fd018b] bg-[#f4f4f3]"
                  />
                  <div
                    data-about-reveal
                    className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8"
                  >
                    <p className="text-sm font-semibold tabular-nums text-[#fd018b]">
                      {milestone.period}
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 leading-[1.7] text-black/55">
                        {milestone.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Structure() {
  return (
    <section
      id="our-structure"
      className="scroll-mt-28 bg-black py-24 text-white lg:py-32"
      aria-labelledby="structure-title"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div data-about-reveal className="lg:col-span-5">
            <Eyebrow>Our Structure</Eyebrow>
            <H2 id="structure-title" className="mt-6">
              One parent. Two specialist <M>companies.</M>
            </H2>
            <Prose light className="mt-6">
              <p>
                Each company maintains its specialist focus while benefiting
                from the experience, relationships and strategic direction of
                the wider group.
              </p>
            </Prose>
          </div>
          <div
            data-about-structure
            className="min-w-0 lg:col-span-6 lg:col-start-7"
          >
            <div className="flex flex-col items-center">
              <div
                data-about-parent
                className="w-full max-w-sm border border-white/20 px-6 py-6 text-center"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fd018b]">
                  Parent company
                </p>
                <p className="mt-2 text-xl font-semibold">Manifold Holdings</p>
              </div>
              <div
                data-about-connector-y
                aria-hidden="true"
                className="h-10 w-px bg-white/30"
              />
              <div
                data-about-connector-x
                aria-hidden="true"
                className="h-px w-[calc(50%+0.5rem)] bg-white/30"
              />
              <div className="grid w-full grid-cols-2 gap-4">
                {SUBS.map((company) => (
                  <div
                    key={company.code}
                    className="flex min-w-0 flex-col items-center"
                  >
                    <div
                      data-about-connector-y
                      aria-hidden="true"
                      className="h-10 w-px bg-white/30"
                    />
                    <div data-about-company className="h-full w-full">
                      <Link
                        href={company.href}
                        data-about-tilt
                        className="group block h-full w-full border border-white/20 px-3 py-6 text-center transition-colors hover:border-[#fd018b] sm:px-4"
                      >
                        <p className="text-[11px] font-bold tracking-[0.2em] text-[#fd018b]">
                          {company.code}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-snug sm:text-base">
                          {company.name}
                        </p>
                        <p className="mt-3 text-xs text-white/45">
                          {company.focus}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Approach() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="approach-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div data-about-reveal className="lg:col-span-6">
            <Eyebrow>Our Approach</Eyebrow>
            <H2 id="approach-title" className="mt-6">
              From foundations to long-term <M>evolution.</M>
            </H2>
          </div>
          <div
            data-about-reveal
            data-about-delay="0.1"
            className="lg:col-span-5 lg:col-start-8"
          >
            <Prose>
              <p>
                The group’s structure reflects how enterprise technology
                develops in practice: strong foundations first, transformation
                built upon them, and continued support as needs change.
              </p>
            </Prose>
          </div>
        </div>
        <div className="relative mt-16">
          <span
            data-about-rule
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-black"
          />
          <ol className="grid md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((step, index) => (
              <li
                key={step.t}
                data-about-reveal
                data-about-delay={index * 0.08}
                className={`border-b border-black/10 py-8 lg:border-b-0 lg:pr-8 ${index > 0 ? "lg:border-l lg:border-black/10 lg:pl-8" : ""} ${index % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tabular-nums text-[#fd018b]">
                    0{index + 1}
                  </span>
                  {index < APPROACH.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-black/15 lg:block"
                    />
                  )}
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {step.t}
                </h3>
                <p className="mt-3 leading-[1.7] text-black/60">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section
      className="bg-[#191919] text-white"
      aria-labelledby="experience-title"
    >
      <div className="grid lg:grid-cols-2">
        <ParallaxImage
          src={IMG.facade}
          alt="A contemporary office with glass meeting rooms"
          sizes="(min-width: 1024px) 60vw, 120vw"
          className="aspect-[16/10] lg:aspect-auto lg:h-full"
        />
        <div className="px-6 py-20 lg:px-16 lg:py-28">
          <div data-about-reveal>
            <Eyebrow>Group Experience</Eyebrow>
            <H2 id="experience-title" className="mt-6">
              Experience measured in decades and delivery.
            </H2>
            <Prose light className="mt-6">
              <p>
                Manifold’s companies have delivered technology programmes for
                banks, energy operators, manufacturers, multinationals and
                public institutions — environments where reliability, security
                and continuity are non-negotiable.
              </p>
            </Prose>
          </div>
          <div className="relative mt-12">
            <span
              data-about-rule
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-white/15"
            />
            <dl className="grid grid-cols-2">
              <div className="py-6 pr-6">
                <dt className="text-[clamp(1.75rem,5vw,2.25rem)] font-bold tracking-[-0.03em] xl:text-5xl">
                  <CountUp to={30} suffix="+" />
                </dt>
                <dd className="mt-2 text-sm text-white/55">
                  Years of enterprise technology experience
                </dd>
              </div>
              <div className="border-l border-white/15 py-6 pl-6">
                <dt className="whitespace-nowrap text-[clamp(1.75rem,5vw,2.25rem)] font-bold tracking-[-0.03em] xl:text-5xl">
                  <CountUp to={270} prefix="$" />M<M>+</M>
                </dt>
                <dd className="mt-2 text-sm text-white/55">
                  Technology project value delivered
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="leadership-title">
      <Container>
        <div data-about-reveal>
          <Eyebrow>Leadership</Eyebrow>
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
            <H2 id="leadership-title" className="lg:col-span-6">
              The people leading the <M>group.</M>
            </H2>
            <p className="text-xs text-black/45 lg:col-span-4 lg:col-start-9 lg:text-right">
              Placeholder profiles — portraits, names and biographies to be
              supplied.
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((leader, index) => (
            <article
              key={leader.title}
              data-about-reveal
              data-about-delay={index * 0.06}
            >
              <div
                data-about-tilt
                className="grid aspect-[4/5] place-items-center bg-[#ececea]"
              >
                <svg
                  viewBox="0 0 80 80"
                  className="size-20 text-black/15"
                  aria-hidden="true"
                >
                  <circle cx="40" cy="28" r="14" fill="currentColor" />
                  <path
                    d="M12 76c2-16 14-26 28-26s26 10 28 26"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {leader.name}
              </h3>
              <p className="mt-1 text-sm text-[#fd018b]">{leader.title}</p>
              <p className="mt-3 text-sm leading-[1.65] text-black/55">
                A short professional profile summarising experience, areas of
                responsibility and prior leadership roles.
              </p>
              {leader.linkedin ? (
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-black underline decoration-black/20 underline-offset-4 hover:decoration-[#fd018b]"
                >
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="LinkedIn profile to be supplied"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-black underline decoration-black/20 underline-offset-4"
                >
                  LinkedIn
                </span>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Footprint() {
  return (
    <section
      className="border-t border-black/10 bg-[#f4f4f3] py-24"
      aria-labelledby="footprint-title"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div data-about-reveal className="lg:col-span-5">
            <Eyebrow>Regional Footprint</Eyebrow>
            <H2 id="footprint-title" className="mt-6">
              Four offices across Nigeria and Ghana.
            </H2>
            <div className="mt-8">
              <TextLink href="/our-reach">Explore Our Reach</TextLink>
            </div>
          </div>
          <div className="relative lg:col-span-6 lg:col-start-7">
            <span
              data-about-rule
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-black"
            />
            <div className="grid grid-cols-2">
              {OFFICES.map((office, index) => (
                <div
                  key={office.city}
                  data-about-reveal
                  data-about-delay={index * 0.06}
                  className={`border-b border-black/10 py-6 ${index % 2 === 1 ? "border-l pl-6" : "pr-6"}`}
                >
                  <p className="text-xl font-semibold tracking-tight">
                    {office.city}
                  </p>
                  <p className="mt-1 text-sm text-black/50">
                    {office.role === "Group Head Office"
                      ? "Group Head Office"
                      : office.country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ClosingBand() {
  return (
    <section
      className="bg-[#f4f4f3] py-16 sm:py-20 lg:py-24"
      aria-labelledby="closing-title"
    >
      <Container>
        <div
          data-about-reveal
          className="grid gap-8 lg:grid-cols-[1.25fr_1fr_auto] lg:items-end lg:gap-10"
        >
          <div>
            <Eyebrow>Start a conversation</Eyebrow>
            <H2 id="closing-title" className="mt-5">
              Work with <M>Manifold.</M>
            </H2>
          </div>
          <p className="max-w-xl text-base leading-[1.8] text-black/65">
            Tell us about your organisation and we will connect you with the
            right people across the group.
          </p>
          <Link
            href="/contact"
            data-about-magnetic
            className="group inline-flex min-h-14 w-fit items-center justify-center bg-black px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#191919]"
          >
            <span
              data-about-magnetic-inner
              className="inline-flex items-center gap-10"
            >
              Let’s talk
              <Arrow className="text-[#fd018b]" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  const scope = useAboutMotion();

  return (
    <div ref={scope} className="manifold-about min-w-0 bg-white text-black">
      <PageHero />
      <WhoWeAre />
      <Story />
      <Structure />
      <Approach />
      <Experience />
      <Leadership />
      <Footprint />
      <ClosingBand />
      <div
        data-about-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-[#fd018b]"
      />
      <style jsx global>{`
        .manifold-about a:focus-visible {
          outline: 2px solid #fd018b;
          outline-offset: 5px;
        }
        @media (prefers-reduced-motion: reduce) {
          .manifold-about *,
          .manifold-about *::before,
          .manifold-about *::after {
            transition-duration: 0.01ms !important;
          }
        }
        @media print {
          .manifold-about [data-about-progress] {
            display: none !important;
          }
          .manifold-about [data-about-reveal],
          .manifold-about [data-about-word],
          .manifold-about [data-about-parent],
          .manifold-about [data-about-company],
          .manifold-about [data-about-hero-eyebrow],
          .manifold-about [data-about-hero-copy],
          .manifold-about [data-about-hero-frame] {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            clip-path: none !important;
          }
          .manifold-about [data-about-image],
          .manifold-about [data-about-tilt],
          .manifold-about [data-about-story-line],
          .manifold-about [data-about-rule],
          .manifold-about [data-about-connector-y],
          .manifold-about [data-about-connector-x] {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
