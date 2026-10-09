"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import {
  ClosingBand,
  Container,
  Eyebrow,
  H2,
  IMG,
  Img,
  M,
  OFFICES,
  PageHero,
  Prose,
  RegionMap,
  Reveal,
} from "../../components/site";

export default function Reach() {
  const [sel, setSel] = useState(0);
  const o = OFFICES[sel];
  return (
    <>
      <PageHero
        eyebrow="Our Reach"
        title={
          <>
            Present where our clients <M>need us.</M>
          </>
        }
        copy="With operations across Nigeria and Ghana, Manifold combines regional experience with local delivery and enterprise support."
        img={IMG.lagos}
      />

      <section className="bg-black py-24 text-white lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow light>Our offices</Eyebrow>
              <ul className="mt-8 border-t border-white/15">
                {OFFICES.map((of, i) => (
                  <li key={of.city}>
                    <button
                      onClick={() => setSel(i)}
                      aria-pressed={sel === i}
                      className="group flex w-full items-center justify-between border-b border-white/15 py-5 text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`size-2 rounded-full ${sel === i ? "bg-magenta" : "bg-white/25"}`}
                        />
                        <span
                          className={`text-xl font-semibold tracking-tight ${sel === i ? "text-white" : "text-white/50 group-hover:text-white"}`}
                        >
                          {of.city}
                        </span>
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/40">
                        {of.country}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative lg:col-span-8">
              <RegionMap sel={sel} onSelect={setSel} />
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 border-l-2 border-magenta bg-white/[0.06] p-6 backdrop-blur-xl sm:absolute sm:bottom-4 sm:left-4 sm:mt-0 sm:w-80"
              >
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-magenta">
                  <MapPin className="size-3.5" />
                  {o.role}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {o.city}, {o.country}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {o.d}
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Regional delivery</Eyebrow>
              <H2 className="mt-6">
                Local teams. Regional <M>perspective.</M>
              </H2>
            </Reveal>
            <Reveal
              delay={0.1}
              className="lg:col-span-6 lg:col-start-7 lg:pt-12"
            >
              <Prose>
                <p>
                  Enterprise technology is only as dependable as the support
                  behind it. Manifold’s offices place engineering, delivery and
                  service teams close to the organisations they support, across
                  the commercial, administrative and energy centres of Nigeria
                  and in Ghana.
                </p>
                <p>
                  This footprint allows the group to deliver programmes that
                  span multiple locations, respond quickly when on-site support
                  is required, and bring a consistent standard of service to
                  clients operating across the region.
                </p>
              </Prose>
            </Reveal>
          </div>
          <div className="mt-20 grid border-t border-black md:grid-cols-2">
            {OFFICES.map((of, i) => (
              <Reveal
                key={of.city}
                className={`border-b border-black/10 py-10 ${i % 2 === 1 ? "md:border-l md:pl-10" : "md:pr-10"}`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-bold tracking-[-0.02em]">
                    {of.city}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                    {of.country}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-magenta">
                  {of.role}
                </p>
                <p className="mt-4 max-w-md leading-[1.7] text-black/60">
                  {of.d}
                </p>
                <p className="mt-6 text-sm text-black/40">
                  Office address to be confirmed
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Img src={IMG.city} className="h-[50vh] min-h-[320px]" />

      <ClosingBand
        title={
          <>
            Speak to a team near <M>you.</M>
          </>
        }
        copy="Contact the group and we will connect you with the right company and office for your requirements."
      />
    </>
  );
}
