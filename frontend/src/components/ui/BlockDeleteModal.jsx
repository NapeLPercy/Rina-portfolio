import { X, AlertCircle } from "lucide-react";

export default function BlockDeleteModal({
  isOpen,
  onClose,
  title = "Action Required",
  message = "You must set another CV as main before deleting this one.",
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] w-full max-w-md pointer-events-auto overflow-hidden animate-[scaleIn_0.4s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient header */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-plum-500 to-rose-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-ink/50 hover:text-ink hover:bg-plum-50 transition-all duration-300 hover:rotate-90 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 pt-10 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg animate-[scaleIn_0.5s_ease-out_0.2s_backwards]">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="font-heading text-2xl sm:text-3xl text-ink animate-[fadeSlideIn_0.4s_ease-out_0.3s_backwards]">
              {title}
            </h2>

            {/* Message */}
            <p className="font-body text-sm sm:text-base text-ink/70 leading-relaxed animate-[fadeSlideIn_0.4s_ease-out_0.4s_backwards]">
              {message}
            </p>

            {/* Button */}
            <div className="pt-2 animate-[fadeSlideIn_0.4s_ease-out_0.5s_backwards]">
              <button
                onClick={onClose}
                className="w-full px-6 py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Button content */}
                <span className="relative">Okay, Got It</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
} 