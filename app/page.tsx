"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Button,
  Container,
  CountUp,
  Eyebrow,
  H2,
  IMG,
  Img,
  M,
  OFFICES,
  Prose,
  RegionMap,
  Reveal,
  SubLogo,
  TextLink,
} from "@/components/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bgImgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 0.55, duration: 1.6, ease: "power2.out" },
      )
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=1.1",
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        );
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[90svh] sm:min-h-[92svh] items-end overflow-hidden bg-black text-white"
    >
      <img
        ref={bgImgRef}
        src={IMG.hero}
        alt="Manifold Headquarters"
        className="absolute inset-0 h-full w-full object-cover grayscale will-change-transform"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/50" />

      <Container className="relative pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-10 xl:col-span-9">
            <h1 className="hero-heading text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.75rem] text-balance">
              Building the technology behind modern <M>enterprise.</M>
            </h1>
            <p className="hero-desc mt-6 sm:mt-7 max-w-[42rem] text-base sm:text-lg lg:text-xl leading-relaxed text-white/80">
              For more than three decades, Manifold has helped organisations
              build, modernise and manage the technology environments they
              depend on — bringing infrastructure and digital transformation
              together through one group.
            </p>
            <div className="hero-cta-group mt-9 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
              <Button to="/about">Explore Manifold</Button>
              <TextLink to="/subsidiaries" light>
                Our Companies
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Intro() {
  const introRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!introRef.current) return;
      gsap.fromTo(
        introRef.current.querySelector(".stat-callout"),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: introRef },
  );

  return (
    <section
      ref={introRef}
      className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-40"
    >
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Manifold Holdings</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-[3.6rem] text-balance">
              One group. Built for an evolving <M>enterprise.</M>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-8">
            <div className="space-y-6 text-[16px] sm:text-[17px] leading-relaxed text-black/70">
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-black">
                Technology environments are becoming more connected, more
                complex and more central to how organisations operate.
              </p>
              <p>
                Manifold Holdings brings together two specialised technology
                companies with complementary strengths across enterprise
                infrastructure and digital transformation.
              </p>
              <p>
                Together, they give organisations access to broader expertise
                while allowing each business to remain focused on what it does
                best.
              </p>
            </div>

            <div className="stat-callout mt-10 flex items-center gap-8 border-t border-black/10 pt-8">
              <div>
                <p className="text-4xl sm:text-5xl font-bold tracking-[-0.04em]">
                  30<M>+</M>
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                  Years of experience
                </p>
              </div>
              <div className="ml-auto">
                <TextLink to="/about">About Manifold Holdings</TextLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const HOME_SUBS = [
  {
    code: "MCL",
    name: "Manifold Computers Limited",
    to: "/subsidiaries/manifold-computers",
    img: IMG.mcl,
    title: "The foundation behind enterprise technology.",
    copy: "Manifold Computers Limited builds and supports the technology environments organisations rely on every day — from networks and datacentres to end-user systems, enterprise platforms and managed infrastructure.",
    caps: [
      "Infrastructure",
      "Connectivity",
      "Datacentres",
      "End-User Computing",
      "Enterprise Platforms",
    ],
    cta: "Discover Manifold Computers",
  },
  {
    code: "MES",
    name: "Manifold Enterprise Solutions",
    to: "/subsidiaries/manifold-enterprise-solutions",
    img: IMG.mes,
    title: "Building what comes next.",
    copy: "Manifold Enterprise Solutions helps organisations modernise operations and develop new digital capabilities across cloud, cybersecurity, software, automation, Data & AI.",
    caps: [
      "Cloud & FinOps",
      "Data & AI",
      "Cybersecurity",
      "Software",
      "Automation & Productivity",
    ],
    cta: "Discover Manifold Enterprise Solutions",
  },
];

function SubsidiariesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(".subsidiary-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-black py-20 text-white sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-10 border-b border-white/15 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow light>Our Companies</Eyebrow>
            <H2 light className="mt-6">
              Different strengths. One shared <M>direction.</M>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <Prose light>
              <p>
                Our companies operate across different parts of the enterprise
                technology landscape, combining deep specialisation with the
                experience and perspective of the wider Manifold group.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
          {HOME_SUBS.map((s, i) => (
            <div
              key={s.code}
              className={`subsidiary-card pt-12 sm:pt-14 ${
                i === 0 ? "lg:border-r lg:border-white/15 lg:pr-12" : "lg:pl-12"
              }`}
            >
              <Link
                href={s.to}
                className="group block overflow-hidden rounded-[20px]"
              >
                <Img
                  src={s.img}
                  alt={s.name}
                  className="aspect-[16/10] rounded-[20px] [&_img]:transition-transform [&_img]:duration-[1.2s] group-hover:[&_img]:scale-[1.04]"
                />
              </Link>
              <div className="mt-8">
                <SubLogo code={s.code} name={s.name} light={true} />
              </div>
              <h3 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight lg:text-[1.75rem]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-[1.7] text-white/65">
                {s.copy}
              </p>
              <p className="mt-6 text-sm leading-7 text-white/50">
                {s.caps.map((c, j) => (
                  <span key={c}>
                    <span className="text-white/80 font-medium">{c}</span>
                    {j < s.caps.length - 1 && (
                      <span className="mx-2.5 text-magenta font-bold">/</span>
                    )}
                  </span>
                ))}
              </p>
              <div className="mt-8">
                <TextLink to={s.to} light>
                  {s.cta}
                </TextLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <TextLink to="/subsidiaries" light>
            View All Subsidiaries
          </TextLink>
        </div>
      </Container>
    </section>
  );
}

function WhyManifold() {
  const principles = [
    {
      t: "Specialist depth",
      d: "Each Manifold company develops expertise around clearly defined areas of enterprise technology.",
    },
    {
      t: "Shared perspective",
      d: "Our group structure creates greater visibility across infrastructure, applications, cloud, security and data.",
    },
    {
      t: "Continuity",
      d: "As client requirements change, the wider Manifold ecosystem can support new priorities without losing the understanding built through earlier engagements.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Why Manifold</Eyebrow>
            <H2 className="mt-6">
              A broader view of enterprise <M>technology.</M>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <Prose>
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-black">
                The systems organisations depend on rarely operate
                independently.
              </p>
              <p>
                Infrastructure influences cloud performance. Security spans
                networks, applications, users and data. New digital platforms
                depend on the strength of the environments beneath them.
              </p>
              <p>
                By bringing complementary capabilities together within one
                group, Manifold can approach these challenges with a wider
                understanding of the enterprise environment.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20 grid border-t border-black md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal
              key={p.t}
              delay={i * 0.08}
              className={`py-8 md:pr-10 ${
                i > 0
                  ? "border-t border-black/10 md:border-l md:border-t-0 md:pl-10"
                  : ""
              }`}
            >
              <p className="text-xs font-bold tabular-nums text-magenta tracking-widest">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-black/65">
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Proof() {
  const stats = [
    {
      v: <CountUp to={30} suffix="+" />,
      l: "Years of enterprise technology experience",
    },
    {
      v: (
        <>
          <CountUp to={270} prefix="$" />M<M>+</M>
        </>
      ),
      l: "Technology project value delivered",
    },
    { v: <CountUp to={2} />, l: "Specialised technology companies" },
    { v: "West Africa", l: "Regional presence", small: true },
  ];

  return (
    <section className="bg-charcoal py-20 text-white lg:py-24">
      <Container>
        <Eyebrow light>Manifold at a glance</Eyebrow>
        <div className="mt-10 sm:mt-12 grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`border-b border-white/15 py-10 pr-6 lg:border-b-0 ${
                i % 2 === 1 ? "border-l pl-6" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <p
                className={`font-bold leading-none tracking-[-0.04em] ${
                  s.small
                    ? "text-2xl sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]"
                    : "text-4xl sm:text-5xl lg:text-[4.25rem]"
                }`}
              >
                {s.v}
              </p>
              <p className="mt-4 sm:mt-5 max-w-[14rem] text-xs sm:text-sm leading-snug text-white/60">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Industries() {
  const items = [
    { t: "Banking & Financial Services", img: IMG.bank },
    { t: "Oil, Gas & Energy", img: IMG.energy },
    { t: "Manufacturing", img: IMG.mfg },
    { t: "Public Sector", img: IMG.gov },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Industries</Eyebrow>
            <H2 className="mt-6">
              Experience shaped by the environments we <M>serve.</M>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <Prose>
              <p>
                Our companies work with organisations operating in complex,
                highly regulated and business-critical environments across West
                Africa.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((it) => (
            <figure
              key={it.t}
              className="group relative aspect-[3/4] overflow-hidden rounded-[16px] bg-black shadow-md"
            >
              <img
                src={it.img}
                alt={it.t}
                className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-85 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                <span className="mb-3 sm:mb-4 block h-[2px] w-6 bg-magenta transition-all duration-500 group-hover:w-12" />
                <span className="text-[14px] sm:text-[15px] font-bold leading-snug text-white lg:text-lg">
                  {it.t}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Presence() {
  const [sel, setSel] = useState(0);

  return (
    <section className="bg-black py-20 sm:py-24 text-white lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <Eyebrow light>Our Reach</Eyebrow>
            <H2 light className="mt-6">
              Present where our clients <M>need us.</M>
            </H2>
            <Prose light className="mt-6">
              <p>
                With offices in Lagos, Abuja, Port Harcourt and Accra, Manifold
                combines regional experience with local delivery and enterprise
                support across Nigeria and Ghana.
              </p>
            </Prose>

            <ul className="mt-8 sm:mt-10 grid grid-cols-2 border-t border-white/15">
              {OFFICES.map((o, i) => (
                <li key={o.city} className="border-b border-white/15">
                  <button
                    onClick={() => setSel(i)}
                    className={`flex w-full items-center gap-3 py-3.5 sm:py-4 text-left text-[14px] sm:text-[15px] font-semibold transition-colors ${
                      sel === i
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full transition-transform ${
                        sel === i ? "bg-magenta scale-125" : "bg-white/30"
                      }`}
                    />
                    {o.city}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10">
              <TextLink to="/our-reach" light>
                Explore Our Reach
              </TextLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-2xl border border-white/10 bg-[#141416] p-4 sm:p-6 shadow-2xl">
              <RegionMap sel={sel} onSelect={setSel} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ClosingCTA() {
  const ctaCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ctaCardRef.current) return;
      gsap.fromTo(
        ctaCardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaCardRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: ctaCardRef },
  );

  return (
    <section className="bg-white px-3 sm:px-6 py-6 sm:py-10">
      <div
        ref={ctaCardRef}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-black/10 bg-white text-black shadow-lg"
      >
        <img
          src={IMG.tower}
          alt=""
          className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-20 grayscale lg:block"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />

        <Container className="relative py-20 sm:py-28 lg:py-36">
          <Reveal>
            <h2 className="max-w-4xl text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-7xl lg:text-[5.5rem] text-balance">
              Let’s build what comes <M>next.</M>
            </h2>
            <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-black/65">
              Whether your organisation is strengthening critical
              infrastructure, modernising operations or preparing for its next
              stage of transformation, our companies bring together the
              expertise and experience to help you move forward.
            </p>
            <div className="mt-8 sm:mt-10">
              <Button to="/contact">Talk to Manifold</Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Intro />
      <SubsidiariesSection />
      <WhyManifold />
      <Proof />
      <Industries />
      <Presence />
      <ClosingCTA />
    </div>
  );
}
