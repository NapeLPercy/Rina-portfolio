import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  Tag, 
  Loader2, 
  AlertCircle, 
  Share2, 
  ArrowLeft,
  Facebook,
  MessageCircle
} from "lucide-react";
import slugify from "../utils/textFormater";

export default function ReadBlog() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchBlog() {
      try {
        setLoading(true);
        setErrMsg("");
        
        const res = await axios.get(`${BASE_APP_API}/blogs/${id}`);
        const data = res.data?.data;
        
        if (!data) throw new Error("Blog not found");

        // Keep URL pretty/correct if slug doesn't match
        const correctSlug = slugify(data.title);
        if (slug !== correctSlug) {
          navigate(`/blog-post/${id}/${correctSlug}`, { replace: true });
        }

        if (mounted) setBlog(data);
      } catch (err) {
        console.error("Fetch blog error:", err);
        if (mounted) {
          setErrMsg(err.response?.data?.message || err.message || "Failed to load blog.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) fetchBlog();

    return () => {
      mounted = false;
    };
  }, [BASE_APP_API, id, slug, navigate]);

  // Social sharing functions
  const shareOnFacebook = () => {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog.title}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-plum-600 animate-spin mx-auto" />
          <p className="font-body text-ink/60">Loading blog post...</p>
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
          <h3 className="font-heading text-2xl text-ink">Error Loading Blog</h3>
          <p className="font-body text-rose-600">{errMsg}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-8 sm:p-12 max-w-md w-full text-center space-y-4 border border-white/60">
          <AlertCircle className="w-16 h-16 text-ink/20 mx-auto" />
          <h3 className="font-heading text-2xl text-ink">Blog Not Found</h3>
          <p className="font-body text-ink/60">This blog post doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const coverSrc = blog.coverImageUrl ? `${BASE_APP_API}${blog.coverImageUrl}` : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20">
      {/* Decorative background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-xl font-body text-sm font-medium text-ink/70 bg-white/60 hover:bg-white/80 backdrop-blur-lg border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <article className="space-y-6 sm:space-y-8">
          
          {/* Title Section (Frosted Glass) */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/60 shadow-sm">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3">
              {blog.topic && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-plum-100 to-plum-200/60 border border-plum-200/60">
                  <Tag className="w-4 h-4 text-plum-700" />
                  <span className="font-body text-sm font-semibold text-plum-700 capitalize">
                    {blog.topic}
                  </span>
                </div>
              )}

              {blog.publishedAt && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-rose-200/60 border border-rose-200/60">
                  <Calendar className="w-4 h-4 text-rose-700" />
                  <span className="font-body text-sm font-semibold text-rose-700">
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Full Width Cover Image */}
          {coverSrc && (
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
              <img
                src={coverSrc}
                alt={blog.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </div>
          )}

          {/* Excerpt Section (Frosted Glass) */}
          {blog.excerpt && (
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/60 shadow-sm">
              <p className="text-lg sm:text-xl text-ink/70 leading-relaxed font-body italic border-l-4 border-plum-400 pl-6">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* Content Section (Frosted Glass) */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/60 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <div className="font-body text-base sm:text-lg text-ink/80 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
          </div>

          {/* Share Section (Frosted Glass) */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/60 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-plum-600" />
                  <h3 className="font-heading text-lg sm:text-xl text-ink">
                    Share This Post
                  </h3>
                </div>
                <p className="font-body text-sm text-ink/60">
                  Spread the word on social media
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Facebook Share */}
                <button
                  onClick={shareOnFacebook}
                  className="group px-5 py-3 rounded-xl font-body text-sm font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="flex items-center gap-2">
                    <Facebook className="w-5 h-5" />
                    <span className="hidden sm:inline">Facebook</span>
                  </span>
                </button>

                {/* WhatsApp Share */}
                <button
                  onClick={shareOnWhatsApp}
                  className="group px-5 py-3 rounded-xl font-body text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}