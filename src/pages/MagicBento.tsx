import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextType from "@/components/ui/TypeText";
import ShinyText from "@/components/ui/ShinyText";


const MagicBento = () => {
  const certificationsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: certificationProgress } = useScroll({
  target: certificationsRef,
  offset: ["start start", "end end"],
});

const certificationX = useTransform(
  certificationProgress,
  [0, 1],
  ["0%", "-75%"]
);

const [textTypeKey, setTextTypeKey] = useState(0);

useEffect(() => {
  setTextTypeKey(Date.now());
}, []);
  return (
    <section className="w-full bg-black text-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
<div className="mb-24">
  <h2
  className="font-sans text-2xl md:text-3xl font-bold uppercase tracking-[0.2em]"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
>
  CERTIFICATIONS
</h2>
</div>

{/* Certifications */}
<div
  ref={certificationsRef}
  className="relative h-[400vh]"
>
  <div className="sticky top-0 h-screen overflow-hidden">
    <motion.div
      style={{ x: certificationX }}
      className="flex h-full w-[400vw]"
    >
      
      {/* 01 — Georgia Tech */}
<article className="h-full w-screen shrink-0 px-6 md:px-12 lg:px-20 flex flex-col justify-center translate-y-3 md:translate-y-0">
  
  <div className="w-full max-w-6xl">

    {/* Header */}
    <div className="flex items-end justify-between border-t border-white/20 pt-5">

      <span className="text-xs font-mono text-white">
        01
      </span>

      <span className="text-xs uppercase tracking-[0.2em] text-white">
        Course
      </span>

    </div>

    {/* Title */}
   
<h3 className="mt-0.5 text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.85] whitespace-nowrap">
  <ShinyText
    text="Georgia Tech"
    disabled={false}
    speed={1}
    className="font-black uppercase tracking-tight leading-[0.85] drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
  />
</h3>


    {/* Course + View Certificate */}
    <div className="mt-4 flex min-h-[56px] items-start gap-3">
     <p className="text-sm md:text-base text-white leading-5">
        Introduction to Electronics
      </p>

      <span className="opacity-30">
        |
      </span>

      
<a
  href="https://coursera.org/share/2479265baa8b2af32831b0a5bda75825"
  target="_blank"
  rel="noopener noreferrer"
  className="relative top-1 text-xs font-bold uppercase tracking-[0.15em] opacity-90 transition-opacity"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
>
  View Certificate ↗
</a>


    </div>

    {/* Main Content */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

      {/* Certificate */}
      <div className="w-full h-[220px] md:h-auto flex items-start">
        <img
          src="/georgia-tech.jpeg"
          alt="Georgia Tech — Introduction to Electronics certificate"
          className="block w-full h-full md:h-auto object-contain object-top"
        />
      </div>

      {/* Description */}
  <div className="flex items-start max-w-xl min-h-[220px] md:min-h-0">
  <p className="font-sans text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.025em] leading-[1.25]">
    A foundational electronics course covering essential concepts, components, circuits, and practical principles used in electronic systems.
  </p>
</div>
    </div>

  </div>
</article>

{/* 02 — Packt */}
<article className="relative w-screen h-screen shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-20">
  <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
  </div>

  <div className="relative z-10 w-full max-w-6xl">
    {/* Header */}
    <div className="flex items-end justify-between border-t border-white/20 pt-5">
      <span className="text-xs font-mono text-white">
        02
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-white">
        Course
      </span>
    </div>

    {/* Title */}
    <h3 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.85]">
  <ShinyText
    text="Packt"
    disabled={false}
    speed={1}
    className="font-black uppercase tracking-tight leading-[0.85] drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
  />
</h3>

    {/* Course + View Certificate */}
   <div className="mt-4 flex min-h-[56px] items-start gap-3">
     <p className="text-sm md:text-base text-white leading-5">
        Mastering Hardware Protocols with ESP32 and Arduinos
      </p>

      <span className="opacity-30">
        |
      </span>

     
<a
  href="https://coursera.org/share/5a12d5192e60e93772df3eddaffb532b"
  target="_blank"
  rel="noopener noreferrer"
  className="relative top-1 text-xs font-bold uppercase tracking-[0.15em] opacity-90 transition-opacity"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
>
  View Certificate ↗
</a>


    </div>

    {/* Main Content */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Certificate */}
      <div className="w-full h-[220px] md:h-auto flex items-start">
        <img
          src="/packt-esp32.jpeg"
          alt="Packt — Mastering Hardware Protocols with ESP32 and Arduinos certificate"
           className="block w-full h-full md:h-auto object-contain object-top"
        />
      </div>

      {/* Description */}
      
      <div className="flex items-start max-w-xl min-h-[220px] md:min-h-0">
  <p className="font-sans text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.025em] leading-[1.25]">
    A practical course focused on hardware communication protocols, ESP32, Arduino, and the fundamentals of connecting electronic components through different interfaces.
  </p>
</div>
    </div>
  </div>
</article>

{/* 03 — UIUC */}
<article className="relative w-screen h-screen shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-20">
  <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
  </div>

  <div className="relative z-10 w-full max-w-6xl">
    {/* Header */}
    <div className="flex items-end justify-between border-t border-white/20 pt-5">
      <span className="text-xs font-mono text-white">
        03
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-white">
        Specialization
      </span>
    </div>

    {/* Title */}
    <h3 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.85]">
  <ShinyText
    text="UIUC"
    disabled={false}
    speed={1}
    className="font-black uppercase tracking-tight leading-[0.85] drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
  />
