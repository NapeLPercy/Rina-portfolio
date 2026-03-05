import { X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  icon: Icon,
  confirmText = "Confirm",
  confirmColor = "plum", // plum, rose, green, red
  isLoading = false,
}) {
  if (!isOpen) return null;

  // Color configurations for confirm button
  const colorStyles = {
    plum: {
      bg: "from-plum-600 to-plum-700",
      bgHover: "hover:from-plum-700 hover:to-plum-800",
      iconBg: "from-plum-500 to-plum-600",
    },
    rose: {
      bg: "from-rose-600 to-rose-700",
      bgHover: "hover:from-rose-700 hover:to-rose-800",
      iconBg: "from-rose-500 to-rose-600",
    },
    green: {
      bg: "from-green-600 to-green-700",
      bgHover: "hover:from-green-700 hover:to-green-800",
      iconBg: "from-green-500 to-green-600",
    },
    red: {
      bg: "from-red-600 to-red-700",
      bgHover: "hover:from-red-700 hover:to-red-800",
      iconBg: "from-red-500 to-red-600",
    },
  };

  const colors = colorStyles[confirmColor] || colorStyles.plum;

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
          className="relative bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] w-full max-w-md pointer-events-auto overflow-hidden animate-[scaleIn_0.4s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient header */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors.iconBg}`} />

          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-5 right-5 p-2 rounded-xl text-ink/50 hover:text-ink hover:bg-plum-50 transition-all duration-300 hover:rotate-90 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 pt-10 text-center space-y-6">
            {/* Icon */}
            {Icon && (
              <div className="flex justify-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.iconBg} shadow-lg animate-[scaleIn_0.5s_ease-out_0.2s_backwards]`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            )}

            {/* Title */}
            {title && (
              <h2 className="font-heading text-2xl sm:text-3xl text-ink animate-[fadeSlideIn_0.4s_ease-out_0.3s_backwards]">
                {title}
              </h2>
            )}

            {/* Message */}
            {message && (
              <p className="font-body text-sm sm:text-base text-ink/70 leading-relaxed animate-[fadeSlideIn_0.4s_ease-out_0.4s_backwards]">
                {message}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-[fadeSlideIn_0.4s_ease-out_0.5s_backwards]">
              {/* Cancel Button - Static Gray */}
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold text-ink/70 bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Cancel
              </button>

              {/* Confirm Button - Dynamic Color */}
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`group flex-1 relative px-6 py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold text-white bg-gradient-to-r ${colors.bg} ${colors.bgHover} shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden`}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    confirmText
                  )}
                </span>
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