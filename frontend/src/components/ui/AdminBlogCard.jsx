import { BookOpen, Trash2, Edit, Eye, Loader2, AlertCircle } from "lucide-react";
// Blog Card Component
export default function BlogCard({ blog, index, onDelete, onStatusChange, onRead, getStatusColor, BASE_APP_API }) {
  const imgSrc = blog.coverImageUrl ? `${BASE_APP_API}${blog.coverImageUrl}` : null;

  return (
    <div
      className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-[fadeSlideIn_0.6s_ease-out_backwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-plum-100 to-rose-100">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/40" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border ${getStatusColor(blog.status)}`}>
            {blog.status === "PUBLISHED" ? "Published" : "Draft"}
          </span>
        </div>

        {/* Topic Badge */}
        {blog.topic && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-body font-semibold bg-white/90 backdrop-blur-sm text-ink/70 border border-white/60">
              {blog.topic}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Title */}
        <h4 className="font-heading text-lg sm:text-xl text-ink leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-plum-600 group-hover:to-rose-600 group-hover:bg-clip-text transition-all duration-300">
          {blog.title}
        </h4>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="font-body text-sm text-ink/60 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {/* Read Button */}
          <button
            onClick={onRead}
            className="flex-1 px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-white bg-gradient-to-r from-plum-600 to-plum-700 hover:from-plum-700 hover:to-plum-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Read</span>
            </span>
          </button>

          {/* Status Toggle Button */}
          <button
            onClick={() => onStatusChange(blog)}
            className={`px-4 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg ${
              blog.status === "PUBLISHED"
                ? "text-yellow-700 bg-yellow-50 border-2 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300"
                : "text-green-700 bg-green-50 border-2 border-green-200 hover:bg-green-100 hover:border-green-300"
            }`}
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(blog)}
            className="px-4 py-2.5 rounded-xl font-body text-sm font-semibold text-rose-700 bg-rose-50 border-2 border-rose-200 hover:bg-rose-100 hover:border-rose-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
