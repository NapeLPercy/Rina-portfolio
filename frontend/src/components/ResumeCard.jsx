import { FileText, Download, Edit3, Trash2, Calendar } from "lucide-react";
// Resume Card Component
export default function ResumeCard({
  resume,
  onEdit,
  onDelete,
  onDownload,
  formatDate,
  index,
}) {
  return (
    <div
      className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl p-5 sm:p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 animate-[fadeSlideIn_0.6s_ease-out_backwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Icon & Document Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* PDF Icon */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
              {resume.is_main === 1 ? "Main Cv" : null}
            </span>

            {/* Title */}
            <h3 className="font-heading text-lg sm:text-xl text-ink group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-plum-600 group-hover:to-rose-600 group-hover:bg-clip-text transition-all duration-300 truncate">
              {resume.title}
            </h3>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-ink/70 leading-relaxed line-clamp-2">
              {resume.description}
            </p>

            {/* Upload Date */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-ink/50">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Uploaded {formatDate(resume.updated_at)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 lg:flex-shrink-0">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(resume)}
            className="group/btn flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-body text-sm sm:text-base font-semibold text-plum-700 bg-plum-50 border-2 border-plum-200/60 hover:bg-plum-100 hover:border-plum-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              <span className="hidden sm:inline">Edit</span>
            </span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(resume)}
            className="group/btn flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-body text-sm sm:text-base font-semibold text-rose-700 bg-rose-50 border-2 border-rose-200/60 hover:bg-rose-100 hover:border-rose-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="hidden sm:inline">Delete</span>
            </span>
          </button>

          {/* Download Button */}
          <button
            onClick={() => onDownload(resume)}
            className="group/btn flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-body text-sm sm:text-base font-semibold text-plum-700 bg-plum-50 border-2 border-plum-200/60 hover:bg-plum-100 hover:border-plum-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              <span className="hidden sm:inline">Download</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
