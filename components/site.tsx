"use client";

import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown, Menu, X, ShieldCheck } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION = "(prefers-reduced-motion: no-preference)";
const POINTER_MOTION =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=${w}`;

export const IMG = {
  hero: u("1526289034009-0240ddb68ce3", 2200),
  mcl: u("1744868562210-fffb7fa882d9"),
  mclAlt: u("1785682117028-6fcf2c0b515b"),
  mes: u("1735948055457-8d816fb80a87"),
  bank: u("1523477593243-78bbf626fd3b"),
  energy: u("1588011930968-eadac80e6a5a"),
  mfg: u("1717386255773-1e3037c81788"),
  gov: u("1523292562811-8fa7962a78c8"),
  tower: u("1535391879778-3bae11d29a24", 2000),
  facade: u("1469981283837-561b3779462f", 2000),
  lagos: u("1744907895363-d351aa6019ef", 2000),
  city: u("1569706971306-de5d78f6418e"),
};

export const EMAIL = "manifoldgroup@manifoldcomputers.com";
export const PHONE = "+234 913 079 8419";
export const PHONE_HREF = "tel:+2349130798419";

export const OFFICES = [
  {
    city: "Lagos",
    country: "Nigeria",
    role: "Group Head Office",
    x: 312,
    y: 318,
    d: "The group’s head office, home to Manifold leadership and the central delivery, commercial and support functions that serve clients across the region.",
    address: " Leadway Marble House 1 Alfred Rewane Road Ikoyi Lagos, Nigeria",
  },
  {
    city: "Abuja",
    country: "Nigeria",
    role: "Regional Office",
    x: 395,
    y: 236,
    d: "Supports public sector institutions and enterprises headquartered in the Federal Capital Territory and northern Nigeria.",
    address:
      "Plot 1854 Mahathir Mohammed Street Off T. Y. Danjuma Street Asokoro, Abuja Nigeria",
  },
  {
    city: "Port Harcourt",
    country: "Nigeria",
    role: "Regional Office",
    x: 382,
    y: 352,
    d: "Positioned close to the oil, gas and energy operators of the Niger Delta, providing local delivery and on-site support.",
    address:
      "35 Trans-Amadi Road Rumuobioakani Port Harcourt, Rivers State Nigeria",
  },
  {
    city: "Accra",
    country: "Ghana",
    role: "Regional Office",
    x: 196,
    y: 334,
    d: "Extends the group’s delivery and support capability to organisations operating in Ghana.",
    address:
      "House Number 3 Near Total Filling Station, Agbogba Pademmelon Street Accra, Ghana",
  },
];

export const SUBS = [
  {
    code: "MCL",
    image: "/logos/mcl-logo.png",
    name: "Manifold Computers Limited",
    to: "/subsidiaries/manifold-computers",
    desc: "Enterprise infrastructure, networks, datacentres & managed platforms.",
  },
  {
    code: "MES",
    image: "/logos/meslogo.png",
    name: "Manifold Enterprise Solutions",
    to: "/subsidiaries/manifold-enterprise-solutions",
    desc: "Cloud, cybersecurity, data, AI, software engineering & automation.",
  },
];

type NavItem = { label: string; to: string; sub?: typeof SUBS };
export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Subsidiaries", to: "/subsidiaries", sub: SUBS },
  { label: "Our Reach", to: "/reach" },
];

export function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 ${className}`}
      {...props}
    />
  );
}

