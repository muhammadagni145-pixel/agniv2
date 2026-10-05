import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
import MusicButton from "@/components/MusicButton";


// Components
import About from "./About";
import LightRays from "../components/ui/LightRays";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Navigation from "@/components/Navigation";
import WarpText from "@/components/ui/WarpText";

// --- Cursor Follower ---
const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
     className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
      style={{ x, y }}
    />
  );
};

const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
    <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start">
      AGNI
      <span className="text-xs md:text-lg font-medium ml-1 -mt-1 md:-mt-2">✦</span>
    </h1>
  </div>
);

const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
   className="absolute z-10 hidden md:flex items-center gap-2 pointer-events-none"
style={{
  bottom: "3.7rem",
  left: "4.5rem",
}}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
    </span>
    <span className="font-sans font-black text-[12px] tracking-[0.25em] uppercase text-white">
      OPEN TO WORK
    </span>
  </motion.div>
);

const SocialStrip = ({ onMenuClick }: { onMenuClick: () => void }) => {
const socials = [
  { label: "TikTok", href: "https://www.tiktok.com/@missthemoon" },
  { label: "WhatsApp", href: "https://wa.me/6281368058832" },
  { label: "Instagram", href: "https://www.instagram.com/4gniiiiiiii/" },
  { label: "Email", href: "mailto:muhammadagniii11@gmail.com" },
];
 return (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="absolute z-20 hidden md:flex"
style={{
  left: "calc(40% - 160px)",
  top: "28px",
  transform: "translateX(-50%)",
}}
  >
    
  </motion.div>
);
};


const MobileSocialStrip = () => {
  const socials = [
    {
      label: "TikTok",
      icon: FaTiktok,
      href: "https://www.tiktok.com/@missthemoon",
    },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/6281368058832",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/4gniiiiiiii/",
    },
    {
      label: "Email",
      icon: Mail,
      href: "mailto:muhammadagniii@gmail.com",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.6,
        ease: "easeOut",
      }}
      className="
        relative
        z-[50]
        flex
        flex-col
        items-center
        gap-8
        pointer-events-auto
      "
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="
            relative
            z-[51]
            block
            cursor-pointer
            pointer-events-auto
            text-white
            hover:opacity-75
            transition-opacity
            duration-300
          "
        >
          <Icon size={19} strokeWidth={2} />
        </a>
      ))}
    </motion.div>
  );
};
const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"]
  });

  // Create parallax effect: Footer starts higher up and moves to normal position as we scroll into it
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      <CursorFollower />
      <Navigation open={menuOpen} setOpen={setMenuOpen} />

      {/* Fixed background About section */}
      <div className="fixed inset-0 z-0 bg-white text-black">
  <About />
</div>

      {/* Hero */}
      <section 
      className="relative h-screen bg-black flex flex-col px-6 py-12 md:px-16 md:py-16 z-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
  <LightRays />
</div>
        <AvailabilityBadge />
        
        <SocialStrip onMenuClick={() => setMenuOpen(true)} />
        

        {/* Mobile Midpoint Buffer: 80px total height from top to clear hamburger (Hamburger at 24px + 56px height) */}
        <div className="h-[32px] w-full md:hidden" /> {/* py-12 (48px) + 32px = 80px */}

        {/* Dynamic Centering Container for Mobile Socials */}
       <div className="flex-1 flex flex-col items-end justify-center md:hidden pr-0 relative z-30 pointer-events-none">
 <div className="pointer-events-auto translate-x-[8px] -translate-y-[170px]">
  <MobileSocialStrip />
</div>
</div>

        <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="w-full flex flex-col items-center"
>

  {/* NAMA */}

<div
  className="
    absolute
    left-[5%]
    top-[22%]
    md:left-[8.5%]
    md:top-[54.5%]
    -translate-y-1/2
    z-10
    text-left
  "
>
  <p
  className="
    relative
    left-[-0.3%]
    md:left-0
    font-sans
    text-[17px]
    md:text-[25px]
    leading-none
    font-light
    tracking-[2px]
    text-cyan-300
  "
>
  Hello! I'm
</p>

 <div className="relative w-max translate-y-[1px]">
