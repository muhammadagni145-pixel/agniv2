import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SideRays from "@/components/ui/SideRays";


interface NavItem {
  label: string;
  href: string;
  number: string;
}

interface SocialItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about", number: "01" },
  { label: "Work", href: "#work", number: "02" },
  { label: "Philosophy", href: "#philosophy", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
];

const socialItems: SocialItem[] = [
  { label: "TikTok", href: "https://www.tiktok.com/@missthemoon" },
  { label: "WhatsApp", href: "https://wa.me/6281368058832" },
  { label: "Instagram", href: "https://www.instagram.com/4gniiiiiiii/" },
  { label: "Email", href: "mailto:muhammadagniii11@gmail.com" },
];

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariants: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 1.0, ease },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.0, ease },
  },
};

const itemVariants: Variants = {
  closed: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.8, ease },
  },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.0,
      delay: 0.4 + i * 0.1,
      ease: easeOut,
    },
  }),
};

const socialVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.6, ease },
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6 + i * 0.08,
      ease: "easeOut",
    },
  }),
};

interface NavigationProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation = ({ open, setOpen }: NavigationProps) => {
  const lenis = useLenis();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const whooshAudioRef = useRef<HTMLAudioElement | null>(null);

const playWhoosh = () => {
  if (!whooshAudioRef.current) {
    whooshAudioRef.current = new Audio("http://localhost:8080/audio/whoosh.mp3")
    whooshAudioRef.current.volume = 0.35;
  }

  whooshAudioRef.current.currentTime = 0;

  whooshAudioRef.current.play().catch((error) => {
    console.error("WHOOSH ERROR:", error);
  });
};

const playClick = () => {
  const audio = new Audio("http://localhost:8080/audio/click.mp3");
  audio.volume = 0.35;
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.error("CLICK ERROR:", error);
  });
};

