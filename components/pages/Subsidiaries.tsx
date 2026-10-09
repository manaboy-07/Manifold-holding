"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Server,
  Network,
  Database,
  Monitor,
  AppWindow,
  Headset,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Code2,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  Button,
  Container,
  Eyebrow,
  H2,
  IMG,
  Img,
  M,
  PageHero,
  Prose,
  Reveal,
  SubLogo,
  TextLink,
} from "../../components/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const COMPANIES = {
  mcl: {
    code: "MCL",
    name: "Manifold Computers Limited",
    short: "Manifold Computers",
    to: "/subsidiaries/manifold-computers",
    site: "#",
    img: IMG.mcl,
    img2: IMG.mclAlt,
    role: "Enterprise technology foundations",
    summary:
      "Manifold Computers Limited designs, deploys and supports the core technology environments organisations rely on to operate securely and efficiently — the networks, datacentres, end-user systems and enterprise platforms that everything else depends on.",
    caps: [
      {
        icon: Server,
        t: "Enterprise Infrastructure",
        d: "Compute, storage and platform infrastructure designed for performance, resilience and supportability.",
      },
      {
        icon: Network,
        t: "Connectivity & Networks",
        d: "Campus, branch and wide-area networks that keep distributed organisations connected and secure.",
      },
      {
        icon: Database,
        t: "Modern Datacentre",
        d: "Datacentre design, modernisation and consolidation, including hybrid and converged environments.",
      },
      {
        icon: Monitor,
        t: "End-User Computing",
        d: "Devices, workspace platforms and lifecycle services for large and distributed workforces.",
      },
      {
        icon: AppWindow,
        t: "Enterprise Software",
        d: "Licensing, deployment and management of the enterprise platforms organisations run on.",
      },
      {
        icon: Headset,
        t: "Managed Services",
        d: "Ongoing monitoring, support and operation of critical infrastructure under defined service levels.",
      },
    ],
  },
  mes: {
    code: "MES",
    name: "Manifold Enterprise Solutions",
    short: "Manifold Enterprise Solutions",
    to: "/subsidiaries/manifold-enterprise-solutions",
    site: "#",
    img: IMG.mes,
    img2: IMG.city,
    role: "Digital transformation and modernisation",
    summary:
      "Manifold Enterprise Solutions helps organisations modernise how they operate through cloud, software, cybersecurity, automation, Data & AI and productivity technologies — with a focus on optimisation and measurable business outcomes.",
    caps: [
      {
        icon: Cloud,
        t: "Cloud & FinOps",
        d: "Cloud strategy, migration and ongoing cost governance so that cloud investment delivers sustained value.",
      },
      {
        icon: BrainCircuit,
        t: "Data & AI",
        d: "Data platforms, analytics and applied AI that turn operational data into better decisions.",
      },
      {
        icon: ShieldCheck,
        t: "Cybersecurity",
        d: "Security architecture, identity, threat protection and governance across users, applications and data.",
      },
      {
        icon: Code2,
        t: "Software Development",
        d: "Custom applications and integrations built around specific operational and customer requirements.",
      },
      {
        icon: Workflow,
        t: "Automation & Productivity",
        d: "Process automation and modern collaboration tools that reduce manual effort and improve how teams work.",
      },
      {
        icon: Headset,
        t: "Managed Services",
        d: "Continuous management of cloud, security and application environments as they evolve.",
      },
    ],
  },
};

export type CompanyItem = (typeof COMPANIES)["mcl"];

