"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
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
} from "@/components/site";

// useGSAP uses an effect on the server and a layout effect in the browser.
gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION = "(prefers-reduced-motion: no-preference)";
const DESKTOP_MOTION =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

interface CompanyItem {
  code: string;
  name: string;
  short: string;
  to: string;
  img: string;
  img2: string;
  role: string;
  summary: string;
  caps: { icon: LucideIcon; t: string; d: string }[];
}

const COMPANIES = {
  mcl: {
    code: "MCL",
    name: "Manifold Computers Limited",
    short: "Manifold Computers",
    to: "/subsidiaries/manifold-computers",
    image: "/logos/mcl-logo.png",
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
    image: "/logos/meslogo.png",
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
} satisfies Record<"mcl" | "mes", CompanyItem>;

/** These attributes belong only to this page, so MotionShell will not animate them. */
function useSubsidiaryMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const media = gsap.matchMedia();
      let disposed = false;
      let refreshFrame = 0;

      const refresh = () => {
        if (disposed) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };

      media.add(
        MOTION,
        () => {
          root
            .querySelectorAll<HTMLElement>("[data-subs-reveal]")
            .forEach((element) => {
              // Preserve restored scroll positions and keyboard-focused content.
              if (
                element.getBoundingClientRect().bottom <= 0 ||
                element.contains(document.activeElement)
              )
                return;
              gsap.fromTo(
                element,
                { y: 26, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: "power3.out",
                  // Content remains visible until its own animation actually starts.
                  immediateRender: false,
                  clearProps: "transform,opacity",
                  scrollTrigger: {
                    trigger: element,
                    start: "clamp(top 92%)",
                    once: true,
                  },
                },
              );
            });

          root
            .querySelectorAll<HTMLElement>("[data-subs-rule]")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1.15,
                  ease: "power3.inOut",
                  immediateRender: false,
                  clearProps: "transform,transformOrigin",
                  scrollTrigger: {
                    trigger: element,
                    start: "clamp(top 94%)",
                    once: true,
                  },
                },
              );
            });
        },
        root,
      );

      media.add(
        DESKTOP_MOTION,
        () => {
          root
            .querySelectorAll<HTMLElement>("[data-subs-frame]")
            .forEach((frame) => {
              const image =
                frame.querySelector<HTMLElement>("[data-subs-image]");
              if (!image) return;
              gsap.fromTo(
                image,
                { yPercent: -3 },
                {
                  yPercent: 3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
        },
        root,
      );

      // Capture also catches images that finish loading after the initial render.
      root.addEventListener("load", refresh, true);
      root.addEventListener("error", refresh, true);
      void document.fonts.ready.then(refresh);
      refresh();

      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        root.removeEventListener("load", refresh, true);
        root.removeEventListener("error", refresh, true);
        media.revert();
      };
    },
    { scope: rootRef },
  );
}

function CompanyLink({
  company,
  light = false,
}: {
  company: CompanyItem;
  light?: boolean;
}) {
  return (
    <Link
      href={company.to}
      className={`group inline-flex min-h-12 max-w-full items-center gap-4 rounded-full border px-5 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta motion-safe:transition-colors ${
        light
          ? "border-white/25 text-white hover:border-magenta"
          : "border-black/20 text-black hover:border-magenta"
      }`}
    >
      <span className="min-w-0">Explore {company.short}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 shrink-0 text-magenta motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
    </Link>
  );
}