useEffect(() => {
  const unlockAudio = () => {
    const audio = new Audio("/whoosh.mp3");
    audio.volume = 0;
    audio.play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  };

  window.addEventListener("click", unlockAudio, { once: true });

  return () => {
    window.removeEventListener("click", unlockAudio);
  };
}, []);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompactNav, setIsCompactNav] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [showGlassNav, setShowGlassNav] = useState(true);

  useEffect(() => {
   const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (hideTimerRef.current) {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  }

 const elements = document.elementsFromPoint(
  window.innerWidth / 2,
  100
);

const backgroundElement = elements.find((el) => {
  const tag = el.tagName.toLowerCase();
  return tag === "section" || tag === "footer";
});

if (backgroundElement) {
  const tag = backgroundElement.tagName.toLowerCase();

  // Footer selalu dianggap dark
  if (tag === "footer") {
    setIsLightSection(false);
  } else {
    const backgroundColor =
      window.getComputedStyle(backgroundElement).backgroundColor;

    const isWhite =
      backgroundColor === "rgb(255, 255, 255)" ||
      backgroundColor === "rgba(255, 255, 255, 1)" ||
      backgroundColor === "rgb(250, 250, 250)" ||
      backgroundColor === "rgb(248, 248, 248)";

    setIsLightSection(isWhite);
  }
} else {
  setIsLightSection(false);
}

  if (currentScrollY > 20 && !open) {
    setHideOnScroll(false);

    hideTimerRef.current = setTimeout(() => {
      setHideOnScroll(true);
    }, 2000);
  } else {
    setHideOnScroll(false);
  }

  setIsCompactNav(currentScrollY > 20);

  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    maxScroll > 0
      ? currentScrollY / maxScroll
      : 0;

  setScrollProgress(progress);
};

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
  if (hideTimerRef.current) {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  }

  setHideOnScroll(false);
  setShowGlassNav(false);

  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
} else {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";

  const timer = setTimeout(() => {
    setShowGlassNav(true);
  }, 600);

  return () => clearTimeout(timer);
}

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  playClick();
  setOpen(false);

  if (href === "#about") {
    e.preventDefault();

    const aboutSection = document.getElementById("about");

    if (!aboutSection) {
      console.error('ABOUT ERROR: Element with id="about" not found.');
      return;
    }

    console.log("ABOUT TARGET FOUND:", aboutSection);
    console.log("LENIS INSTANCE:", lenis);

    if (lenis) {
      lenis.scrollTo(aboutSection, {
        offset: 0,
        duration: 1.2,
      });
    } else {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    return;
  }

  const target = document.querySelector<HTMLElement>(href);

  if (target) {
    e.preventDefault();

    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
};

const compact = isCompactNav;

return (
  <>

{/* Mobile Navbar */}
<div
  className={`fixed top-4 left-4 right-4 z-[300] md:hidden ${
    hideOnScroll && !open
      ? "-translate-y-[calc(100%+1rem)] pointer-events-none"
      : "translate-y-0"
  }`}
  style={{
    transition:
      "transform 500ms cubic-bezier(0.76, 0, 0.24, 1)",
  }}
>
  <div
    className={`relative flex items-center justify-between rounded-full border backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-500 ${
      isLightSection
        ? "border-black/10 bg-black/[0.06]"
        : "border-white/10 bg-white/[0.06]"
    } ${
      showGlassNav && !open
        ? "opacity-100"
        : "opacity-0 pointer-events-none"
    } h-[52px] px-4`}
  >
    {/* Mobile MA Logo */}
    <a
      href="#about"
      className="flex items-center shrink-0"
      aria-label="AGNI"
    >
      <img
        src={
          isLightSection
            ? "/AGNI-MA-logo-black.png"
            : "/AGNI-MA-logo.png"
        }
        alt="MA"
        className={`w-8 h-8 object-contain transition-all duration-500 ${
          !isLightSection ? "mix-blend-screen" : ""
        }`}
      />
    </a>

    
  </div>

{/* Mobile Hamburger */}
    <button
      onClick={() => {
        playClick();
        setOpen((v) => !v);
      }}
      className="absolute right-7 top-1/2 -translate-y-1/2 flex w-10 h-10 items-center justify-center bg-transparent"
      style={{ WebkitFontSmoothing: "antialiased" }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <motion.span
  animate={
    open
      ? { rotate: 45, y: 6.5, scaleX: 0.8 }
      : { rotate: 0, y: 0, scaleX: 1 }
  }
  transition={{ duration: 0.6, ease }}
  className={`absolute left-1/2 -translate-x-[calc(50%+2px)] block w-[26px] transition-colors duration-300 ${
    isLightSection ? "bg-black" : "bg-white"
  }`}
  style={{
    top: "16.5%",
    height: "3.5px",
  }}
/>

<motion.span
  animate={
    open
      ? { opacity: 0, scaleX: 0 }
      : { opacity: 1, scaleX: 1 }
  }
  transition={{ duration: 0.4, ease }}
  className={`absolute left-1/2 -translate-x-[calc(50%+2px)] block w-[26px] transition-colors duration-300 ${
    isLightSection ? "bg-black" : "bg-white"
  }`}
  style={{
    top: "37.5%",
    height: "3.8px",
  }}
/>

<motion.span
  animate={
    open
      ? { rotate: -45, y: -6.5, scaleX: 0.8 }
      : { rotate: 0, y: 0, scaleX: 1 }
  }
  transition={{ duration: 0.6, ease }}
  className={`absolute left-1/2 -translate-x-[calc(50%+2px)] block w-[26px] transition-colors duration-300 ${
    isLightSection ? "bg-black" : "bg-white"
  }`}
  style={{
    bottom: "33.5%",
    height: "3.5px",
  }}
/>
    </button>

</div>



      {/* Desktop Navbar */}
 <div
  className={`fixed left-1/2 -translate-x-1/2 z-[200] hidden md:block ${
    compact ? "top-2" : "top-4"
  } ${
    hideOnScroll && !open
      ? "-translate-y-[calc(100%+1rem)] pointer-events-none"
      : "translate-y-0"
  }`}
  style={{
    width: compact
      ? "min(800px, calc(100% - 3rem))"
      : "calc(100% - 5rem)",
    transition:
      "width 700ms cubic-bezier(0.76, 0, 0.24, 1), " +
      "top 700ms cubic-bezier(0.76, 0, 0.24, 1), " +
      "transform 500ms cubic-bezier(0.76, 0, 0.24, 1)",
  }}
>
       <div
  className={`relative grid grid-cols-[auto_1fr_auto] items-center rounded-full border backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] pointer-events-auto transition-all duration-500 ${
    isLightSection
      ? "border-black/10 bg-black/[0.06]"
      : "border-white/10 bg-white/[0.06]"
  } ${
    showGlassNav
      ? "opacity-100"
      : "opacity-0 pointer-events-none"
  } ${
    compact
      ? "h-[50px] px-4"
      : "h-[55px] px-5"
  }`}
>
          {/* Logo */}
          <a
            href="#about"
            className="flex items-center justify-self-start shrink-0"
            aria-label="AGNI"
          >
            <img
             src={
  isLightSection
    ? "/AGNI-MA-logo-black.png"
    : "/AGNI-MA-logo.png"
}
              alt="MA"
              className={`object-contain transition-all duration-500 ${
  !isLightSection ? "mix-blend-screen" : ""
} ${
  compact ? "w-8 h-8" : "w-10 h-10"
}`}
            />
          </a>

          {/* Social Links */}
      <div
  className="flex items-center justify-center whitespace-nowrap"
  style={{
    gap: compact ? "48px" : "112px",
    transition: "gap 700ms cubic-bezier(0.22, 1, 0.36, 1)",
  }}
>
            {socialItems.map((item) => (
  <motion.a
  key={item.label}
  href={item.href}
  target={item.label === "Email" ? undefined : "_blank"}
  rel={item.label === "Email" ? undefined : "noopener noreferrer"}
  onMouseEnter={() => {
  console.log("WHOOSH TRIGGERED");
  playWhoosh();
}}
 className={`relative font-['Inter'] font-extrabold tracking-[-0.025em] leading-[1.25] transition-colors duration-300 ${
  isLightSection ? "text-black" : "text-white"
} ${compact ? "text-[22px]" : "text-[24px]"}`}
style={{
  textShadow: isLightSection
    ? "0 0 3px rgba(0,0,0,0.45), 0 0 8px rgba(0,0,0,0.20)"
    : "0 0 3px rgba(255,255,255,0.7), 0 0 8px rgba(255,255,255,0.35), 0 0 14px rgba(255,255,255,0.15)",
}}
  initial="rest"
  whileHover="hover"
  animate="rest"
>
    {item.label}

    <motion.span
  variants={{
    rest: {
      clipPath: "inset(0 100% 0 0)",
    },
    hover: {
      clipPath: "inset(0 0% 0 0)",
    },
  }}
  transition={{
    duration: 0.35,
    ease: [0.76, 0, 0.24, 1],
  }}
  className={`absolute left-0 -bottom-1 w-full h-px transition-colors duration-300 ${
  isLightSection ? "bg-black" : "bg-white"
}`}
/>
  </motion.a>
))}
          </div>

          
          {/* Compact progress line — animation intentionally kept simple for now */}
          {compact && (
  <div className="absolute left-6 right-6 -bottom-0 h-[5px] bg-white/15 overflow-hidden rounded-full">
    <div
  className={`h-full rounded-full transition-colors duration-300 ${
    isLightSection ? "bg-black" : "bg-white"
  }`}
  style={{
    width: `${scrollProgress * 100}%`,
    boxShadow: isLightSection
      ? "0 0 6px rgba(0,0,0,0.8), 0 0 14px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)"
      : "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8), 0 0 55px rgba(255,255,255,0.55)",
  }}
/>
  </div>
)}
        </div>
      

      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto">

      {/* Hamburger Button */}
          <button
            onClick={() => {
  playClick();
  setOpen((v) => !v);
}}
            className={`relative flex shrink-0 items-center justify-center bg-transparent transition-all duration-500 ${
              compact ? "w-11 h-11" : "w-12 h-12"
            }`}
            style={{ WebkitFontSmoothing: "antialiased" }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                open
                  ? { rotate: 45, y: 6.5, scaleX: 0.8 }
                  : { rotate: 0, y: 0, scaleX: 1 }
              }
              transition={{ duration: 0.6, ease }}
              className={`absolute left-1/2 -translate-x-1/2 block h-[3.5px] w-[30px] transition-colors duration-300 ${
  isLightSection ? "bg-black" : "bg-white"
}`}
              style={{ top: "25%" }}
            />
            <motion.span
              animate={
                open
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.4, ease }}
              className={`absolute left-1/2 -translate-x-1/2 block h-[3px] w-[30px] transition-colors duration-300 ${
  isLightSection ? "bg-black" : "bg-white"
}`}
              style={{ top: "50%", marginTop: "-0.75px" }}
            />
            <motion.span
              animate={
                open
                  ? { rotate: -45, y: -6.5, scaleX: 0.8 }
                  : { rotate: 0, y: 0, scaleX: 1 }
              }
              transition={{ duration: 0.6, ease }}
              className={`absolute left-1/2 -translate-x-1/2 block h-[3.22px] w-[30px] transition-colors duration-300 ${
  isLightSection ? "bg-black" : "bg-white"
}`}
              style={{ bottom: "25%" }}
            />
          </button>
</div>

      </div>


      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between px-8 md:px-16 pt-16 pb-10 md:pt-20 md:pb-14 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <SideRays />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Socials row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 pt-10 md:pt-0">
                <p className="text-sm text-white/70 uppercase tracking-widest font-mono mr-2">
                  Socials
                </p>
                {socialItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Email" ? undefined : "_blank"}
                    rel={item.label === "Email" ? undefined : "noopener noreferrer"}
                    custom={i}
                    variants={socialVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onMouseEnter={playClick}
                    className="text-base md:text-lg font-medium text-white hover:opacity-40"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-0">
                {navItems.map((item, i) => (
                  <div
                    key={item.label}
                    className="overflow-hidden border-b border-white/25 py-3 md:py-4"
                  >
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="flex items-baseline justify-between group cursor-pointer"
                    >
                      <span className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white uppercase tracking-tight leading-none group-hover:translate-x-3 transition-transform duration-300 ease-out">
                        {item.label}
                      </span>
                      <span className="text-xs text-white/55 font-mono tracking-widest self-start mt-2">
                        {item.number}
                      </span>
                    </motion.a>
                  </div>
                ))}
              </nav>

              {/* Bottom copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.8 } }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                className="text-xs text-white/20 font-mono tracking-widest mt-8 md:mt-0 md:self-end"
              >
                © 2026 AGNI
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
