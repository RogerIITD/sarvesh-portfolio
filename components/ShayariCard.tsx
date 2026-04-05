"use client";

import { useState, useRef, useCallback } from "react";

interface ShayariCardProps {
  text: string;
  audioSrc: string;
  rotation?: number;
}

export default function ShayariCard({
  text,
  audioSrc,
  rotation = 0,
}: ShayariCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, audioSrc]);

  return (
    <div
      className="bg-parchment border border-primary/15 rounded-xl px-8 py-6 pb-5 w-[280px] text-center relative shadow-md hover:shadow-lg transition-shadow"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <p className="font-shayari text-lg leading-relaxed text-secondary mb-5 whitespace-pre-line">
        {text}
      </p>

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause shayari" : "Play shayari"}
        className="w-12 h-12 rounded-full bg-primary text-white text-lg inline-flex items-center justify-center hover:scale-110 hover:bg-secondary transition-all animate-pulse-glow"
      >
        {isPlaying ? "\u23F8" : "\u25B6"}
      </button>

      {isPlaying && (
        <div className="flex items-center justify-center gap-[3px] h-6 mt-3">
          <span className="w-[3px] bg-primary rounded-sm animate-wave-1" style={{ height: "8px" }} />
          <span className="w-[3px] bg-primary rounded-sm animate-wave-2" style={{ height: "8px" }} />
          <span className="w-[3px] bg-primary rounded-sm animate-wave-3" style={{ height: "8px" }} />
          <span className="w-[3px] bg-primary rounded-sm animate-wave-4" style={{ height: "8px" }} />
          <span className="w-[3px] bg-primary rounded-sm animate-wave-5" style={{ height: "8px" }} />
        </div>
      )}
    </div>
  );
}
