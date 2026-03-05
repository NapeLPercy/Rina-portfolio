import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  FileText,
  Upload,
  TrendingUp,
  BookOpen,
  Edit3,
  CheckCircle,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PublishCard from "./ui/PublishCard";
import StatCard from "./ui/StatCard";

export default function Dashboard() {
  const { user } = useAuth();
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const token = user.token;

        const response = await fetch(`${BASE_APP_API}/dashboard/summary`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard summary");
        }

        const data = await response.json();
        console.log("Dashboard Summary:", data);

        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchSummary();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-150 bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-plum-600 animate-spin mx-auto" />
          <p className="font-body text-ink/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
          <h3 className="font-heading text-2xl text-ink">
            Error Loading Dashboard
          </h3>
          <p className="font-body text-ink/60">{error}</p>
        </div>
      </div>
    );
  }

  const { totals, last7Days, documents } = dashboardData || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ink mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
              {user?.username || "User"}
            </span>
          </h1>
          <p className="font-body text-ink/60 text-base sm:text-lg">
            Here's what's happening with your portfolio
          </p>
        </div>

        {/* Quick Actions */}
        {window.innerWidth <= 600 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="font-heading text-xl sm:text-2xl text-ink mb-4 sm:mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-plum-600" />
              Quick Actions
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Filled Button - Add Blog */}
              <button
                onClick={() => navigate("/manage-blogs")}
                className="group flex-1 relative px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-body text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-plum-600 to-plum-700 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-3">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Add New Blog</span>
                </span>
              </button>

              {/* Bordered Button - Upload Resume */}
              <button
                onClick={() => navigate("/manage-resume")}
                className="group flex-1 relative px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-body text-base sm:text-lg font-semibold text-rose-700 bg-white border-2 border-rose-300 shadow-lg hover:shadow-xl hover:border-rose-400 hover:bg-rose-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-rose-200/30 to-transparent" />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-3">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Upload Resume</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="mb-8 sm:mb-12">
          <h2 className="font-heading text-xl sm:text-2xl text-ink mb-4 sm:mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
            Blog Overview
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
              label="Total Blogs"
              value={totals?.blogs || 0}
              gradient="from-plum-500 to-plum-600"
            />
            <StatCard
              icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
              label="Topics"
              value={totals?.distinctTopics || 0}
              gradient="from-plum-500 to-rose-500"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
              label="Published"
              value={totals?.published || 0}
              gradient="from-green-500 to-green-600"
            />
            <StatCard
              icon={<Edit3 className="w-5 h-5 sm:w-6 sm:h-6" />}
              label="Drafted"
              value={totals?.drafted || 0}
              gradient="from-rose-500 to-rose-600"
            />
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="font-heading text-xl sm:text-2xl text-ink mb-4 sm:mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
            CVs Overview
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
              label="CVs"
              value={totals?.cvs || 0}
              gradient="from-green-500 to-rose-500"
            />
          </div>
        </div>
        {/* Recent Publishes */}
        <div>
          <h2 className="font-heading text-xl sm:text-2xl text-ink mb-4 sm:mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-plum-600" />
            Recently Published
            <span className="text-sm font-body font-normal text-ink/60">
              (Last 7 days)
            </span>
          </h2>

          {last7Days?.publishedList && last7Days.publishedList.length > 0 ? (
            <div className="space-y-4">
              {last7Days.publishedList.map((post, index) => (
                <PublishCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishedAt={post.publishedAt}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-8 sm:p-12 text-center">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-ink/20 mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-ink/60 mb-2">
                No Recent Publications
              </h3>
              <p className="font-body text-sm sm:text-base text-ink/50">
                You haven't published anything in the last 7 days
              </p>
            </div>
          )}
        </div>

        {/* Resume Status */}
        {documents && (
          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-plum-100/60 to-rose-100/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-plum-200/60">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white shadow-sm">
                <Upload className="w-6 h-6 text-plum-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg sm:text-xl text-ink mb-1">
                  Resume Status
                </h3>
                <p className="font-body text-sm sm:text-base text-ink/70">
                  {documents.lastResumeUpdatedAt ? (
                    <>
                      Last updated:{" "}
                      {new Date(
                        documents.lastResumeUpdatedAt,
                      ).toLocaleDateString()}
                    </>
                  ) : (
                    "No resume uploaded yet"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Keyframe Animations */
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
