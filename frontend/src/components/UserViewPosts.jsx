// src/pages/UserViewBlogs.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, BookOpen, Loader2, AlertCircle } from "lucide-react";
import  slugify  from "../utils/textFormater";
import { formatDate } from "../utils/dateTime";

export default function UserViewBlogs() {
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | title

  useEffect(() => {
    let mounted = true;

    async function fetchBlogs() {
      try {
        setLoading(true);
        setErrMsg("");

        // public call (no token) -> backend should return PUBLISHED only
        const res = await axios.get(`${BASE_APP_API}/blogs`);

        const posts = res.data?.posts || [];
        if (mounted) setBlogs(posts);
      } catch (err) {
        console.error("Fetch blogs error:", err);
        if (mounted) setErrMsg(err.response?.data?.message || "Failed to load blogs.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, [BASE_APP_API]);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = blogs;
    if (q) {
      list = list.filter((b) => {
        const t = (b.title || "").toLowerCase();
        const e = (b.excerpt || "").toLowerCase();
        const tp = (b.topic || "").toLowerCase();
        return t.includes(q) || e.includes(q) || tp.includes(q);
      });
    }

    const getTime = (b) => {
      const d = b.publishedAt || b.createdAt;
      const time = d ? new Date(d).getTime() : 0;
      return Number.isFinite(time) ? time : 0;
    };

    if (sort === "oldest") {
      list = [...list].sort((a, b) => getTime(a) - getTime(b));
    } else if (sort === "title") {
      list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      list = [...list].sort((a, b) => getTime(b) - getTime(a));
    }

    return list;
  }, [blogs, query, sort]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-plum-600 animate-spin mx-auto" />
          <p className="font-body text-ink/60">Loading blogs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (errMsg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-8 sm:p-12 max-w-md w-full text-center space-y-4 border border-white/60">
          <AlertCircle className="w-16 h-16 text-rose-600 mx-auto" />
          <h3 className="font-heading text-2xl text-ink">Error Loading Blogs</h3>
          <p className="font-body text-rose-600">{errMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20">
      {/* Decorative background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-plum-500 to-rose-500 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ink">
              Explore{" "}
              <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>
          </div>
          <p className="font-body text-ink/60 text-base sm:text-lg ml-14">
            Discover stories, insights, and inspiration
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/60 shadow-sm mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-plum-600 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm sm:text-base text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Sort Select */}
            <div className="relative sm:w-48">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl border-2 border-rose-200/60 bg-rose-50/30 font-body text-sm sm:text-base text-ink focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A–Z)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {!filteredAndSorted.length ? (
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-12 sm:p-16 border border-white/60 shadow-sm text-center">
            <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-ink/20 mx-auto mb-4" />
            <h3 className="font-heading text-xl sm:text-2xl text-ink/60 mb-2">
              No Blogs Found
            </h3>
            <p className="font-body text-sm sm:text-base text-ink/50">
              {query ? "Try adjusting your search terms" : "Check back later for new content"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSorted.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                onClick={() => navigate(`/blog-post/${blog.id}/${slugify(blog.title)}`)}
                BASE_APP_API={BASE_APP_API}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Blog Card Component
function BlogCard({ blog, index, onClick, BASE_APP_API }) {
  const imgSrc = blog.coverImageUrl ? `${BASE_APP_API}${blog.coverImageUrl}` : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/60 overflow-hidden hover:bg-white/80 hover:border-plum-200/60 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 animate-[fadeSlideIn_0.6s_ease-out_backwards]"
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
        
        {/* Topic Badge */}
        {blog.topic && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-body font-semibold bg-white/90 backdrop-blur-sm text-plum-700 border border-white/60 capitalize">
              {blog.topic}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Date */}
        {blog.publishedAt && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-ink/50">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        )}

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

        {/* Read More Link */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 text-sm font-body font-semibold text-plum-600 group-hover:text-plum-700 transition-colors duration-300">
            <span>Read more</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

/* Keyframe Animation */
const styles = `
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
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}