import { Calendar } from "lucide-react";
export default function PublishCard({ title, excerpt, publishedAt, index }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl p-5 sm:p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 animate-[fadeSlideIn_0.6s_ease-out_backwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        {/* Date badge */}
        <div className="flex-shrink-0 w-fit sm:w-20 text-center">
          <div className="inline-flex sm:block items-center gap-2 sm:gap-0 px-4 py-2 sm:px-3 sm:py-3 rounded-xl bg-gradient-to-br from-plum-50 to-rose-50 border border-plum-200/60">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-plum-600" />
            <p className="font-body text-xs sm:text-sm font-semibold text-plum-700">
              {formatDate(publishedAt)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-ink mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-plum-600 group-hover:to-rose-600 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>
          <p className="font-body text-sm sm:text-base text-ink/70 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          <svg
            className="w-6 h-6 text-ink/40"
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
      </div>
    </div>
  );
}
