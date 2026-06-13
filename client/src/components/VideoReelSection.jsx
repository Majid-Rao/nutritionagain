import mainVideoWebm  from "../assets/convertedFiles/v1.webm";
import mainVideoMp4   from "../assets/convertedFiles/v1.mp4";
import mainThumb      from "../assets/convertedFiles/1.webp";

import reel1Webm      from "../assets/convertedFiles/v2.webm";
import reel1Mp4       from "../assets/convertedFiles/v2.mp4";
import reel1Thumb     from "../assets/convertedFiles/15.webp";

import reel2Webm      from "../assets/convertedFiles/v3.webm";
import reel2Mp4       from "../assets/convertedFiles/v3.mp4";
import reel2Thumb     from "../assets/convertedFiles/16.webp";

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Import your videos above
// STEP 2: Update the data below — fill in your imported variables
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";

const MAIN_VIDEO = {
  webm:     mainVideoWebm,
  mp4:      mainVideoMp4,
  poster:   mainThumb,
  title:    "Clinic Grand Opening — Full Tour",
  duration: "4:22",
  tag:      "Full Video",
};

const REELS = [
  {
    id: 1,
    webm:     reel1Webm,
    mp4:      reel1Mp4,
    poster:   reel1Thumb,
    title:    "Opening Ceremony Reel",
    duration: "0:32",
    tag:      "Reel",
  },
  {
    id: 2,
    webm:     reel2Webm,
    mp4:      reel2Mp4,
    poster:   reel2Thumb,
    title:    "Team Intro Reel",
    duration: "0:45",
    tag:      "Reel",
  },
];

