import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import BlurText from "../components/ui/BlurText";

const About = () => {
  
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();
  const [educationBlurInView, setEducationBlurInView] = useState(false);
const [experienceBlurInView, setExperienceBlurInView] = useState(false);
const [focusBlurInView, setFocusBlurInView] = useState(false);



useMotionValueEvent(scrollY, "change", (latest) => {
  // Saat masih berada di Background & Education
  if (latest < vh) {
    setEducationBlurInView(latest >= vh * 0.3);
    setExperienceBlurInView(latest >= vh * 0.2);
    setFocusBlurInView(latest >= vh * 0.1);
    return;
  }

  // Begitu keluar dari Background & Education
  setEducationBlurInView(false);
  setExperienceBlurInView(false);
  setFocusBlurInView(false);
});
const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Section 3: Experience
  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 4: Focus
  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);


  
  return (
    <section 
    id="about"
    className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Background & Education
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-10 md:gap-12">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <BlurText
  text="01. Education"
    inView={educationBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1"
/>
            <div className="flex flex-col">
              <BlurText
  text="Mitra Indsutri Vocational High School"
  inView={educationBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight"
/>
              <BlurText
  text="Electronical Industry | Internet Of Things (2025 – Now)"
    inView={educationBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight"
/>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <BlurText
  text="02. Experience"
  inView={experienceBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1"
/>

            <div className="flex flex-col gap-6">
              {/* Job 1 */}
              <div>
                <BlurText
  text="Modagrafics Auto Indonesia"
  inView={experienceBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight"
/>
                <BlurText
  text="Intern — Marketing Department (July 2026- Oktober 2026)"
    inView={experienceBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight"
/>
              </div>

              {/* Job 2 */}
              <div>
                <BlurText
  text="Organization - OSIS"
  inView={experienceBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight"
/>
                <BlurText
  text="Environmental Cleanliness Division (January 2026- Now)"
  inView={experienceBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight"
/>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <BlurText
  text="03. Focus"
  inView={focusBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1"
/>
            <ul className="flex flex-col">
              <BlurText
  text="Electronics | IoT Engineering"
  inView={focusBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight"
/>
              <BlurText
  text="Web Developer"
  inView={focusBlurInView}
  delay={0}
  stepDuration={1}
  animateBy="words"
  className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight"
/>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;