export function CompanySection({
  c,
  flip,
  dark,
}: {
  c: CompanyItem;
  flip?: boolean;
  dark?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const items = sectionRef.current.querySelectorAll(".cap-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden transition-colors ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="grid lg:grid-cols-2 items-stretch">
        <div
          className={`relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[720px] ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <Img
            src={c.img}
            alt={c.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20">
          <Reveal>
            <SubLogo code={c.code} name={c.name} light={dark} />
            <p
              className={`mt-8 sm:mt-10 text-[11px] font-bold uppercase tracking-[0.22em] ${
                dark ? "text-white/45" : "text-black/45"
              }`}
            >
              {c.role}
            </p>
            <p
              className={`mt-4 text-lg sm:text-xl lg:text-[22px] leading-[1.6] ${
                dark ? "text-white/90" : "text-black/85"
              }`}
            >
              {c.summary}
            </p>

            <ul
              ref={listRef}
              className={`mt-10 grid border-t sm:grid-cols-2 ${
                dark ? "border-white/15" : "border-black/10"
              }`}
            >
              {c.caps.map(({ icon: Icon, t }) => (
                <li
                  key={t}
                  className={`cap-item group flex items-center gap-3 border-b py-3.5 sm:py-4 text-[14px] sm:text-[15px] transition-colors ${
                    dark
                      ? "border-white/10 text-white/80 hover:text-white"
                      : "border-black/10 text-black/80 hover:text-black"
                  }`}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded bg-magenta/10 group-hover:bg-magenta/20 transition-colors">
                    <Icon
                      className="size-[17px] text-magenta"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="font-medium tracking-tight">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <TextLink to={c.to} light={dark}>
                {`Discover ${c.short}`}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyTwo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(".comparison-block");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Why two companies</Eyebrow>
            <H2 className="mt-6">
              Focused businesses with complementary <M>roles.</M>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <Prose>
              <p>
                Enterprise infrastructure and digital transformation call for
                different disciplines, different specialist teams and different
                ways of engaging with clients. Combining them in a single
                organisation risks diluting both.
              </p>
              <p>
                Manifold Holdings therefore operates through two specialised
                companies. Manifold Computers Limited concentrates on the
                foundations — infrastructure, networks, datacentres and end-user
                environments. Manifold Enterprise Solutions concentrates on what
                organisations build on those foundations — cloud, data,
                security, software and automation.
              </p>
              <p>
                Each can invest deeply in its own field, while the group ensures
                that clients benefit from both when their requirements cross the
                boundary between them.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div ref={containerRef} className="mt-16 sm:mt-20">
          <div className="grid border-y border-black md:grid-cols-[1fr_auto_1fr] divide-y md:divide-y-0 divide-black/10">
            <div className="comparison-block py-8 md:pr-10">
              <span className="inline-block rounded bg-magenta/10 px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] text-magenta">
                MCL
              </span>
              <p className="mt-3 text-lg sm:text-xl font-bold tracking-tight">
                The environments organisations run on
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/65">
                Infrastructure, connectivity, datacentres, end-user computing,
                enterprise software and managed infrastructure.
              </p>
            </div>
            <div className="comparison-block flex items-center justify-center py-5 md:border-x md:border-black/10 md:py-0 md:px-8">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                Complements
              </span>
            </div>
            <div className="comparison-block py-8 md:pl-10">
              <span className="inline-block rounded bg-magenta/10 px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] text-magenta">
                MES
              </span>
              <p className="mt-3 text-lg sm:text-xl font-bold tracking-tight">
                The capabilities organisations build
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/65">
                Cloud and FinOps, Data & AI, cybersecurity, software,
                automation, productivity and managed services.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Together() {
  const togetherRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!togetherRef.current) return;
      gsap.fromTo(
        togetherRef.current.querySelector(".together-inner"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: togetherRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: togetherRef },
  );

  return (
    <section
      ref={togetherRef}
      className="bg-charcoal py-20 sm:py-24 text-white lg:py-32 relative overflow-hidden"
    >
      <Container className="together-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow light>The Group</Eyebrow>
            <H2 light className="mt-6">
              Stronger <M>together.</M>
            </H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <Prose light>
              <p className="text-lg sm:text-xl leading-relaxed text-white font-medium">
                The value of the group goes beyond the capabilities of either
                company individually.
              </p>
              <p>
                As enterprise environments become more interconnected, clients
                increasingly need technology partners that can understand both
                the foundations they operate on and the digital capabilities
                they are building toward.
              </p>
              <p>
                Manifold’s structure allows our companies to remain specialised
                while contributing to a wider view of the client’s technology
                environment.
              </p>
            </Prose>
            <div className="mt-10">
              <Button to="/contact">Talk to Us</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default function Subsidiaries() {
  return (
    <>
      <PageHero
        eyebrow="Our Subsidiaries"
        title={
          <>
            Specialist businesses. Connected by one <M>vision.</M>
          </>
        }
        copy="Manifold Holdings brings together companies with distinct areas of expertise and a shared commitment to helping organisations build stronger, more capable technology environments."
        img={IMG.facade}
      />
      <WhyTwo />
      <CompanySection c={COMPANIES.mcl} dark />
      <CompanySection c={COMPANIES.mes} flip />
      <Together />
    </>
  );
}

/* ---------- Subsidiary profile pages ---------- */

export type ProfileCopy = {
  c: CompanyItem;
  title: React.ReactNode;
  intro: string;
  whatTitle: React.ReactNode;
  what: string[];
  roleTitle: string;
  role: string[];
  focus?: { title: React.ReactNode; body: string[] };
  serves: { t: string; d: string }[];
  connectTitle: React.ReactNode;
  connect: string[];
  sibling: CompanyItem;
};

export function Profile(p: ProfileCopy) {
  const { c } = p;
  const capsGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!capsGridRef.current) return;
      const cards = capsGridRef.current.querySelectorAll(".cap-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: capsGridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: capsGridRef },
  );

  return (
    <>
      <PageHero
        eyebrow={`${c.code} · A Manifold Holdings company`}
        title={p.title}
        copy={p.intro}
        img={c.img}
      />

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>What we do</Eyebrow>
              <H2 className="mt-6">{p.whatTitle}</H2>
            </Reveal>
            <Reveal
              delay={0.1}
              className="lg:col-span-6 lg:col-start-7 lg:pt-8"
            >
              <Prose>
                {p.what.map((t, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-lg sm:text-xl font-medium leading-relaxed text-black"
                        : ""
                    }
                  >
                    {t}
                  </p>
                ))}
              </Prose>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-black text-white">
        <div className="grid lg:grid-cols-2">
          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28 xl:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] flex flex-col justify-center">
            <Eyebrow light>Role within the group</Eyebrow>
            <H2 light className="mt-6">
              {p.roleTitle}
            </H2>
            <Prose light className="mt-6">
              {p.role.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </Prose>
          </div>
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
            <Img
              src={c.img2}
              alt={p.roleTitle}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Capability areas</Eyebrow>
            <H2 className="mt-6 max-w-2xl">
              Six areas of specialist <M>capability.</M>
            </H2>
          </Reveal>
          <div
            ref={capsGridRef}
            className="mt-12 sm:mt-16 grid border-t border-black md:grid-cols-2 lg:grid-cols-3"
          >
            {c.caps.map(({ icon: Icon, t, d }, i) => (
              <div
                key={t}
                className={`cap-card group border-b border-black/10 py-8 pr-6 sm:pr-8 transition-colors duration-200 hover:bg-neutral-50/70 p-4 sm:p-6 ${
                  i % 3 !== 0 ? "lg:border-l lg:pl-8" : ""
                } ${i % 2 === 1 ? "md:max-lg:border-l md:max-lg:pl-8" : ""}`}
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-magenta/10 group-hover:bg-magenta/20 transition-all">
                  <Icon className="size-6 text-magenta" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg sm:text-xl font-bold tracking-tight group-hover:text-magenta transition-colors">
                  {t}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-black/65">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {p.focus && (
        <section className="bg-[#f4f4f3] py-20 sm:py-24 lg:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-5">
                <Eyebrow>Transformation focus</Eyebrow>
                <H2 className="mt-6">{p.focus.title}</H2>
              </Reveal>
              <Reveal
                delay={0.1}
                className="lg:col-span-6 lg:col-start-7 lg:pt-8"
              >
                <Prose>
                  {p.focus.body.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </Prose>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      <section
        className={`py-20 sm:py-24 lg:py-32 ${p.focus ? "" : "bg-[#f4f4f3]"}`}
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Who we serve</Eyebrow>
              <H2 className="mt-6">
                Organisations where technology is <M>critical.</M>
              </H2>
            </Reveal>
            <dl className="border-t border-black lg:col-span-7 lg:col-start-6 divide-y divide-black/10">
              {p.serves.map((s) => (
                <div
                  key={s.t}
                  className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8 items-baseline"
                >
                  <dt className="font-semibold text-base sm:text-[17px] text-black flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-magenta shrink-0" />
                    {s.t}
                  </dt>
                  <dd className="text-[15px] leading-[1.7] text-black/65">
                    {s.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-20 sm:py-24 text-white lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow light>Connected to the group</Eyebrow>
              <H2 light className="mt-6">
                {p.connectTitle}
              </H2>
            </Reveal>
            <Reveal
              delay={0.1}
              className="lg:col-span-6 lg:col-start-7 lg:pt-8"
            >
              <Prose light>
                {p.connect.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </Prose>
              <Link
                href={p.sibling.to}
                className="group mt-10 flex items-center justify-between border-y border-white/15 py-6 transition-colors hover:border-magenta"
              >
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.2em] text-magenta">
                    {p.sibling.code} · Sister company
                  </span>
                  <span className="mt-1 block text-lg sm:text-xl font-semibold">
                    {p.sibling.name}
                  </span>
                </span>
                <span className="text-magenta transition-transform group-hover:translate-x-2 text-xl font-bold">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SubLogo code={c.code} name={c.name} light={false} />
              <H2 className="mt-8">Learn more about {c.short}.</H2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-base sm:text-[17px] leading-relaxed text-black/65">
                Full service information, case studies and team contacts are
                available on the {c.short} website.
              </p>
              <a
                href={c.site}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#e0007a] hover:shadow-lg active:scale-95"
              >
                Visit {c.short} ↗
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export const SERVES_COMMON = [
  {
    t: "Banking & Financial Services",
    d: "Regulated, always-on environments where availability, security and auditability are essential.",
  },
  {
    t: "Oil, Gas & Energy",
    d: "Distributed operations that depend on resilient connectivity and dependable on-site support.",
  },
  {
    t: "Manufacturing",
    d: "Plants and supply chains where operational technology and enterprise systems must work together.",
  },
  {
    t: "Public Sector",
    d: "Institutions modernising service delivery on secure, sustainable digital foundations.",
  },
  {
    t: "Multinationals",
    d: "Regional operations that require global standards to be delivered and supported locally.",
  },
];

export function MCLPage() {
  return (
    <Profile
      c={COMPANIES.mcl}
      sibling={COMPANIES.mes}
      title={
        <>
          The foundation behind enterprise <M>technology.</M>
        </>
      }
      intro="Manifold Computers Limited builds and supports the technology environments organisations rely on every day."
      whatTitle={
        <>
          Designing, deploying and supporting core technology{" "}
          <M>environments.</M>
        </>
      }
      what={[
        "Manifold Computers Limited works with organisations to plan, implement and operate the infrastructure on which their business runs.",
        "Its work spans enterprise infrastructure, networking, modern datacentres, end-user computing, enterprise software and managed services — from initial design and procurement through deployment, support and lifecycle renewal.",
        "Working alongside leading global technology manufacturers, the company brings proven platforms to clients together with the local engineering and support capability needed to run them well.",
      ]}
      roleTitle="The group’s foundation business."
      role={[
        "Manifold Computers Limited represents the longest-established part of the Manifold group, carrying the infrastructure experience that has been built over more than three decades.",
        "Within Manifold Holdings, it is responsible for the environments that the rest of an organisation’s technology depends on. That role gives the group a detailed understanding of how clients’ systems actually operate — knowledge that informs every subsequent engagement.",
      ]}
      serves={SERVES_COMMON}
      connectTitle={
        <>
          Working alongside Manifold Enterprise <M>Solutions.</M>
        </>
      }
      connect={[
        "Many modernisation programmes begin with infrastructure: a network that must support cloud services, a datacentre that must integrate with hybrid platforms, or end-user environments that must be secured for new ways of working.",
        "When client requirements extend into cloud, data, security or software, Manifold Computers works with Manifold Enterprise Solutions so that foundations and transformation are planned together rather than in isolation.",
      ]}
    />
  );
}

export function MESPage() {
  return (
    <Profile
      c={COMPANIES.mes}
      sibling={COMPANIES.mcl}
      title={
        <>
          Helping enterprises modernise, optimise and <M>transform.</M>
        </>
      }
      intro="Manifold Enterprise Solutions helps organisations develop new digital capabilities across cloud, cybersecurity, software, automation, Data & AI."
      whatTitle={
        <>
          Modernising how organisations <M>operate.</M>
        </>
      }
      what={[
        "Manifold Enterprise Solutions works with organisations to change how they operate through modern technology — moving workloads to the cloud, protecting data and users, building software, automating processes and putting data to work.",
        "The company combines technical expertise with a focus on business outcomes: lower operating costs, better decisions, stronger security and more productive teams.",
      ]}
      roleTitle="The group’s transformation business."
      role={[
        "Manifold Enterprise Solutions extends the Manifold group beyond infrastructure into the digital capabilities that increasingly define how organisations compete and serve their customers.",
        "Its role within Manifold Holdings is to help clients build on their existing foundations — taking advantage of new technologies while managing the cost, risk and complexity that come with them.",
      ]}
      focus={{
        title: (
          <>
            Transformation that delivers measurable <M>value.</M>
          </>
        ),
        body: [
          "Digital transformation is often discussed in broad terms. In practice, it consists of specific decisions: which workloads to move to the cloud and how to govern their cost; how to secure identities and data across a changing estate; which processes to automate; which data to trust.",
          "Manifold Enterprise Solutions approaches these decisions with an emphasis on optimisation and outcomes — establishing clear objectives at the outset and continuing to measure and refine once solutions are in operation.",
        ],
      }}
      serves={SERVES_COMMON}
      connectTitle={
        <>
          Working alongside Manifold <M>Computers.</M>
        </>
      }
      connect={[
        "Cloud performance depends on networks. Security depends on infrastructure. Data and AI depend on the reliability of the systems that generate and store information.",
        "By working alongside Manifold Computers Limited, Manifold Enterprise Solutions can design transformation programmes with a full understanding of the environments beneath them — and clients can rely on one group for both.",
      ]}
    />
  );
}
