import Button from "../components/ui/Button";
import img from "../assets/rinah-sitted.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Hero() {
  const titles = ["Writer", "Campaigner", "Advocate"];
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;

  useEffect(() => {
    setIsVisible(true);
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const downloadMainCV = () => {
    setIsLoading(true);

    const url = `${BASE_APP_API}/documents/main/download`;

    const newTab = window.open(url, "_blank");

    if (!newTab) {
      alert("Popup blocked. Please allow popups to download.");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Sophisticated subtle overlay - not too colorful */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/70 to-plum-900/50" />

      {/* Subtle grain texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Animated glow orbs for atmosphere */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-plum-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />

      {/* Content container */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 py-20 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Name - staggered character reveal */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight text-white mb-8 tracking-tight">
          <span className="inline-block animate-[fadeSlideUp_0.8s_ease-out_0.2s_backwards]">
            Lekoloane
          </span>{" "}
          <span className="inline-block animate-[fadeSlideUp_0.8s_ease-out_0.4s_backwards]">
            Mankoele
          </span>{" "}
          <span className="inline-block bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 bg-clip-text text-transparent animate-[fadeSlideUp_0.8s_ease-out_0.6s_backwards]">
            Rina
          </span>
        </h1>

        {/* Rotating title with elegant animation */}
        <div className="relative h-16 md:h-20 mb-12 flex items-center justify-center overflow-hidden">
          {titles.map((title, i) => (
            <p
              key={title}
              className={`absolute font-body text-2xl md:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-700 ${
                i === index
                  ? "opacity-100 translate-y-0 scale-100"
                  : i === (index - 1 + titles.length) % titles.length
                    ? "opacity-0 -translate-y-8 scale-95"
                    : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, #FF9ECC 0%, #FF6EAE 50%, #E62677 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </p>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-12 animate-[fadeIn_1s_ease-out_1s_backwards]">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/60" />
          <div className="w-2 h-2 rounded-full bg-rose-400/80 animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/60" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 animate-[fadeSlideUp_0.8s_ease-out_1.2s_backwards]">
          <a
            href="#about"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-body text-sm font-medium
             bg-plum-900 text-white
             shadow-[0_8px_30px_rgb(60,27,115,0.3)]
             hover:shadow-[0_20px_60px_rgb(60,27,115,0.4)]
             hover:-translate-y-1
             active:translate-y-0
             active:shadow-[0_5px_20px_rgb(60,27,115,0.3)]
             transition-all duration-300 ease-out"
          >
            <span className="text-center">Learn More</span>

            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <button
            className="group relative px-7 py-3 rounded-2xl font-body text-sm font-semibold transition-all duration-500
                       bg-white/10 backdrop-blur-md text-rose-100 border-2 border-rose-300/30
                       hover:bg-white/20 hover:border-rose-300/60 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,158,204,0.15)]
                       active:translate-y-0 active:shadow-[0_8px_25px_rgba(255,158,204,0.1)]
                       focus:outline-none focus:ring-4 focus:ring-rose-300/30 focus:ring-offset-2 focus:ring-offset-transparent
                       overflow-hidden"
            onClick={downloadMainCV}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {isLoading ? (
                <>
                  <span>Downloading CV...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <span>Download CV</span>
              )}
            </span>
          </button>
        </div>

        {/* Scroll indicator 
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-[fadeIn_1s_ease-out_1.5s_backwards]">
          <div className="flex flex-col items-center gap-2 text-rose-200/60">
            <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-rose-300/60 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>*/}
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scrollLine {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
