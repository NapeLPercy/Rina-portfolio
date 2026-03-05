import { Calendar, ExternalLink, Users } from "lucide-react";
// Petition Card Component
export default function PetitionCard({ petition, index }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article
      className="group bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/60 overflow-hidden hover:bg-white/80 hover:border-rose-300/60 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 animate-[fadeSlideIn_0.6s_ease-out_backwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-rose-100 to-plum-100">
        <img
          src={petition.image}
          alt={petition.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
        
        {/* Signature Count Badge (if available) */}
        {petition.signatures && (
          <div className="absolute top-3 right-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-sm">
              <Users className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-xs font-body font-semibold text-ink">
                {petition.signatures.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Date */}
        {petition.date && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-ink/50">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-plum-500" />
            <span>{formatDate(petition.date)}</span>
          </div>
        )}

        {/* Title */}
        <h2 className="font-heading text-lg sm:text-xl text-ink leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-plum-600 group-hover:bg-clip-text transition-all duration-300">
          {petition.title}
        </h2>

        {/* Summary */}
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          {petition.summary}
        </p>

        {/* CTA Button */}
        <a
          href={petition.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-body text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Button content */}
          <span className="relative flex items-center gap-2">
            <span>View & Sign Petition</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </article>
  );
}
