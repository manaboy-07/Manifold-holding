"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./BrandPreloader.module.css";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "manifold-brand-intro-v2";
const MAX_DURATION_MS = 3200;

type Props = {
  dismissRef: RefObject<(() => void) | null>;
};

export default function BrandPreloader({ dismissRef }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const attemptedRef = useRef(false);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;

      let frame = 0;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let timeline: gsap.core.Timeline | undefined;
      let disposed = false;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const removeListeners = () => {
        window.removeEventListener("pointerdown", dismiss, true);
        window.removeEventListener("keydown", dismiss, true);
        window.removeEventListener("wheel", dismiss, true);
        window.removeEventListener("touchstart", dismiss, true);
        window.removeEventListener("scroll", dismiss);
        window.removeEventListener("pagehide", dismiss);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        reducedMotion.removeEventListener("change", onMotionChange);
      };

      function finish() {
        cancelAnimationFrame(frame);
        if (timer !== undefined) clearTimeout(timer);
        timeline?.kill();
        root!.style.display = "none";
        root!.style.visibility = "hidden";
        root!.style.opacity = "0";
        root!.removeAttribute("data-active");
        removeListeners();
      }

      function dismiss() {
        attemptedRef.current = true;
        finish();
      }
      function onVisibilityChange() {
        if (document.hidden) dismiss();
      }
      function onMotionChange(event: MediaQueryListEvent) {
        if (event.matches) dismiss();
      }

      dismissRef.current = dismiss;
      const seenBefore = () => {
        try {
          return sessionStorage.getItem(SESSION_KEY) === "1";
        } catch {
          return false;
        }
      };

      const start = contextSafe(() => {
        if (disposed || attemptedRef.current) {
          finish();
          return;
        }
        attemptedRef.current = true;
        if (
          seenBefore() ||
          reducedMotion.matches ||
          document.hidden ||
          window.location.hash ||
          window.scrollY > 24
        ) {
          finish();
          return;
        }

        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* The ref still prevents repeats while this layout is mounted. */
        }

        // Schedule the hard stop before making anything visible.
        timer = setTimeout(finish, MAX_DURATION_MS);
        root.dataset.active = "true";
        root.style.display = "block";
        root.style.visibility = "visible";
        root.style.opacity = "1";

        try {
          const q = gsap.utils.selector(root);
          timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: finish,
          });
          timeline
            .fromTo(
              q("[data-preloader-stage]"),
              { opacity: 0, scale: 0.97 },
              { opacity: 1, scale: 1, duration: 0.45 },
              0,
            )
            .fromTo(
              q("[data-preloader-block]"),
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.055 },
              0.08,
            )
            .fromTo(
              q("[data-preloader-route]"),
              { strokeDashoffset: 100 },
              {
                strokeDashoffset: 0,
                duration: 0.75,
                stagger: 0.065,
                ease: "power2.inOut",
              },
              0.2,
            )
            .fromTo(
              q("[data-preloader-core]"),
              { scale: 0.8, opacity: 0, transformOrigin: "50% 50%" },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" },
              0.5,
            )
            .fromTo(
              q("[data-preloader-mark]"),
              { strokeDashoffset: 100 },
              { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
              0.65,
            )
            .fromTo(
              q("[data-preloader-word]"),
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 0.65,
                stagger: 0.035,
                ease: "power4.out",
              },
              0.85,
            )
            .fromTo(
              q("[data-preloader-caption]"),
              { y: 8, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 },
              1.05,
            )
            .fromTo(
              q("[data-preloader-line]"),
              { scaleX: 0 },
              { scaleX: 1, duration: 1.7, ease: "power1.inOut" },
              0.1,
            )
            .to(
              q("[data-preloader-content]"),
              { y: -24, opacity: 0, duration: 0.35 },
              1.9,
            )
            .to(
              q("[data-preloader-curtain]"),
              { yPercent: -100, duration: 0.65, ease: "power4.inOut" },
              2.02,
            );
        } catch {
          // A cosmetic effect must never prevent access to the actual page.
          finish();
        }
      });

      window.addEventListener("pointerdown", dismiss, {
        capture: true,
        passive: true,
      });
      window.addEventListener("keydown", dismiss, true);
      window.addEventListener("wheel", dismiss, {
        capture: true,
        passive: true,
      });
      window.addEventListener("touchstart", dismiss, {
        capture: true,
        passive: true,
      });
      window.addEventListener("scroll", dismiss, { passive: true });
      window.addEventListener("pagehide", dismiss);
      document.addEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.addEventListener("change", onMotionChange);
      frame = requestAnimationFrame(start);

      return () => {
        disposed = true;
        finish();
        if (dismissRef.current === dismiss) dismissRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [dismissRef] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={styles.overlay}
      style={{
        display: "none",
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div data-preloader-curtain className={styles.curtain}>
        <div className={styles.grid} />
        <div className={styles.glow} />
        <div className={styles.topline}>
          <span>MANIFOLD HOLDINGS</span>
          <span>CONNECTED EXPERTISE</span>
        </div>

        <div data-preloader-content className={styles.content}>
          <div data-preloader-stage className={styles.stage}>
            <svg viewBox="0 0 640 260" fill="none" className={styles.network}>
              {/* Low-contrast rails are present before their magenta traces draw. */}
              <g stroke="white" strokeOpacity="0.12" strokeWidth="1">
                <path d="M104 100H205Q225 100 225 120V130H278" />
                <path d="M104 160H190Q210 160 210 140V130H278" />
                <path d="M536 84H448Q428 84 428 104V130H362" />
                <path d="M536 176H448Q428 176 428 156V130H362" />
              </g>
              <g stroke="#FD018B" strokeWidth="1.5" strokeLinecap="round">
                {[
                  "M104 100H205Q225 100 225 120V130H278",
                  "M104 160H190Q210 160 210 140V130H278",
                  "M536 84H448Q428 84 428 104V130H362",
                  "M536 176H448Q428 176 428 156V130H362",
                ].map((d) => (
                  <path
                    key={d}
                    data-preloader-route
                    d={d}
                    pathLength="100"
                    strokeDasharray="100"
                  />
                ))}
              </g>

              <g data-preloader-block>
                <rect
                  x="52"
                  y="74"
                  width="88"
                  height="36"
                  rx="5"
                  fill="black"
                  stroke="white"
                  strokeOpacity="0.35"
                />
                <path
                  d="M66 87H104M66 96H92"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <circle cx="126" cy="92" r="2.5" fill="#FD018B" />
              </g>
              <g data-preloader-block>
                <rect
                  x="52"
                  y="116"
                  width="88"
                  height="36"
                  rx="5"
                  fill="black"
                  stroke="white"
                  strokeOpacity="0.35"
                />
                <path
                  d="M66 129H104M66 138H92"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <circle cx="126" cy="134" r="2.5" fill="#FD018B" />
              </g>
              <g data-preloader-block>
                <rect
                  x="52"
                  y="158"
                  width="88"
                  height="36"
                  rx="5"
                  fill="black"
                  stroke="white"
                  strokeOpacity="0.35"
                />
                <path
                  d="M66 171H104M66 180H92"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <circle cx="126" cy="176" r="2.5" fill="#FD018B" />
              </g>

              <g data-preloader-block>
                <path
                  d="M499 84L536 62L573 84V128L536 150L499 128Z"
                  fill="black"
                  stroke="white"
                  strokeOpacity="0.4"
                />
                <path
                  d="M499 84L536 106L573 84M536 106V150"
                  stroke="white"
                  strokeOpacity="0.3"
                />
                <circle cx="536" cy="106" r="4" fill="#FD018B" />
              </g>
              <g data-preloader-block>
                <path d="M506 170H566" stroke="white" strokeOpacity="0.25" />
                {[506, 536, 566].map((x) => (
                  <rect
                    key={x}
                    x={x - 6}
                    y="164"
                    width="12"
                    height="12"
                    rx="3"
                    fill="black"
                    stroke={x === 536 ? "#FD018B" : "white"}
                    strokeOpacity="0.7"
                  />
                ))}
              </g>

              <g data-preloader-core>
                <rect
                  x="270"
                  y="80"
                  width="100"
                  height="100"
                  rx="24"
                  fill="#FD018B"
                  fillOpacity="0.08"
                  stroke="#FD018B"
                  strokeOpacity="0.3"
                />
                <rect
                  x="280"
                  y="90"
                  width="80"
                  height="80"
                  rx="18"
                  fill="#FD018B"
                />
              </g>
              <path
                data-preloader-mark
                d="M301 149V111L320 130L339 111V149"
                pathLength="100"
                strokeDasharray="100"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g
                fill="white"
                fontSize="11"
                fontWeight="600"
                letterSpacing="3"
                textAnchor="middle"
                opacity="0.5"
              >
                <text x="96" y="226">
                  MCL
                </text>
                <text x="536" y="226">
                  MES
                </text>
              </g>
            </svg>
          </div>

          <div className={styles.wordmark}>
            {"MANIFOLD".split("").map((letter, index) => (
              <span className={styles.letterMask} key={index}>
                <span data-preloader-word className={styles.letter}>
                  {letter}
                </span>
              </span>
            ))}
            <span className={styles.letterMask}>
              <span
                data-preloader-word
                className={`${styles.letter} ${styles.dot}`}
              >
                .
              </span>
            </span>
          </div>
          <div data-preloader-caption className={styles.caption}>
            <p className={styles.holdings}>HOLDINGS</p>
            <p className={styles.tagline}>
              Specialist businesses. Connected by one vision.
            </p>
          </div>
        </div>

        <div className={styles.bottomline}>
          <span>ENTERPRISE FOUNDATIONS</span>
          <span className={styles.divider} />
          <span>DIGITAL TRANSFORMATION</span>
        </div>
        <div className={styles.track}>
          <div data-preloader-line className={styles.line} />
        </div>
      </div>
    </div>
  );
}
