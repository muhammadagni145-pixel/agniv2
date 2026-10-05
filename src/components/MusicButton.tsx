import { useEffect, useRef, useState } from "react";

const MusicButton = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
const analyserRef = useRef<AnalyserNode | null>(null);
const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    if (!audioRef.current) {
  audioRef.current = new Audio("/audio/portfolio-music.mp3");
  audioRef.current.loop = true;
}
  const [isPlaying, setIsPlaying] = useState(false);
  const [barHeights, setBarHeights] = useState([4, 4, 4, 4]);
  useEffect(() => {
  let animationFrame: number;
  let startTime = 0;

  const updateBars = (time: number) => {
    if (!startTime) startTime = time;

    if (isPlaying) {
      const elapsed = (time - startTime) / 1000;

     const heights = [
  4 + Math.abs(Math.sin(elapsed * 2.6)) * 15,
  4 + Math.abs(Math.sin(elapsed * 2.6 - 0.75)) * 11,
  4 + Math.abs(Math.sin(elapsed * 2.6 - 1.5)) * 16,
  4 + Math.abs(Math.sin(elapsed * 2.6 - 2.25)) * 12,
];

setBarHeights(heights);
    } else {
      setBarHeights([4, 4, 4, 4]);
    }

    animationFrame = requestAnimationFrame(updateBars);
  };

  animationFrame = requestAnimationFrame(updateBars);

  return () => cancelAnimationFrame(animationFrame);
}, [isPlaying]);

 const handleMusicToggle = async () => {
  if (!audioRef.current) return;

  if (!audioContextRef.current) {
    const AudioContextClass =
      window.AudioContext || (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    analyser.fftSize = 64;

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;
  }

  if (audioContextRef.current.state === "suspended") {
    await audioContextRef.current.resume();
  }
if (isPlaying) {
  audioRef.current.pause();
  setIsPlaying(false);
  setBarHeights([4, 4, 4, 4]);
}else {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Music playback failed:", error);
    }
  }
};
return (
  <button
  onClick={handleMusicToggle}
className="
  fixed
  bottom-[0.2rem]
  right-[0.5rem]
  md:bottom-[3rem]
  md:right-[2rem]
  z-50
  flex items-center gap-3
  px-4 py-2.5
  rounded-full
  border border-white/30
  bg-neutral-900/80
  backdrop-blur-md
  border border-white/20
  text-white
  shadow-lg shadow-black/20
  transition-all duration-300
  hover:bg-neutral-900/95
  hover:border-white/30
  active:scale-95
"
  >
    <span className="flex items-end gap-[2px] h-4">
      <span
  className="w-[2px] rounded-full bg-white transition-[height] duration-75"
  style={{ height: `${barHeights[0]}px` }}
/>

<span
  className="w-[2px] rounded-full bg-white transition-[height] duration-75"
  style={{ height: `${barHeights[1]}px` }}
/>

<span
  className="w-[2px] rounded-full bg-white transition-[height] duration-75"
  style={{ height: `${barHeights[2]}px` }}
/>

<span
  className="w-[2px] rounded-full bg-white transition-[height] duration-75"
  style={{ height: `${barHeights[3]}px` }}
/>
    </span>

    <span className="text-[12px] font-sans
  
  font-semibold tracking-[0.25em] uppercase">
      {isPlaying ? "Playing" : "Music"}
    </span>
  </button>
);
};

export default MusicButton;