// ─── Intersection Observer hook for scroll animations ────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Video Tile ───────────────────────────────────────────────────────────────
function VideoTile({ webm, mp4, poster, title, duration, tag, isMain, delay = 0 }) {
  const videoRef            = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered]   = useState(false);
  const [loaded, setLoaded]     = useState(false);
  const [tileRef, inView]       = useInView(0.1);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play().catch(() => {}); setPlaying(true); }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onEnded = () => { setPlaying(false); setProgress(0); };

  const seek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <div
      ref={tileRef}
      className="relative overflow-hidden rounded-3xl cursor-pointer select-none
        bg-[#111111] border border-[#2a2a2a]"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(0.25,1,0.5,1) ${delay}ms,
                     transform 0.65s cubic-bezier(0.25,1,0.5,1) ${delay}ms`,
        minHeight: isMain ? "clamp(260px, 38vw, 480px)" : "clamp(190px, 22vw, 280px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggle}
      role="button"
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onCanPlay={() => setLoaded(true)}
        playsInline
        preload="metadata"
        onClick={(e) => e.stopPropagation()}
      >
        {webm && <source src={webm} type="video/webm" />}
        {mp4  && <source src={mp4}  type="video/mp4"  />}
      </video>

      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
              animation: "shimmer 1.6s infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(160deg, rgba(20,6,12,0.80) 0%, rgba(0,0,0,0.28) 100%)",
          opacity: playing ? 0.38 : 0.78,
        }}
      />

      {/* Top-right pink glow accent */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: isMain ? "160px" : "100px",
          height: isMain ? "160px" : "100px",
          background: "radial-gradient(circle at top right, rgba(212,83,126,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Tag badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#D4537E]
          bg-[rgba(212,83,126,0.12)] border border-[rgba(212,83,126,0.3)]
          px-2.5 py-1 rounded-full">
          {tag}
        </span>
      </div>

      {/* Duration badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span className="text-[10px] text-white/50 bg-black/35 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {duration}
        </span>
      </div>

      {/* Play / Pause button */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-300"
        style={{ opacity: (!playing || hovered) ? 1 : 0 }}
      >
        <div
          className="flex items-center justify-center rounded-full border transition-all duration-300"
          style={{
            width:   isMain ? "64px" : "50px",
            height:  isMain ? "64px" : "50px",
            background: "rgba(212,83,126,0.18)",
            borderColor: "rgba(212,83,126,0.55)",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            boxShadow: hovered ? "0 0 28px rgba(212,83,126,0.25)" : "none",
          }}
        >
          {playing ? (
            <svg width={isMain ? 22 : 17} height={isMain ? 22 : 17} fill="#D4537E" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
            </svg>
          ) : (
            <svg
              width={isMain ? 22 : 17} height={isMain ? 22 : 17}
              fill="#D4537E" viewBox="0 0 24 24"
              style={{ marginLeft: "3px" }}
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </div>

      {/* Bottom info */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      >
        <p
          className="text-white font-medium leading-snug"
          style={{
            fontSize: isMain ? "14px" : "12px",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </p>

        {/* Seekable progress bar — main video only */}
        {isMain && (
          <div
            className="mt-2.5 h-[3px] rounded-full bg-white/15 cursor-pointer overflow-hidden"
            onClick={seek}
          >
            <div
              className="h-full rounded-full bg-[#D4537E]"
              style={{ width: `${progress}%`, transition: "width 0.3s linear" }}
            />
          </div>
        )}

        {/* Reel thin progress */}
        {!isMain && playing && (
          <div className="mt-2 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D4537E]"
              style={{ width: `${progress}%`, transition: "width 0.3s linear" }}
            />
          </div>
        )}
      </div>

      {/* Pulsing live dot when playing */}
      {playing && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4537E] animate-pulse" />
          <span className="text-[9px] text-white/50">playing</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function VideoReelSection() {
  const [headingRef, headingInView] = useInView(0.2);

  return (
    <section className="w-full bg-white dark:bg-[#0c0c0c] transition-colors duration-200 py-16 sm:py-24 px-4 sm:px-10 lg:px-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .vr-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .vr-sans  { font-family: 'DM Sans', sans-serif; }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes vr-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto vr-sans">

        {/* ── Heading ──────────────────────────────────────────────────── */}
        <div
          ref={headingRef}
          className="mb-12 sm:mb-16"
          style={{
            opacity:    headingInView ? 1 : 0,
            transform:  headingInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s cubic-bezier(0.25,1,0.5,1), transform 0.7s cubic-bezier(0.25,1,0.5,1)",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-px bg-[#D4537E] origin-left"
              style={{
                width: "28px",
                transform: headingInView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.5s 0.2s cubic-bezier(0.25,1,0.5,1)",
              }}
            />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4537E] ">
              Our Clinic Content
            </span>
            <div
              className="h-px bg-[#D4537E] origin-left"
              style={{
                width: "28px",
                transform: headingInView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.5s 0.3s cubic-bezier(0.25,1,0.5,1)",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="vr-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white duration-200 leading-tight">
                Watch &amp; Explore
              </h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-white/40 duration-200 mt-3 font-light tracking-wide max-w-lg">
                Behind the scenes and highlights from our clinic opening — full tour video and quick reels
              </p>
            </div>

            <div className="flex items-center gap-3 sm:pb-1 flex-shrink-0">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4537E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4537E]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4537E]/15" />
              </div>
              <span className="text-xs text-gray-600 dark:text-white/30 duration-200 tracking-widest uppercase">
                1 video · 2 reels
              </span>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="h-px flex-1 bg-gray-100 dark:bg-white/8 duration-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4537E]/50" />
            <div className="h-px w-10 bg-[#D4537E]/30" />
          </div>
        </div>

        {/* ── Video Grid ───────────────────────────────────────────────── */}
        {/* Desktop: main video left (flex-[1.7]), reels column right  */}
        {/* Mobile: all 3 stacked full width, 1 per row                */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:items-stretch">

          {/* Main video */}
          <div className="w-full lg:flex-[1.7]">
            <VideoTile
              webm={MAIN_VIDEO.webm}
              mp4={MAIN_VIDEO.mp4}
              poster={MAIN_VIDEO.poster}
              title={MAIN_VIDEO.title}
              duration={MAIN_VIDEO.duration}
              tag={MAIN_VIDEO.tag}
              isMain={true}
              delay={0}
            />
          </div>

          {/* Reels column — side by side on tablet, stacked on desktop sidebar, stacked on mobile */}
          <div className="w-full lg:flex-1 flex flex-col sm:flex-row lg:flex-col gap-5">
            {REELS.map((reel, i) => (
              <div key={reel.id} className="w-full sm:flex-1 lg:flex-none">
                <VideoTile
                  webm={reel.webm}
                  mp4={reel.mp4}
                  poster={reel.poster}
                  title={reel.title}
                  duration={reel.duration}
                  tag={reel.tag}
                  isMain={false}
                  delay={120 + i * 100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom hint ──────────────────────────────────────────────── */}
        <div className="mt-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4537E] animate-pulse" />
            <span className="text-xs text-gray-700 dark:text-white/30 duration-200 tracking-wide">
              Click any video to play
            </span>
          </div>
          <span className="text-xs text-gray-300 dark:text-white/20 duration-200 hidden sm:block tracking-wider uppercase">
            WebM · MP4
          </span>
        </div>

      </div>
    </section>
  );
}