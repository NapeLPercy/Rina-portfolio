import { useNavigate } from "react-router-dom";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export default function ContactCTA() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact-me");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="relative bg-gradient-to-br from-plum-600 via-plum-700 to-rose-600 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-rose-400/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-96 sm:h-96 bg-plum-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s', animationDelay: '2s' }} />
        
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8 animate-[fadeSlideDown_0.6s_ease-out]">
          <Sparkles className="w-4 h-4 text-rose-200 animate-pulse" />
          <span className="font-body text-xs sm:text-sm font-semibold text-white">
            Let's Create Something Amazing
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6 animate-[fadeSlideDown_0.6s_ease-out_0.1s_backwards]">
          Ready to Start a{" "}
          <span className="relative inline-block">
            Conversation?
            {/* Underline decoration */}
            <svg 
              className="absolute -bottom-2 left-0 w-full h-3 text-rose-300/60"
              viewBox="0 0 200 12" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,7 Q50,2 100,7 T200,7" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 font-body leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto animate-[fadeSlideDown_0.6s_ease-out_0.2s_backwards]">
          Whether you have a employment or project in mind, want to collaborate, or just want to say hello — 
          I'd love to hear from you!
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeSlideDown_0.6s_ease-out_0.3s_backwards]">
          <button
            onClick={handleContactClick}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-body text-base sm:text-lg font-bold text-plum-700 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 active:translate-y-0 overflow-hidden"
          >
            {/* Animated shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-plum-200/50 to-transparent" />
            
            {/* Button content */}
            <span className="relative flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Secondary text */}
          <div className="flex items-center gap-2 text-white/80 font-body text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 border-2 border-white shadow-lg" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-plum-300 to-plum-400 border-2 border-white shadow-lg" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-plum-400 border-2 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-semibold">+</span>
              </div>
            </div>
            <span className="hidden sm:inline">Response within 2 hours</span>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3 animate-[fadeIn_1s_ease-out_0.5s_backwards]">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-white/40" />
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
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
      `}</style>
    </section>
  );
}