</h3>

    {/* Course + View Certificate */}
    <div className="mt-4 flex min-h-[56px] items-start gap-3">
      <p className="text-sm md:text-base text-white leading-5">
        Hands-on Internet of Things Specialization
      </p>

      <span className="opacity-30">
        |
      </span>

      <a
        href="https://coursera.org/share/59e4037d93dc333aedb937cc3c423eac"
          target="_blank"
  rel="noopener noreferrer"
  className="relative top-1 text-xs font-bold uppercase tracking-[0.15em] opacity-90 transition-opacity"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
>
  View Certificate ↗
</a>
    </div>

    {/* Main Content */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Certificate */}
      <div className="w-full h-[220px] md:h-auto flex items-start">
        <img
          src="/uiuc-iot.jpeg"
          alt="UIUC — Hands-on Internet of Things Specialization certificate"
          className="block w-full h-full md:h-auto object-contain object-top"
        />
      </div>

      {/* Description */}
   <div className="flex items-start max-w-xl min-h-[220px] md:min-h-0">
  <p className="font-sans text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.025em] leading-[1.25]">
    A hands-on specialization focused on Internet of Things systems, connecting hardware, software, and network technologies to build practical connected solutions.
  </p>
</div>
    </div>
  </div>
</article>

{/* 04 — Meta */}
<article className="relative w-screen h-screen shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-20">
  <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
  </div>

  <div className="relative z-10 w-full max-w-6xl">
    {/* Header */}
    <div className="flex items-end justify-between border-t border-white/20 pt-5">
      <span className="text-xs font-mono text-white">
        04
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-white">
        Professional Certificate
      </span>
    </div>

    {/* Title */}
    <h3 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.85]">
  <ShinyText
    text="Meta"
    disabled={false}
    speed={1}
    className="font-black uppercase tracking-tight leading-[0.85] drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]"
  />
</h3>

    {/* Course + View Certificate */}
    <div className="mt-4 flex min-h-[56px] items-start gap-3">
      <p className="text-sm md:text-base text-white leading-5">
        Front-End Developer Professional Certificate
      </p>

      <span className="relative -left-7 md:left-0 opacity-30">
  |
</span>

<a
  href="https://coursera.org/share/e244b0edf280a9174e9cfb4289a485c9"
  target="_blank"
  rel="noopener noreferrer"
  className="relative top-1 -left-9 md:left-0 text-xs font-bold uppercase tracking-[0.15em] opacity-90 transition-opacity"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
>
  View Certificate ↗
</a>
    </div>

    {/* Main Content */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Certificate */}
      <div className="w-full h-[220px] md:h-auto flex items-start">
        <img
          src="/meta-front-end.jpeg"
          alt="Meta — Front-End Developer Professional Certificate"
           className="block w-full h-full md:h-auto object-contain object-top"
        />
      </div>

      {/* Description */}
      <div className="flex items-start max-w-xl min-h-[220px] md:min-h-0">
  <p className="font-sans text-lg md:text-2xl lg:text-3xl font-semibold tracking-[-0.025em] leading-[1.25]">
    A professional certificate focused on front-end development, covering modern web technologies, user interfaces, responsive design, and practical development workflows.
  </p>
</div>
    </div>
  </div>
</article>

    </motion.div>
  </div>
</div>
        
      </div>
    </section>
  );
};

const SwissItem = ({ value, suffix, label, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 } // Swiss: intentional visibility
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={ref} className="flex flex-col items-start">

      {/* Label */}
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">
        {label}
      </span>

      {/* Number */}
      <h3 className="mb-6 font-sans text-8xl md:text-9xl font-bold tracking-tight leading-none">
        {count.toLocaleString()}
        {suffix}
      </h3>

      {/* Description */}
      <p className="max-w-sm font-sans text-base leading-6 text-white/65">
        {description}
      </p>
    </div>
  );
};

export default MagicBento;
