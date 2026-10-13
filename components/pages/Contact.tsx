"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import {
  Container,
  EMAIL,
  Eyebrow,
  H2,
  M,
  OFFICES,
  PHONE,
  PHONE_HREF,
  Reveal,
} from "../../components/site";

const ROUTES = [
  {
    v: "mcl",
    t: "Infrastructure, networks, datacentres or end-user computing",
    to: "Manifold Computers Limited",
  },
  {
    v: "mes",
    t: "Cloud, Data & AI, cybersecurity, software or automation",
    to: "Manifold Enterprise Solutions",
  },
  {
    v: "group",
    t: "Partnerships, media or group-level matters",
    to: "Manifold Holdings",
  },
  {
    v: "unsure",
    t: "Not sure — please route my enquiry",
    to: "The group enquiries team",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [route, setRoute] = useState("unsure");
  const field =
    "w-full border-0 border-b border-black/20 bg-transparent px-0 py-3.5 text-[16px] outline-none transition-colors placeholder:text-black/35 focus:border-magenta";
  const label =
    "text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45";
  return (
    <>
      <section className="bg-black pb-20 pt-44 text-white lg:pb-24 lg:pt-52">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow light>Contact</Eyebrow>
              <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] md:text-[3.6rem]">
                Talk to <M>Manifold.</M>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                Tell us about your organisation and what you are working
                towards. We will route your enquiry to the right company and
                team.
              </p>
            </div>
            <div className="space-y-3 lg:col-span-4 lg:col-start-9">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-[15px] hover:text-magenta"
              >
                <Mail className="size-4 text-magenta" strokeWidth={1.5} />
                {EMAIL}
              </a>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-[15px] hover:text-magenta"
              >
                <Phone className="size-4 text-magenta" strokeWidth={1.5} />
                {PHONE}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              {sent ? (
                <div className="border-t border-black pt-10">
                  <H2>Thank you.</H2>
                  <p className="mt-4 max-w-md text-[17px] leading-relaxed text-black/60">
                    Your enquiry has been received and will be passed to{" "}
                    {ROUTES.find((r) => r.v === route)?.to}. A member of the
                    team will be in touch.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <fieldset>
                    <legend className={label}>
                      1 · What is your enquiry about?
                    </legend>
                    <div className="mt-5 border-t border-black">
                      {ROUTES.map((r) => (
                        <label
                          key={r.v}
                          className={`flex cursor-pointer items-start gap-4 border-b border-black/10 py-4 transition-colors ${route === r.v ? "bg-[#f4f4f3]" : "hover:bg-[#fafaf9]"} px-3`}
                        >
                          <input
                            type="radio"
                            name="route"
                            value={r.v}
                            checked={route === r.v}
                            onChange={() => setRoute(r.v)}
                            className="mt-1 accent-[#FD018B]"
                          />
                          <span>
                            <span className="block text-[15px] font-medium">
                              {r.t}
                            </span>
                            <span className="mt-0.5 block text-sm text-black/45">
                              Routed to {r.to}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <p className={`${label} mt-14`}>2 · Your details</p>
                  <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
                    <input
                      required
                      className={field}
                      placeholder="Full name"
                      aria-label="Full name"
                    />
                    <input
                      required
                      className={field}
                      placeholder="Job title"
                      aria-label="Job title"
                    />
                    <input
                      required
                      className={field}
                      placeholder="Organisation"
                      aria-label="Organisation"
                    />
                    <input
                      required
                      type="email"
                      className={field}
                      placeholder="Work email"
                      aria-label="Work email"
                    />
                    <input
                      className={field}
                      placeholder="Phone"
                      aria-label="Phone"
                    />
                    <select
                      className={field}
                      aria-label="Country"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Country
                      </option>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Other</option>
                    </select>
                    <textarea
                      rows={4}
                      className={`${field} resize-none sm:col-span-2`}
                      placeholder="How can we help?"
                      aria-label="Message"
                    />
                  </div>
                  <button className="mt-10 rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0007a]">
                    Send enquiry
                  </button>
                </form>
              )}
            </Reveal>

            <aside className="lg:col-span-4 lg:col-start-9">
              <p className={label}>Offices</p>
              <ul className="mt-5 border-t border-black">
                {OFFICES.map((o) => (
                  <li key={o.city} className="border-b border-black/10 py-5">
                    <p className="text-lg font-semibold tracking-tight">
                      {o.city}, {o.country}
                    </p>
                    <p className="mt-1 text-sm text-magenta">{o.role}</p>
                    <p className="mt-2 text-sm text-black/45">{o.address}</p>
                  </li>
                ))}
              </ul>
              <p className={`${label} mt-12`}>Corporate contact</p>
              <div className="mt-5 space-y-2 text-[15px]">
                <a
                  href={`mailto:${EMAIL}`}
                  className="block break-all hover:text-magenta"
                >
                  {EMAIL}
                </a>
                <a href={PHONE_HREF} className="block hover:text-magenta">
                  {PHONE}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