function CompanySection({
  company,
  flip = false,
  dark = false,
}: {
  company: CompanyItem;
  flip?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      id={company.code.toLowerCase()}
      aria-labelledby={`${company.code}-title`}
      className={`scroll-mt-24 overflow-hidden ${dark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
            <div
              data-subs-frame
              className="relative aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/11] lg:aspect-[4/5]"
            >
              <div data-subs-image className="absolute -inset-6">
                <Image
                  src={company.image}
                  width={60}
                  height={60}
                  alt="Manifold logo"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    A Manifold Holdings company
                  </p>
                  <p className="mt-2 text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl">
                    {company.code}
                    <span className="text-magenta">.</span>
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mb-1 h-px w-16 bg-magenta"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:py-3">
            <div data-subs-reveal>
              <Eyebrow light={dark}>{company.role}</Eyebrow>
              <h2
                id={`${company.code}-title`}
                className="mt-5 text-balance text-3xl font-bold leading-[1.12] tracking-[-0.035em] sm:text-4xl xl:text-[2.7rem]"
              >
                {company.name}
              </h2>
              <p
                className={`mt-6 text-base leading-[1.8] sm:text-[17px] ${dark ? "text-white/70" : "text-black/70"}`}
              >
                {company.summary}
              </p>
            </div>

            <div
              data-subs-rule
              aria-hidden="true"
              className={`mt-8 h-px ${dark ? "bg-white/20" : "bg-black/15"}`}
            />
            <ul className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {company.caps.map(({ icon: Icon, t }) => (
                <li
                  key={t}
                  data-subs-reveal
                  className={`flex min-w-0 items-center gap-3 border-b py-4 text-sm ${dark ? "border-white/10 text-white/80" : "border-black/10 text-black/80"}`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-magenta/10">
                    <Icon
                      aria-hidden="true"
                      className="size-[18px] text-magenta"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="font-medium leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
            <div data-subs-reveal className="mt-9">
              <CompanyLink company={company} light={dark} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhyTwo() {
  return (
    <section
      aria-labelledby="subsidiaries-overview-title"
      className="bg-white py-16 text-black sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div data-subs-reveal className="min-w-0 lg:col-span-5">
            <Eyebrow>Why two companies</Eyebrow>
            <h2
              id="subsidiaries-overview-title"
              className="mt-6 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
            >
              Focused businesses with complementary <M>roles.</M>
            </h2>
          </div>
          <div
            data-subs-reveal
            className="min-w-0 lg:col-span-6 lg:col-start-7"
          >
            <Prose>
              <p>
                Enterprise infrastructure and digital transformation call for
                different disciplines, specialist teams and ways of engaging
                with clients.
              </p>
              <p>
                Manifold Computers Limited concentrates on the foundations.
                Manifold Enterprise Solutions concentrates on what organisations
                build on those foundations.
              </p>
              <p>
                Each invests deeply in its own field, while the group connects
                their expertise when clients need both.
              </p>
            </Prose>
          </div>
        </div>

        <nav
          aria-label="Explore our companies"
          className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 md:gap-6"
        >
          {[COMPANIES.mcl, COMPANIES.mes].map((company, index) => (
            <div key={company.code} data-subs-reveal className="min-w-0">
              <Link
                href={company.to}
                className="group flex h-full min-w-0 flex-col rounded-xl border border-black/10 bg-[#f4f4f3] p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta motion-safe:transition-[border-color,transform] motion-safe:duration-300 hover:border-magenta/50 motion-safe:hover:-translate-y-1 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded bg-magenta/10 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-magenta">
                    {company.code}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs tabular-nums text-black/40"
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                  {company.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/65">
                  {index === 0
                    ? "The environments organisations run on."
                    : "The capabilities organisations build."}
                </p>
                <span className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm font-semibold">
                  Explore company
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-magenta motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </Container>
    </section>
  );
}

function Together() {
  return (
    <section className="overflow-hidden bg-charcoal py-16 text-white sm:py-24 lg:py-28">
      <Container>
        <div
          data-subs-rule
          aria-hidden="true"
          className="mb-10 h-px bg-white/15 sm:mb-14"
        />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div data-subs-reveal className="min-w-0 lg:col-span-5">
            <Eyebrow light>The Group</Eyebrow>
            <H2 light className="mt-6">
              Stronger <M>together.</M>
            </H2>
          </div>
          <div
            data-subs-reveal
            className="min-w-0 lg:col-span-6 lg:col-start-7"
          >
            <Prose light>
              <p className="text-lg font-medium text-white sm:text-xl">
                The value of the group goes beyond the capabilities of either
                company individually.
              </p>
              <p>
                As enterprise environments become more interconnected, clients
                need technology partners that understand both the foundations
                they operate on and the digital capabilities they are building
                toward.
              </p>
              <p>
                Our companies remain specialised while contributing to a wider
                view of the client’s technology environment.
              </p>
            </Prose>
            <div className="mt-8">
              <Button to="/contact">Talk to Us</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SubsidiariesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSubsidiaryMotion(rootRef);

  return (
    <div ref={rootRef} className="min-w-0">
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
      <CompanySection company={COMPANIES.mcl} dark />
      <CompanySection company={COMPANIES.mes} flip />
      <Together />
    </div>
  );
}

/* The existing profile copy lives outside route files so it can be reused safely. */
type ProfileCopy = {
  c: CompanyItem;
  title: ReactNode;
  intro: string;
  whatTitle: ReactNode;
  what: string[];
  roleTitle: string;
  role: string[];
  focus?: { title: ReactNode; body: string[] };
  serves: { t: string; d: string }[];
  connectTitle: ReactNode;
  connect: string[];
  sibling: CompanyItem;
};

export function Profile(p: ProfileCopy) {
  const { c } = p;
  const profileRef = useRef<HTMLDivElement>(null);
  useSubsidiaryMotion(profileRef);

  return (
    <div ref={profileRef} className="min-w-0">
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
              className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-8"
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
          <div className="mt-12 sm:mt-16 grid border-t border-black md:grid-cols-2 lg:grid-cols-3">
            {c.caps.map(({ icon: Icon, t, d }, i) => (
              <div
                key={t}
                data-subs-reveal
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
                className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-8"
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
                  className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] sm:gap-8 items-baseline"
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
              className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-8"
            >
              <Prose light>
                {p.connect.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </Prose>
              <Link
                href={p.sibling.to}
                className="group mt-10 flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta border-y border-white/15 py-6 transition-colors hover:border-magenta"
              >
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.2em] text-magenta">
                    {p.sibling.code} · Sister company
                  </span>
                  <span className="mt-1 block text-lg sm:text-xl font-semibold">
                    {p.sibling.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-magenta motion-safe:transition-transform motion-safe:group-hover:translate-x-2 text-xl font-bold"
                >
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
              <Image
                src={c.image}
                width={150}
                height={150}
                alt="Manifold Computers logo"
              />
              <H2 className="mt-8">Learn more about {c.short}.</H2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-base sm:text-[17px] leading-relaxed text-black/65">
                Talk to our team about {c.short} and the capabilities that best
                support your organisation.
              </p>
              <div className="mt-8">
                <Button to="/contact">Talk to Us</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

const SERVES_COMMON = [
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
