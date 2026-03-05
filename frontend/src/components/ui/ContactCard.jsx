export default function ContactCard({
  icon,
  title,
  content,
  href,
  gradient,
  bgGradient,
}) {
  const CardContent = (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2 overflow-hidden w-full max-w-full">
      {/* Hover Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <h4 className="font-body font-semibold text-ink/60 text-xs sm:text-sm mb-1">
            {title}
          </h4>
          <p className="font-body text-base sm:text-lg text-ink font-medium break-words overflow-wrap-anywhere">
            {content}
          </p>
        </div>
      </div>

      {/* Arrow indicator for clickable items */}
      {href && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-ink/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );

  return href ? (
    <a href={href} className="block w-full">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}