<div className="relative w-max translate-y-[1px]">

  {/* MOBILE NAME */}
  <h1
    className="
      mt-2
      font-sans
      text-[65px]
      leading-[70px]
      font-semibold
      tracking-[-0.025em]
      text-transparent
      uppercase
      w-max
      md:hidden
    "
  >
    MUHAMMAD AGNI
  </h1>

  {/* DESKTOP NAME */}
  <h1
    className="
      mt-2
      hidden
      md:block
      font-sans
      text-[60px]
      leading-[60px]
      font-semibold
      tracking-[-0.025em]
      text-transparent
      uppercase
      w-max
    "
  >
    MUHAMMAD
    <br />
    AGNI
  </h1>



</div>

  <div className="absolute left-0 top-0 w-full h-full pointer-events-auto">
    <WarpText
      text={"MUHAMMAD\nAGNI"}
      color="#ffffff"
      fontSize={60}
      fontWeight={600}
      letterSpacing="-0.025em"
      lineHeight={1}
      warpStrength={0}
      warpScale={1.7}
      pointerInfluence={0.9}
      pointerStrength={0.38}
      refraction={0.03}
      ripple={true}
      className="w-full h-full min-h-0"
    />
  </div>
</div>
</div>

  {/* FOTO LO — TETAP DI TENGAH */}

<div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 pointer-events-none">
  <img
    src="/agni-profile.png"
    alt="Muhammad Agni"
    className="
      h-[155vh]
      w-auto
      object-contain
      object-bottom
      origin-bottom
      scale-[3.5]
      md:scale-[1.25]
      pointer-events-none
    "
  />
</div>

{/* ICE BLUE GLOW — BODY OUTLINE */}

<div
  className="
    absolute
    left-1/2
    bottom-[-260px]
    -translate-x-1/2
    w-[500px]
    h-[850px]
    md:w-[700px]
    md:h-[900px]
    blur-[75px]
    opacity-90
    z-[1]
    pointer-events-none
  "
  style={{
    background:
      "radial-gradient(ellipse 55% 55% at 50% 76%, rgba(96,165,250,0.95) 0%, rgba(59,130,246,0.82) 38%, rgba(34,211,238,0.65) 58%, rgba(30,64,175,0.28) 72%, transparent 82%)",
  }}
/>

{/* AMBIENT GLOW — RIGHT CENTER */}

<div
  className="
    absolute
    right-[-160px]
    top-1/2
    -translate-y-1/2
    w-[280px]
    h-[360px]
    rounded-full
    blur-[85px]
    opacity-100
    z-[0]
    pointer-events-none
  "
  style={{
    background:
      "radial-gradient(ellipse 55% 55% at 85% 50%, rgba(96,165,250,1) 0%, rgba(59,130,246,1) 45%, rgba(34,211,238,1) 65%, rgba(30,64,175,0.7) 78%, transparent 82%)",
  }}
/>

<div
  className="
    absolute
    right-[-160px]
    top-1/2
    -translate-y-1/2
    w-[220px]
    h-[300px]
    rounded-full
    blur-[55px]
    opacity-100
    z-[0]
    pointer-events-none
  "
  style={{
    background:
      "radial-gradient(ellipse 55% 55% at 85% 50%, rgba(96,165,250,1) 0%, rgba(59,130,246,1) 50%, rgba(34,211,238,1) 72%, transparent 88%)",
  }}
/>

<div
  className="
    absolute
    right-[-160px]
    top-1/2
    -translate-y-1/2
    w-[150px]
    h-[220px]
    rounded-full
    blur-[30px]
    opacity-100
    z-[0]
    pointer-events-none
  "
  style={{
    background:
      "radial-gradient(ellipse 55% 55% at 85% 50%, rgba(147,197,253,1) 0%, rgba(96,165,250,1) 50%, rgba(34,211,238,0.95) 75%, transparent 90%)",
  }}
/>

{/* AMBIENT GLOW — TOP LEFT */}

<div
  className="
    absolute
    left-[-160px]
    top-[-160px]
    w-[460px]
    h-[350px]
    blur-[85px]
    opacity-100
    z-[0]
    pointer-events-none
  "
  style={{
    background:
      "radial-gradient(ellipse 55% 55% at 15% 15%, rgba(147,197,253,1) 0%, rgba(96,165,250,1) 35%, rgba(59,130,246,1) 55%, rgba(34,211,238,1) 72%, rgba(30,64,175,0.85) 82%, transparent 90%)",
  }}
/>


  {/* ROLE */}

