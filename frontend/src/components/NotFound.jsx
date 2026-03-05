import { useNavigate } from "react-router-dom";
import { Map, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
      {/* Decorative background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center space-y-8 max-w-md animate-[fadeSlideIn_0.6s_ease-out]">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-plum-500 to-rose-500 flex items-center justify-center shadow-2xl animate-[scaleIn_0.6s_ease-out]">
              <Map className="w-16 h-16 text-white" />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-plum-500 to-rose-500 opacity-20 blur-2xl animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 animate-[fadeSlideIn_0.6s_ease-out_0.2s_backwards]">
          <h1 className="font-heading text-4xl sm:text-5xl text-ink">
            Page Not Found
          </h1>
          <p className="font-body text-lg text-ink/60 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-[fadeSlideIn_0.6s_ease-out_0.4s_backwards]">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
           className="group w-full sm:w-auto relative px-6 py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Go Back</span>
            </span>
          </button>

          
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}