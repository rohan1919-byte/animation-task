"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";
import Skyline from "./Skyline";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const STATS = [
  { n: 58, suffix: "%", label: "Faster than the average launch cycle" },
  { n: 27, suffix: "%", label: "Increase in returning customers" },
  { n: 3.4, suffix: "x", label: "More pages read per visit" },
  { n: 92, suffix: "%", label: "Of teams ship the same week" },
];

const Letters = ({ inner }) =>
  WORDS.map((w) => (
    <span key={w} className="inline-flex">
      {w.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span className={`${inner} inline-block`}>{c}</span>
        </span>
      ))}
    </span>
  ));

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tilt = gsap.quickTo(".car-in", "rotation", { duration: 0.5, ease: "power3" });
        const streak = gsap.quickTo(".streaks", "opacity", { duration: 0.3 });

        // 1. Intro: one orchestrated sequence
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".letter", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.05 })
          .from(".car-in", { xPercent: -40, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.7")
          .from(".stat", { y: 28, opacity: 0, duration: 0.9, stagger: 0.16 }, "-=0.6")
          .add(() => {
            root.current.querySelectorAll("[data-n]").forEach((el) => {
              const n = +el.dataset.n, d = n % 1 ? 1 : 0, o = { v: 0 };
              gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = o.v.toFixed(d) + el.dataset.s) });
            });
          }, "-=1.3")
          .add(() => gsap.to(".car-in", { y: -3, duration: 0.35, yoyo: true, repeat: -1, ease: "sine.inOut" }));

        // 2. Scroll: progress-driven, smoothed with scrub
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const vel = self.getVelocity();
                const v = Math.min(Math.abs(vel) / 2500, 1);
                streak(v);
                tilt(-v * 2.2 * Math.sign(vel || 1));
              },
            },
          })
          .to(".car", { x: () => window.innerWidth * 0.62, scale: 1.1, ease: "power1.inOut" }, 0)
          .to(".wheel", { rotation: 1200, transformOrigin: "50% 50%" }, 0)
          .to(".stripes", { x: -620 }, 0)
          .to(".city-far", { x: -160 }, 0)
          .to(".city-near", { x: -380 }, 0)
          .to(".fill", { clipPath: "inset(0 0% 0 0)" }, 0)
          .to(".bar", { scaleX: 1 }, 0)
          .to(".headline", { y: -40 }, 0)
          .to(".stat", { y: -20, stagger: 0.05 }, 0.2)
          .to(".sky-sun", { y: 70, scale: 0.85 }, 0);
      });

      // Reduced motion: static, fully visible layout
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".car", { x: window.innerWidth * 0.3 });
        gsap.set(".fill", { clipPath: "inset(0 0% 0 0)" });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-gradient-to-b from-haze to-mist">
      <div className="sky-sun will-move absolute right-[8%] top-[10%] aspect-square w-[clamp(110px,14vw,180px)] rounded-full bg-lane/70" />

      <Skyline className="city-far will-move absolute bottom-[26vh] left-0 z-[5] h-[26vh] w-[220vw] md:h-[34vh]" fill="#BCD3DC" seed={7} minH={40} maxH={110} />
      <Skyline className="city-near will-move absolute bottom-[26vh] left-0 z-[6] h-[26vh] w-[220vw] md:h-[34vh]" fill="#98B7C5" seed={21} minH={25} maxH={80} />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pt-[9vh]">
        <h1 className="headline will-move relative font-display font-extrabold text-harbor text-[clamp(1.6rem,6.2vw,6.5rem)] leading-none tracking-[0.3em] md:tracking-[0.4em]">
          <span className="sr-only">Welcome Itzfizz</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.7em]">
            <Letters inner="letter will-move" />
          </span>
          <span aria-hidden className="fill absolute left-0 top-0 flex flex-wrap gap-x-[0.7em] text-coral">
            <Letters inner="" />
          </span>
        </h1>

        <ul className="mb-[34vh] mt-auto grid grid-cols-2 gap-x-6 gap-y-5 md:mb-[36vh] md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <li key={s.label} className="stat will-move border-l-4 border-coral pl-4">
              <p data-n={s.n} data-s={s.suffix} className="font-display text-4xl font-bold md:text-6xl">
                {s.n}{s.suffix}
              </p>
              <p className="mt-1 max-w-[16rem] text-sm text-harbor/75 md:text-base">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Road */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[26vh] bg-asphalt">
        <div className="absolute inset-x-0 top-0 h-2 bg-mist/70" />
        <div className="stripes will-move absolute left-0 top-[58%] flex w-[300vw] gap-16">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className="h-1.5 w-20 shrink-0 rounded-full bg-lane" />
          ))}
        </div>
      </div>

      {/* Car: outer wrapper = scroll movement, inner = intro / bounce / tilt */}
      <div className="car will-move absolute bottom-[19vh] left-[-2vw] z-30 w-[48vw] min-w-[230px] max-w-[620px]">
        <div className="streaks pointer-events-none absolute right-[96%] top-[30%] h-1/2 w-3/5 opacity-0">
          <i /><i /><i />
        </div>
        <div className="car-in will-move">
          <Car />
        </div>
      </div>

      <div className="bar absolute bottom-0 left-0 z-40 h-[5px] w-full origin-left scale-x-0 bg-coral" />
      <p className="absolute bottom-[3vh] right-6 z-40 text-sm text-mist/80">Scroll to drive</p>
    </section>
  );
}