<div
  className="
    absolute
    left-[5%]
    top-[32%]
    z-10
    text-left
    text-white

    md:left-auto
    md:right-[7%]
    md:top-1/2
    md:-translate-y-1/2
  "
>

  <p
  className="
    relative
    text-[17px]
    md:text-[25px]
    leading-none
    font-light
    tracking-[2px]
    text-cyan-300
    md:left-[50px]
  "
>
  IoT & Web
</p>

  {/* ENGINEER ↔ DEVELOPER */}

  <div className="relative mt-2 grid overflow-hidden">

    {/* ENGINEER */}

    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: [0, 0, 0, -65, -65, 0],
        opacity: [1, 1, 0.35, 0, 0, 1],
      }}
      transition={{
        duration: 6,
        times: [
          0,
          0.40,
          0.46,
          0.58,
          0.85,
          1,
        ],
        repeat: Infinity,
        ease: "easeInOut",
      }}
     className="
  col-start-1
  row-start-1
  relative
  left-0
  md:left-12
  top-[-10px]
  md:top-0
  w-[270px]
  h-[60px]
  md:w-[350px]
  md:h-[60px]
  lg:w-[430px]
  lg:h-[60px]
"
    >
      {/* MOBILE */}
<div className="md:hidden absolute inset-0">
  <WarpText
    text="ENGINEER"
    color="#f0edf2"
    fontSize={40}
    fontWeight={600}
    letterSpacing="-0.025em"
    lineHeight={1}
    warpStrength={0}
    warpScale={1}
    pointerInfluence={0}
    pointerStrength={0}
    refraction={0.06}
    ripple={false}
    className="absolute inset-0 w-full h-full min-h-0"
  />
</div>

{/* DESKTOP */}
<div className="hidden md:block absolute inset-0">
  <WarpText
    text="ENGINEER"
    color="#f0edf2"
    fontSize={60}
    fontWeight={600}
    letterSpacing="-0.025em"
    lineHeight={1}
    warpStrength={0}
    warpScale={1}
    pointerInfluence={0}
    pointerStrength={0}
    refraction={0.04}
    ripple={false}
    className="absolute inset-0 w-full h-full min-h-0"
  />
</div>
    </motion.div>

    {/* DEVELOPER */}

    <motion.div
      initial={{ y: 65, opacity: 0 }}
      animate={{
        y: [65, 65, 0, 0, 0, 65],
        opacity: [0, 0, 1, 1, 0.35, 0],
      }}
      transition={{
        duration: 6,
        times: [
          0,
          0.42,
          0.58,
          0.85,
          0.90,
          1,
        ],
        repeat: Infinity,
        ease: "easeInOut",
      }}
        className="
  col-start-1
  row-start-1
  relative
  left-0
  md:left-12
  top-[-10px]
  md:top-0
        
        w-[270px]
        h-[60px]
        md:w-[350px]
        md:h-[60px]
        lg:w-[430px]
        lg:h-[60px]
      "
    >
      {/* MOBILE */}
<div className="md:hidden absolute inset-0">
  <WarpText
    text="DEVELOPER"
    color="#f0edf2"
    fontSize={40}
    fontWeight={600}
    letterSpacing="-0.025em"
    lineHeight={1}
    warpStrength={0}
    warpScale={1}
    pointerInfluence={0}
    pointerStrength={0}
    refraction={0.06}
    ripple={false}
    className="absolute inset-0 w-full h-full min-h-0"
  />
</div>

{/* DESKTOP */}
<div className="hidden md:block absolute inset-0">
  <WarpText
    text="DEVELOPER"
    color="#f0edf2"
    fontSize={60}
    fontWeight={600}
    letterSpacing="-0.025em"
    lineHeight={1}
    warpStrength={0}
    warpScale={1}
    pointerInfluence={0}
    pointerStrength={0}
    refraction={0.04}
    ripple={false}
    className="absolute inset-0 w-full h-full min-h-0"
  />
</div>
    </motion.div>

  </div>

</div>

</motion.div>
      </section>

      <MusicButton />

      {/* Content stack */}
      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="work" className="bg-black text-white relative z-20">
          <SelectedWorks />
        </div>

        <div className="bg-white text-black relative z-20">
          <VectorBridge />
        </div>

        <div className="bg-black text-white relative z-20">
          <Testimonial />
        </div>

        {/* Change contact layer to z-20 and relative so it scrolls normally OVER the footer */}
        <div id="contact" className="relative z-20 bg-white text-black">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;