// ─── Image imports from assets folder ───────────────────────────────────────
import img1  from "../assets/convertedFiles/1.webp";
import img2  from "../assets/convertedFiles/2.webp";
import img3  from "../assets/convertedFiles/3.webp";
import img4  from "../assets/convertedFiles/4.webp";
import img5  from "../assets/convertedFiles/5.webp";
import img6  from "../assets/convertedFiles/6.webp";
import img7  from "../assets/convertedFiles/7.webp";
import img8  from "../assets/convertedFiles/8.webp";
import img9  from "../assets/convertedFiles/9.webp";
import img10 from "../assets/convertedFiles/10.webp";
import img11 from "../assets/convertedFiles/11.webp";
import img12 from "../assets/convertedFiles/12.webp";
import img13 from "../assets/convertedFiles/13.webp";
import img14 from "../assets/convertedFiles/14.webp";
import img15 from "../assets/convertedFiles/15.webp";
import img16 from "../assets/convertedFiles/16.webp";
import img17 from "../assets/convertedFiles/17.webp";
import img18 from "../assets/convertedFiles/18.webp";
import img19 from "../assets/convertedFiles/19.webp";
import img20 from "../assets/convertedFiles/20.webp";

import { useState, useEffect, useRef, useCallback } from "react";

const CLINIC_IMAGES = [
  { id: 1,  src: img1,  label: "Opening Day"       },
  { id: 2,  src: img2,  label: "Ribbon Cutting"    },
  { id: 3,  src: img3,  label: "Our Team"          },
  { id: 4,  src: img4,  label: "The Clinic"        },
  { id: 5,  src: img5,  label: "Community"         },
  { id: 6,  src: img6,  label: "Celebration"       },
  { id: 7,  src: img7,  label: "Grand Entry"       },
  { id: 8,  src: img8,  label: "Special Guests"    },
  { id: 9,  src: img9,  label: "Ceremony Moments"  },
  { id: 10, src: img10, label: "Staff & Doctors"   },
  { id: 11, src: img11, label: "Reception Area"    },
  { id: 12, src: img12, label: "Consultation Room" },
  { id: 13, src: img13, label: "Lab Setup"         },
  { id: 14, src: img14, label: "Happy Patients"    },
  { id: 15, src: img15, label: "Floral Decor"      },
  { id: 16, src: img16, label: "Cake Cutting"      },
  { id: 17, src: img17, label: "Group Photo"       },
  { id: 18, src: img18, label: "Media Coverage"    },
  { id: 19, src: img19, label: "Kids Corner"       },
  { id: 20, src: img20, label: "End of Evening"    },
];

const DURATION = 600; // ms — animation duration

