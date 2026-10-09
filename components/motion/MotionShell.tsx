"use client";

import { Suspense, useRef, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INTRO_KEY = "manifold-holdings-intro-v1";
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

type ControllerProps = {
  rootRef: RefObject<HTMLDivElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  introAttempted: { current: boolean };
};

function MotionController({
  rootRef,
  introRef,
  introAttempted,
}: ControllerProps) {
  // Only this component depends on pathname resolution.
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = rootRef.current;
      const intro = introRef.current;

      if (!root || pathname === null) return;

      const media = gsap.matchMedia();

      let disposed = false;
      let refreshFrame = 0;
      let introTimer: ReturnType<typeof setTimeout> | undefined;

      const counterText = new Map<HTMLElement, string>();

      const hideIntro = () => {
        if (!intro) return;

        // Explicitly hide the overlay.
        // No dependency on .brand-intro or data-active CSS.
        intro.style.display = "none";
        intro.style.visibility = "hidden";
        intro.style.opacity = "0";
      };

      // Clear any previous overlay before configuring this route.
      hideIntro();

      let seenIntro = false;

      try {
        seenIntro = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {
        // The ref still prevents repeat playback during navigation.
      }

      // Play only on an initial home-page visit.
      // Opening /about directly or navigating between pages skips it.
      let playIntro =
        !introAttempted.current &&
        !seenIntro &&
        pathname === "/" &&
        !window.location.hash &&
        window.scrollY < 30 &&
        window.matchMedia(MOTION_QUERY).matches;

      introAttempted.current = true;

      const select = (selector: string) =>
        Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
          (element) => element.getClientRects().length > 0,
        );

      const refresh = () => {
        if (disposed || refreshFrame) return;

        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = 0;

          if (!disposed) {
            ScrollTrigger.refresh();
          }
        });
      };

      media.add(
        MOTION_QUERY,
        () => {
          const introThisRun = Boolean(playIntro && intro);

          // Changing motion preferences must not replay the intro.
          playIntro = false;

          if (introThisRun && intro) {
            // Mark it seen before playback so interrupted navigation
            // cannot restart it.
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {
              // Storage is optional.
            }

            // Independent hard stop.
            introTimer = setTimeout(hideIntro, 2000);

            gsap.set(intro, {
              display: "grid",
              autoAlpha: 1,
              clipPath: "inset(0 0 0 0)",
            });

            gsap
              .timeline({
                onComplete: hideIntro,
              })
              .fromTo(
                intro.querySelectorAll("[data-intro-bar]"),
                {
                  scaleY: 0,
                },
                {
                  scaleY: 1,
                  transformOrigin: "bottom",
                  stagger: 0.09,
                  duration: 0.5,
                  ease: "power3.out",
                },
              )
              .from(
                intro.querySelector("[data-intro-word]"),
                {
                  y: 15,
                  opacity: 0,
                  duration: 0.4,
                  ease: "power2.out",
                },
                0.15,
              )
              .to(
                intro,
                {
                  clipPath: "inset(0 0 100% 0)",
                  duration: 0.65,
                  ease: "power3.inOut",
                },
                0.65,
              );
          }

          // Initial viewport entrance.
          const entering = select("[data-enter]").filter((element) => {
            const bounds = element.getBoundingClientRect();

            return bounds.bottom > 0 && bounds.top < window.innerHeight;
          });

          if (entering.length) {
            gsap.from(entering, {
              y: 28,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
              delay: introThisRun ? 0.85 : 0,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
          }

          // Scroll reveals.
          select("[data-reveal]").forEach((element) => {
            // Avoid two animations controlling the same element.
            if (element.hasAttribute("data-enter")) return;

            // Leave already-visible/restored content alone.
            if (
              element.getBoundingClientRect().top <
              window.innerHeight * 0.92
            ) {
              return;
            }

            const delay = Number(element.dataset.revealDelay) || 0;

            gsap.from(element, {
              y: 28,
              opacity: 0,
              duration: 0.8,
              delay: Math.max(0, Math.min(delay, 0.24)),
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: element,
                start: "top 94%",
                once: true,
              },
            });
          });

          // Animated dividers.
          select("[data-draw-line]").forEach((element) => {
            gsap.from(element, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: element,
                start: "top 94%",
                once: true,
              },
            });
          });

          // Counters.
          select("[data-count-to]").forEach((element) => {
            const target = Number(element.dataset.countTo);

            if (!Number.isFinite(target)) return;

            const finalText = target.toLocaleString("en-GB");
            const value = { current: 0 };

            counterText.set(element, finalText);

            gsap.to(value, {
              current: target,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
              onStart: () => {
                element.textContent = "0";
              },
              onUpdate: () => {
                element.textContent = Math.round(value.current).toLocaleString(
                  "en-GB",
                );
              },
              onComplete: () => {
                element.textContent = finalText;
              },
            });
          });

          // Page progress.
          gsap.fromTo(
            root.querySelector("[data-scroll-progress]"),
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.15,
              },
            },
          );

          return () => {
            if (introTimer) {
              clearTimeout(introTimer);
            }

            hideIntro();

            counterText.forEach((text, element) => {
              element.textContent = text;
            });
          };
        },
        root,
      );

      // Desktop image parallax.
      media.add(
        `(min-width: 1024px) and (hover: hover) and (pointer: fine) and ${MOTION_QUERY}`,
        () => {
          select("[data-parallax]").forEach((frame) => {
            const image = frame.querySelector("[data-parallax-image]");

            if (!image) return;

            gsap.fromTo(
              image,
              {
                yPercent: -6,
                scale: 1.16,
              },
              {
                yPercent: 6,
                scale: 1.16,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        },
        root,
      );

      // Capture image events, including images added by streaming.
      root.addEventListener("load", refresh, true);
      root.addEventListener("error", refresh, true);

      window.addEventListener("load", refresh, {
        once: true,
      });

      void document.fonts.ready.then(() => {
        if (!disposed) {
          refresh();
        }
      });

      refresh();

      // ScrollTrigger handles window resizing itself.
      // No root ResizeObserver -> refresh feedback loop.
      return () => {
        disposed = true;

        cancelAnimationFrame(refreshFrame);

        if (introTimer) {
          clearTimeout(introTimer);
        }

        root.removeEventListener("load", refresh, true);
        root.removeEventListener("error", refresh, true);
        window.removeEventListener("load", refresh);

        // Revert only animations owned by this controller.
        media.revert();

        counterText.forEach((text, element) => {
          element.textContent = text;
        });

        hideIntro();
      };
    },
    {
      scope: rootRef,
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  );

  return null;
}

export default function MotionShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introAttempted = useRef(false);

  return (
    <div ref={rootRef} className="min-w-0">
      {/* Page content is outside the animation Suspense boundary. */}
      {children}

      {/* Hidden in server HTML and before JavaScript runs. */}
      <div
        ref={introRef}
        aria-hidden="true"
        className="fixed inset-0 z-[100] place-items-center bg-black text-white"
        style={{
          display: "none",
          visibility: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div className="flex flex-col items-center gap-7">
          <div className="flex h-14 items-end gap-2">
            <span data-intro-bar className="block h-10 w-3 bg-magenta" />
            <span data-intro-bar className="block h-14 w-3 bg-white" />
            <span data-intro-bar className="block h-10 w-3 bg-magenta" />
          </div>

          <div data-intro-word className="text-center">
            <p className="text-2xl font-extrabold tracking-tight">MANIFOLD.</p>
            <p className="mt-2 text-[9px] tracking-[0.45em] text-white/60">
              HOLDINGS
            </p>
          </div>
        </div>
      </div>

      <div
        data-scroll-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-magenta"
      />

      <Suspense fallback={null}>
        <MotionController
          rootRef={rootRef}
          introRef={introRef}
          introAttempted={introAttempted}
        />
      </Suspense>
    </div>
  );
}