export function Reveal({
  delay = 0,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();
      media.add(MOTION, () => {
        // Leave restored, already-visible content readable.
        if (element.getBoundingClientRect().bottom < 0) return;
        gsap.from(element, {
          opacity: 0,
          y: 28,
          duration: 0.85,
          delay: Math.max(0, delay),
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [delay], revertOnUpdate: true },
  );

  return <div ref={ref} className={className} {...props} />;
}

export function M({ children }: { children: ReactNode }) {
  return <span className="text-magenta">{children}</span>;
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${light ? "text-white/55" : "text-black/45"}`}
    >
      <span
        aria-hidden="true"
        className="mr-3 inline-block h-[2px] w-6 translate-y-[-3px] bg-magenta align-middle"
      />
      {children}
    </p>
  );
}

export function H2({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.3rem] md:text-[2.6rem] ${light ? "text-white" : "text-black"} ${className}`}
    >
      {children}
    </h2>
  );
}

export function Prose({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`space-y-5 text-[16px] leading-[1.7] sm:text-[17px] ${light ? "text-white/70" : "text-black/70"} ${className}`}
    >
      {children}
    </div>
  );
}

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
};

export function Button({
  children,
  to,
  className = "",
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const button = ref.current;
      const inner = innerRef.current;
      if (!button || !inner) return;
      const media = gsap.matchMedia();
      media.add(POINTER_MOTION, () => {
        // Tweens are created in the GSAP context, so they are cleaned up correctly.
        // The hit area stays stationary; only its contents follow the pointer.
        const xTo = gsap.quickTo(inner, "x", {
          duration: 0.4,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(inner, "y", {
          duration: 0.4,
          ease: "power3.out",
        });
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const box = button.getBoundingClientRect();
          xTo((event.clientX - box.left - box.width / 2) * 0.1);
          yTo((event.clientY - box.top - box.height / 2) * 0.14);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", reset);
        button.addEventListener("pointercancel", reset);
        button.addEventListener("blur", reset);
        return () => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", reset);
          button.removeEventListener("pointercancel", reset);
          button.removeEventListener("blur", reset);
        };
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <Link
      href={to}
      ref={ref}
      className={`group inline-flex items-center justify-center rounded-full bg-magenta px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#e0007a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta motion-safe:active:scale-95 ${className}`}
      {...props}
    >
      <span ref={innerRef} className="inline-flex items-center gap-3">
        <span>{children}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

export function TextLink({
  children,
  to,
  light = false,
  external = false,
}: {
  children: ReactNode;
  to: string;
  light?: boolean;
  external?: boolean;
}) {
  const classes = `group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold transition-colors ${light ? "text-white hover:text-magenta" : "text-black hover:text-magenta"}`;
  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-magenta transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 text-magenta transition-transform duration-300 motion-safe:group-hover:translate-x-1.5"
      />
    </>
  );
  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={to} className={classes}>
      {content}
    </Link>
  );
}

type ImgProps = { src: string; className?: string; alt?: string };

export function Img(props: ImgProps) {
  // A new source remounts the image so a previous load failure cannot persist.
  return <ImageVisual key={props.src} {...props} />;
}

function ImageVisual({
  src,
  className = "",
  alt = "Manifold Holdings visual",
}: ImgProps) {
  const [hasError, setHasError] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      {hasError ? (
        <div
          role="img"
          aria-label={alt || "Image unavailable"}
          className="flex h-full min-h-32 w-full items-center justify-center bg-neutral-900 p-8 text-neutral-400"
        >
          <ShieldCheck aria-hidden="true" className="size-8 text-magenta" />
        </div>
      ) : (
        // Native img intentionally supports the existing remote URLs without
        // requiring Next.js remotePatterns or changing the shared component API.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover grayscale-[85%] contrast-[1.05] transition-[filter,transform] duration-700 hover:grayscale-0 motion-safe:hover:scale-105"
        />
      )}
    </div>
  );
}

export function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const target = Number.isFinite(to) ? to : 0;

  useGSAP(
    () => {
      const element = valueRef.current;
      if (!element || !ref.current) return;
      element.textContent = String(target);
      const media = gsap.matchMedia();
      media.add(MOTION, () => {
        const value = { current: 0 };
        gsap.to(value, {
          current: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
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
        return () => {
          element.textContent = String(target);
        };
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [target], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className="font-mono tabular-nums">
      <span className="sr-only">
        {prefix}
        {target}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        <span ref={valueRef}>{target}</span>
        {suffix}
      </span>
    </span>
  );
}

export function SubLogo({
  code,
  name,
  light = true,
}: {
  code: string;
  name: string;
  light?: boolean;
}) {
  const words = name.trim().split(/\s+/);
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-magenta text-[11px] font-bold tracking-wider text-white shadow-sm transition-transform duration-300 motion-safe:hover:scale-105">
        {code}
      </span>
      <span
        className={`text-sm font-semibold leading-tight ${light ? "text-white" : "text-black"}`}
      >
        {words.slice(0, -1).join(" ")}
        <br />
        <span className={light ? "text-white/55" : "text-black/50"}>
          {words.at(-1)}
        </span>
      </span>
    </div>
  );
}

/* ---------- Hero and closing section ---------- */

export function PageHero({
  eyebrow,
  title,
  copy,
  img,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  img: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleId = useId();

  useGSAP(
    () => {
      if (!ref.current) return;
      const media = gsap.matchMedia();
      media.add(
        MOTION,
        () => {
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
          timeline
            .from(imageRef.current, {
              scale: 1.15,
              opacity: 0.1,
              duration: 1.4,
              ease: "power2.out",
              clearProps: "transform,opacity",
            })
            .from(
              "[data-hero-eyebrow]",
              {
                opacity: 0,
                x: -20,
                duration: 0.7,
                clearProps: "transform,opacity",
              },
              0.3,
            )
            .from(
              "[data-hero-title]",
              {
                opacity: 0,
                y: 35,
                duration: 0.95,
                clearProps: "transform,opacity",
              },
              0.45,
            )
            .from(
              "[data-hero-copy]",
              {
                opacity: 0,
                y: 20,
                duration: 0.8,
                clearProps: "transform,opacity",
              },
              0.65,
            );
        },
        ref,
      );
      media.add(
        `(min-width: 1024px) and ${POINTER_MOTION}`,
        () => {
          gsap.fromTo(
            backgroundRef.current,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        },
        ref,
      );
      return () => media.revert();
    },
    { scope: ref, dependencies: [img], revertOnUpdate: true },
  );

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-[12%] inset-x-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={img}
          alt=""
          className="h-full w-full object-cover opacity-45 grayscale"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35"
      />
      <Container className="relative pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-48">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div data-hero-eyebrow>
              <Eyebrow light>{eyebrow}</Eyebrow>
            </div>
            <h1
              id={titleId}
              data-hero-title
              className="mt-6 text-balance text-[2.4rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3.2rem] md:text-[3.8rem]"
            >
              {title}
            </h1>
            <p
              data-hero-copy
              className="mt-6 max-w-[38rem] text-base leading-relaxed text-white/75 sm:text-lg"
            >
              {copy}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ClosingBand({
  title,
  copy,
  cta = "Talk to Us",
  to = "/contact",
}: {
  title: ReactNode;
  copy: string;
  cta?: string;
  to?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        MOTION,
        () => {
          gsap.from("[data-closing-reveal]", {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          });
        },
        ref,
      );
      return () => media.revert();
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      className="border-t border-black/10 bg-white py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div data-closing-reveal className="lg:col-span-7">
            <H2>{title}</H2>
          </div>
          <div data-closing-reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] leading-relaxed text-black/65 sm:text-[17px]">
              {copy}
            </p>
            <div className="mt-8">
              <Button to={to}>{cta}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Interactive regional map ---------- */

// The same illustrative dot map, calculated once without time or randomness.
const MAP_DOTS: [number, number][] = [];
for (let x = 20; x < 560; x += 14) {
  for (let y = 40; y < 400; y += 14) {
    const coast =
      x < 120
        ? 300 + (120 - x) * 0.4
        : x < 360
          ? 335 + Math.sin((x - 120) / 40) * 6
          : 360 + (x - 360) * 0.6;
    if (y < coast && !(x < 60 && y < 120)) MAP_DOTS.push([x, y]);
  }
}

export function RegionMap({
  sel,
  onSelect,
  className = "",
}: {
  sel: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardId = useId();
  const index =
    Number.isInteger(sel) && sel >= 0 && sel < OFFICES.length ? sel : 0;
  const office = OFFICES[index];
  const hq = OFFICES[0];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add(
        MOTION,
        () => {
          const routes = gsap.timeline({
            paused: true,
            repeat: -1,
            repeatDelay: 1.5,
          });
          root
            .querySelectorAll<SVGPathElement>("[data-map-route]")
            .forEach((path, routeIndex) => {
              const length = path.getTotalLength();
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });
              routes.to(
                path,
                { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
                routeIndex * 0.18,
              );
            });
          const trigger = ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive && !document.hidden) routes.play();
              else routes.pause();
            },
          });
          const visibility = () => {
            if (!document.hidden && trigger.isActive) routes.play();
            else routes.pause();
          };
          visibility();
          document.addEventListener("visibilitychange", visibility);
          return () =>
            document.removeEventListener("visibilitychange", visibility);
        },
        ref,
      );
      return () => media.revert();
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION, () => {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      });
      return () => media.revert();
    },
    { scope: cardRef, dependencies: [index], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox="0 0 560 420"
        className={`h-auto w-full ${className}`}
        role="group"
        aria-label="Illustrative map: select a Manifold office in Nigeria or Ghana"
      >
        <g aria-hidden="true">
          {MAP_DOTS.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="1.2"
              fill="#fff"
              opacity="0.14"
            />
          ))}
          <line
            x1="268"
            y1="40"
            x2="268"
            y2="345"
            stroke="#fff"
            strokeOpacity="0.1"
            strokeDasharray="2 4"
          />
          <text
            x="300"
            y="72"
            fill="#fff"
            opacity="0.3"
            fontSize="10"
            letterSpacing="3"
          >
            NIGERIA
          </text>
          <text
            x="150"
            y="72"
            fill="#fff"
            opacity="0.3"
            fontSize="10"
            letterSpacing="3"
          >
            GHANA
          </text>
          <text
            x="200"
            y="402"
            fill="#fff"
            opacity="0.22"
            fontSize="9"
            letterSpacing="3"
          >
            GULF OF GUINEA
          </text>
          {OFFICES.slice(1).map((item) => {
            const d = `M${hq.x} ${hq.y} Q ${(hq.x + item.x) / 2} ${Math.min(hq.y, item.y) - 40} ${item.x} ${item.y}`;
            return (
              <g key={item.city}>
                <path
                  d={d}
                  stroke="#FD018B"
                  strokeOpacity="0.25"
                  fill="none"
                  strokeWidth="1.5"
                />
                <path
                  data-map-route
                  d={d}
                  stroke="#FD018B"
                  strokeOpacity="0.8"
                  fill="none"
                  strokeWidth="1.8"
                />
              </g>
            );
          })}
        </g>
        {OFFICES.map((item, i) => {
          const selected = index === i;
          return (
            <g
              key={item.city}
              role="button"
              tabIndex={0}
              aria-label={`Select ${item.city}, ${item.country}`}
              aria-pressed={selected}
              aria-controls={cardId}
              className="group cursor-pointer outline-none"
              onClick={() => onSelect(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(i);
                }
              }}
            >
              <circle
                cx={item.x}
                cy={item.y}
                r="23"
                fill="transparent"
                stroke="#FD018B"
                strokeWidth="1.5"
                className="stroke-opacity-0 group-focus-visible:stroke-opacity-100"
              />
              <circle
                cx={item.x}
                cy={item.y}
                r={selected ? 18 : 8}
                fill="#FD018B"
                opacity={selected ? 0.25 : 0.08}
                className={selected ? "motion-safe:animate-ping" : ""}
                style={{ transformOrigin: `${item.x}px ${item.y}px` }}
              />
              <circle
                cx={item.x}
                cy={item.y}
                r={selected ? 14 : 7}
                fill="#FD018B"
                opacity={selected ? 0.35 : 0.15}
              />
              <circle
                cx={item.x}
                cy={item.y}
                r={selected ? 5.5 : 4}
                fill="#FD018B"
                stroke="#000"
                strokeWidth="2"
              />
              <text
                x={item.x + 11}
                y={item.y - 9}
                fill="#fff"
                fontSize="11"
                fontWeight="600"
                opacity={selected ? 1 : 0.6}
                className="select-none transition-opacity duration-200"
              >
                {item.city}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        id={cardId}
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
      >
        <div ref={cardRef}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden="true"
                className="flex size-2 shrink-0 rounded-full bg-magenta motion-safe:animate-pulse"
              />
              <p className="text-xs font-bold uppercase tracking-widest text-magenta">
                {office.role} · {office.city}, {office.country}
              </p>
            </div>
            <span className="text-[11px] text-white/50 sm:max-w-[45%] sm:text-right">
              {office.address}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
            {office.d}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Logo and navigation ---------- */

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-transform duration-200 motion-safe:hover:scale-[1.02]"
      aria-label="Manifold Holdings home"
    >
      <Image
        src={dark ? "/logos/manifoldb.png" : "/logos/manifoldw.png"}
        width={150}
        height={150}
        alt="Manifold Holdings logo"
      />
    </Link>
  );
}

function matchesRoute(path: string | null, target: string) {
  return (
    !!path &&
    (target === "/"
      ? path === "/"
      : path === target || path.startsWith(`${target}/`))
  );
}

// Isolate usePathname behind Suspense for Cache Components + dynamic routes.
// This boundary is for pathname resolution, not for the footer's year.
export function Navigation() {
  return (
    <Suspense fallback={<NavigationView pathname={null} />}>
      <NavigationWithPathname />
    </Suspense>
  );
}

function NavigationWithPathname() {
  const pathname = usePathname();
  const [clientPath, setClientPath] = useState<string | null>(null);
  // Stable server/initial-client output also avoids rewrite hydration mismatches.
  useEffect(() => {
    setClientPath(pathname);
  }, [pathname]);
  return <NavigationView pathname={clientPath} />;
}

function NavigationView({ pathname }: { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();
  const dropdownId = useId();
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setOpen(false);
      setDropdownOpen(false);
    };
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      drawerRef.current
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus({ preventScroll: true }),
    );
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (!open && !dropdownOpen) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false);
        setDropdownOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (dropdownOpen) {
        setDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open, dropdownOpen]);

  useGSAP(
    () => {
      if (!open) return;
      const media = gsap.matchMedia();
      media.add(
        MOTION,
        () => {
          gsap.from("[data-mobile-item]", {
            y: 16,
            opacity: 0,
            stagger: 0.045,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        },
        headerRef,
      );
      return () => media.revert();
    },
    { scope: headerRef, dependencies: [open], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!dropdownOpen) return;
      const media = gsap.matchMedia();
      media.add(
        MOTION,
        () => {
          gsap.from("[data-desktop-dropdown]", {
            y: 8,
            opacity: 0,
            duration: 0.22,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        },
        headerRef,
      );
      return () => media.revert();
    },
    { scope: headerRef, dependencies: [dropdownOpen], revertOnUpdate: true },
  );

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
          setDropdownOpen(false);
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${solid ? "border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-md" : "border-b border-white/10 bg-black backdrop-blur-md"}`}
    >
      <Container className="flex h-[76px] items-center justify-between">
        <Logo dark={solid} />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = matchesRoute(pathname, item.to);
            const textColor = solid
              ? active
                ? "text-black"
                : "text-black/65 hover:text-black"
              : active
                ? "text-white"
                : "text-white/70 hover:text-white";
            return (
              <div
                key={item.to}
                className="group relative"
                onMouseEnter={() => {
                  if (item.sub) setDropdownOpen(true);
                }}
                onMouseLeave={(event) => {
                  if (
                    item.sub &&
                    !event.currentTarget.contains(document.activeElement)
                  )
                    setDropdownOpen(false);
                }}
                onBlur={(event) => {
                  if (
                    item.sub &&
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  )
                    setDropdownOpen(false);
                }}
              >
                <div className={`flex items-center gap-1.5 ${textColor}`}>
                  <Link
                    href={item.to}
                    aria-current={pathname === item.to ? "page" : undefined}
                    onClick={() => setDropdownOpen(false)}
                    className="relative py-2 text-sm font-semibold transition-colors duration-200"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-magenta transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"}`}
                    />
                  </Link>
                  {item.sub && (
                    <button
                      type="button"
                      ref={dropdownButtonRef}
                      onClick={() => setDropdownOpen((value) => !value)}
                      aria-label="Toggle subsidiaries submenu"
                      aria-expanded={dropdownOpen}
                      aria-controls={dropdownId}
                      className="grid size-7 place-items-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-3.5 opacity-60 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {item.sub && (
                  <div
                    id={dropdownId}
                    hidden={!dropdownOpen}
                    className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                  >
                    <div
                      data-desktop-dropdown
                      className="space-y-1 rounded-xl border border-black/10 bg-white p-3 shadow-2xl"
                    >
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.to}
                          href={sub.to}
                          onClick={() => setDropdownOpen(false)}
                          aria-current={
                            pathname === sub.to ? "page" : undefined
                          }
                          className="group/item flex items-start gap-3.5 rounded-lg p-3 text-left transition-colors hover:bg-[#f4f4f3] focus-visible:bg-[#f4f4f3]"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded bg-magenta text-[11px] font-bold tracking-wider text-white">
                            {sub.code}
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-black transition-colors group-hover/item:text-magenta">
                              {sub.name}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-black/60">
                              {sub.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            to="/contact"
            onClick={() => {
              setOpen(false);
              setDropdownOpen(false);
            }}
            className="hidden px-5 py-2.5 text-xs font-semibold sm:inline-flex"
          >
            Talk to Us
          </Button>
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={drawerId}
            className={`grid size-10 place-items-center rounded-lg border transition-colors lg:hidden ${solid ? "border-black/10 text-black hover:bg-neutral-100" : "border-white/20 text-white hover:bg-white/10"}`}
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </Container>
      {/* hidden removes collapsed links from both keyboard and accessibility navigation. */}
      <div
        id={drawerId}
        ref={drawerRef}
        hidden={!open}
        className="max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain border-t border-black/10 bg-white shadow-2xl lg:hidden"
      >
        <Container className="pb-8 pt-2">
          <nav
            aria-label="Mobile"
            onClick={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest("a[href]")
              )
                setOpen(false);
            }}
          >
            {NAV.map((item) => (
              <div
                key={item.to}
                data-mobile-item
                className="border-b border-black/10"
              >
                <Link
                  href={item.to}
                  aria-current={pathname === item.to ? "page" : undefined}
                  className={`block py-4 text-xl font-bold tracking-tight hover:text-magenta ${matchesRoute(pathname, item.to) ? "text-magenta" : "text-black"}`}
                >
                  {item.label}
                </Link>
                {item.sub && (
                  <div className="space-y-2 pb-3 pl-4">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.to}
                        href={sub.to}
                        aria-current={pathname === sub.to ? "page" : undefined}
                        className="flex min-h-11 items-center gap-2 text-[15px] font-medium text-black/65 transition-colors hover:text-magenta"
                      >
                        <span className="text-xs font-bold text-magenta">
                          {sub.code}
                        </span>
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div data-mobile-item className="pt-6">
              <Button to="/contact" className="w-full justify-center">
                Talk to Us
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

/* ---------- Footer: no date access during rendering ---------- */

function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Effects run in the browser, after prerendering/hydration.
    // Do not move this into JSX, useMemo or a useState initializer.
    const updateYear = () => setYear(new Date().getFullYear());
    updateYear();
    const interval = window.setInterval(updateYear, 60 * 60 * 1000);
    const onVisible = () => {
      if (!document.hidden) updateYear();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // Identical initial server/client output; four characters reserve the space.
  return (
    <span className="inline-block min-w-[4ch] tabular-nums">
      {year ?? "\u00a0"}
    </span>
  );
}

type PolicyLinks = { privacy?: string; security?: string; governance?: string };
type FooterProps = { linkedinUrl?: string; policyLinks?: PolicyLinks };

export function Footer({ linkedinUrl, policyLinks }: FooterProps = {}) {
  const head =
    "text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45";
  const link = "text-sm text-white/70 transition-colors hover:text-white";
  const policies = [
    { label: "Privacy Policy", href: policyLinks?.privacy },
    { label: "Security Charter", href: policyLinks?.security },
    { label: "Governance", href: policyLinks?.governance },
  ];

  return (
    <footer className="bg-black text-white">
      <Container className="pt-20">
        <div className="grid gap-x-8 gap-y-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              A technology group bringing together specialised businesses across
              enterprise infrastructure and digital transformation.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/45">
              <span>ISO 9001 Certified</span>
              <span aria-hidden="true">·</span>
              <span>West Africa Operations</span>
            </div>
          </Reveal>
          <Reveal delay={0.04} className="lg:col-span-2">
            <p className={head}>Manifold Holdings</p>
            <ul className="mt-5 space-y-3">
              {NAV.slice(1).map((item) => (
                <li key={item.to}>
                  <Link className={link} href={item.to}>
                    {item.label === "About Us" ? "About" : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <p className={head}>Companies</p>
            <ul className="mt-5 space-y-3">
              {SUBS.map((sub) => (
                <li key={sub.to}>
                  <Link className={link} href={sub.to}>
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-2">
            <p className={head}>Locations</p>
            <ul className="mt-5 space-y-3">
              {OFFICES.map((office) => (
                <li
                  key={office.city}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-magenta/80"
                  />
                  <span>
                    {office.city}, {office.country}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16} className="lg:col-span-2">
            <p className={head}>Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  className={`${link} break-all hover:text-magenta`}
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a className={`${link} hover:text-magenta`} href={PHONE_HREF}>
                  {PHONE}
                </a>
              </li>
              <li>
                {linkedinUrl ? (
                  <a
                    className={`${link} hover:text-magenta cursor-pointer`}
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="text-sm text-white/70">LinkedIn ↗</span>
                )}
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="flex flex-col items-center gap-3 py-8 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">
            © <CopyrightYear /> Manifold Holdings. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {policies.map((policy) =>
              policy.href ? (
                <Link
                  key={policy.label}
                  href={policy.href}
                  className="transition-colors hover:text-white"
                >
                  {policy.label}
                </Link>
              ) : (
                <span key={policy.label}>{policy.label}</span>
              ),
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function Root({
  children,
  linkedinUrl,
  policyLinks,
}: { children?: ReactNode } & FooterProps) {
  return (
    <div className="manifold-site flex min-h-screen flex-col bg-white font-sans text-black selection:bg-magenta selection:text-white">
      <a
        href="#manifold-main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-magenta px-5 py-3 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="manifold-main" tabIndex={-1} className="w-full flex-1">
        {children}
      </main>
      <Footer linkedinUrl={linkedinUrl} policyLinks={policyLinks} />
      <style jsx global>{`
        .manifold-site a:focus-visible,
        .manifold-site button:focus-visible {
          outline: 2px solid #fd018b;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .manifold-site *,
          .manifold-site *::before,
          .manifold-site *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