export default function ClinicSlider() {
  const [current,      setCurrent]      = useState(0);
  const [prevIdx,      setPrevIdx]      = useState(null);
  const [direction,    setDirection]    = useState("right");
  const [isAnimating,  setIsAnimating]  = useState(false);
  const autoRef  = useRef(null);
  const cleanRef = useRef(null);
  const total    = CLINIC_IMAGES.length;

  // ── Core navigate — simple & reliable ───────────────────────────────────
  const goTo = useCallback((nextIdx, dir) => {
    // block if already animating or same slide
    if (isAnimating) return;
    if (nextIdx === current) return;

    clearTimeout(cleanRef.current);

    setDirection(dir);
    setPrevIdx(current);
    setCurrent(nextIdx);
    setIsAnimating(true);

    cleanRef.current = setTimeout(() => {
      setPrevIdx(null);
      setIsAnimating(false);
    }, DURATION);
  }, [isAnimating, current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % total, "right");
  }, [current, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total, "left");
  }, [current, total, goTo]);

  // ── Auto scroll ──────────────────────────────────────────────────────────
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % total;
        setPrevIdx(c);
        setDirection("right");
        setIsAnimating(true);
        clearTimeout(cleanRef.current);
        cleanRef.current = setTimeout(() => {
          setPrevIdx(null);
          setIsAnimating(false);
        }, DURATION);
        return next;
      });
    }, 4000);
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => {
      clearInterval(autoRef.current);
      clearTimeout(cleanRef.current);
    };
  }, [startAuto]);

  const resetAuto = () => startAuto();

  const handlePrev = () => { goPrev(); resetAuto(); };
  const handleNext = () => { goNext(); resetAuto(); };
  const handleGoTo = (i) => { goTo(i, i > current ? "right" : "left"); resetAuto(); };

  const progress = ((current + 1) / total) * 100;

  // animation class helpers
  const enterClass = direction === "right" ? "anim-enter-right" : "anim-enter-left";
  const leaveClass = direction === "right" ? "anim-leave-left"  : "anim-leave-right";

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .clinic-font { font-family: 'Cormorant Garamond', Georgia, serif; }
        .body-font   { font-family: 'DM Sans', sans-serif; }

        @keyframes enterRight {
          from { transform: translateX(48px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes enterLeft {
          from { transform: translateX(-48px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes leaveLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-48px); opacity: 0; }
        }
        @keyframes leaveRight {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(48px); opacity: 0; }
        }
        @keyframes fadeUp {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .anim-enter-right { animation: enterRight ${DURATION}ms cubic-bezier(0.25,1,0.5,1) forwards; }
        .anim-enter-left  { animation: enterLeft  ${DURATION}ms cubic-bezier(0.25,1,0.5,1) forwards; }
        .anim-leave-left  { animation: leaveLeft  ${DURATION}ms cubic-bezier(0.25,1,0.5,1) forwards; }
        .anim-leave-right { animation: leaveRight ${DURATION}ms cubic-bezier(0.25,1,0.5,1) forwards; }
        .fade-up          { animation: fadeUp 0.7s cubic-bezier(0.25,1,0.5,1) both; }

        .thumb-scroll::-webkit-scrollbar       { height: 3px; }
        .thumb-scroll::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 2px; }

        /* arrow wrapper keeps translateY(-50%) intact — scale only on the inner circle */
        .arrow-wrap { 
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .arrow-circle {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.92);
          border: 1.5px solid #fbcfe8;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .arrow-circle:hover  { background: #fdf2f8; border-color: #f472b6; transform: scale(1.1); box-shadow: 0 4px 14px rgba(236,72,153,0.18); }
        .arrow-circle:active { transform: scale(0.93); }

        .thumb-btn { transition: transform 0.2s ease, opacity 0.2s ease; }
        .thumb-btn:hover { transform: scale(1.07); }
      `}</style>

      <div className="w-full max-w-5xl mx-auto body-font">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-10 fade-up">
          <span className="inline-flex items-center gap-2 bg-pink-50 text-pink-500 text-xs font-medium tracking-[0.14em] uppercase px-5 py-2 rounded-full mb-4 border border-pink-100">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
            Grand Opening
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
          </span>
          <h2 className="clinic-font text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
            Our Physical Clinic Opening Ceremony
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 font-light tracking-wide max-w-xl mx-auto">
            A beautiful milestone — celebrating the launch of our beloved clinic with our wonderful community
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16 bg-pink-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-pink-300"></div>
            <div className="h-px w-16 bg-pink-200"></div>
          </div>
        </div>

        {/* ── Slider Card ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-md">

          {/* Main image area */}
          <div
            className="relative bg-pink-50 overflow-hidden"
            style={{ height: "clamp(260px, 50vw, 500px)" }}
          >
            {/* Outgoing layer */}
            {prevIdx !== null && (
              <div key={`leave-${prevIdx}`} className={`absolute inset-0 ${leaveClass}`} style={{ zIndex: 1 }}>
                <img
                  src={CLINIC_IMAGES[prevIdx].src}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            )}

            {/* Incoming layer */}
            <div key={`enter-${current}`} className={`absolute inset-0 ${isAnimating ? enterClass : ""}`} style={{ zIndex: 2 }}>
              <img
                src={CLINIC_IMAGES[current].src}
                alt={CLINIC_IMAGES[current].label}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Dark gradient bottom */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: "38%", background: "linear-gradient(to top, rgba(0,0,0,0.38), transparent)", zIndex: 3 }}
            />

            {/* Label bottom-left */}
            <span
              className="absolute bottom-4 left-5 text-white text-sm font-medium tracking-wide"
              style={{ zIndex: 4, textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
            >
              {CLINIC_IMAGES[current].label}
            </span>

            {/* Counter bottom-right */}
            <span
              className="absolute bottom-4 right-5 text-white text-xs px-3 py-1 rounded-full"
              style={{ zIndex: 4, background: "rgba(0,0,0,0.28)", backdropFilter: "blur(6px)" }}
            >
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            {/* Prev arrow */}
            <div className="arrow-wrap" style={{ left: "16px" }}>
              <button className="arrow-circle" onClick={handlePrev} aria-label="Previous image">
                <svg width="16" height="16" fill="none" stroke="#ec4899" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
            </div>

            {/* Next arrow */}
            <div className="arrow-wrap" style={{ right: "16px" }}>
              <button className="arrow-circle" onClick={handleNext} aria-label="Next image">
                <svg width="16" height="16" fill="none" stroke="#ec4899" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[3px] bg-pink-50">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
              style={{ width: `${progress}%`, transition: `width ${DURATION}ms cubic-bezier(0.25,1,0.5,1)` }}
            />
          </div>

          {/* Bottom controls */}
          <div className="px-5 pt-4 pb-5">

            {/* Thumbnails */}
            <div className="flex gap-2.5 overflow-x-auto thumb-scroll pb-1">
              {CLINIC_IMAGES.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => handleGoTo(i)}
                  className="thumb-btn flex-shrink-0 rounded-xl overflow-hidden border-2"
                  style={{
                    width: "60px", height: "60px",
                    borderColor: i === current ? "#ec4899" : "transparent",
                    opacity: i === current ? 1 : 0.65,
                    boxShadow: i === current ? "0 0 0 1px #ec4899, 0 4px 12px rgba(236,72,153,0.2)" : "none",
                    transform: i === current ? "scale(1.06)" : "scale(1)",
                    transition: "border-color 0.25s, opacity 0.25s, transform 0.25s, box-shadow 0.25s",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>

            {/* Dots + counter */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1.5 items-center flex-wrap">
                {CLINIC_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleGoTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{
                      height: "7px",
                      width: i === current ? "22px" : "7px",
                      borderRadius: "999px",
                      background: i === current ? "#ec4899" : "#fbcfe8",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "width 0.35s cubic-bezier(0.25,1,0.5,1), background 0.3s ease",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium ml-4 whitespace-nowrap">
                {current + 1} of {total} photos
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}