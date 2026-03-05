import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Trash2, Edit, Eye, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import slugify from "../utils/textFormater";
import ConfirmModal from "./ui/ConfirmModal";
import BlogCard from "./ui/AdminBlogCard";

export default function ViewBlogs() {
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  
  // Modal states
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let blogPosts = sessionStorage.getItem("blogs");
    if (blogPosts) {
      blogPosts = JSON.parse(blogPosts);
      setBlogs(blogPosts);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function fetchBlogs() {
      try {
        setLoading(true);
        setErrMsg("");

        const res = await axios.get(`${BASE_APP_API}/blogs`, {
          headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {},
        });

        const posts = res.data?.posts || [];
        if (mounted) {
          setBlogs(posts);
          sessionStorage.setItem("blogs", JSON.stringify(posts));
        }
      } catch (err) {
        console.error("Fetch blogs error:", err);
        if (mounted)
          setErrMsg(err.response?.data?.message || "Failed to load blogs.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, [BASE_APP_API, user?.token]);

  // Handle Delete
  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setDeleteModal(true);
  };


const confirmDelete = async () => {
  if (!selectedBlog) return;

  try {
    setActionLoading(true);

    const response = await axios.delete(
      `${BASE_APP_API}/blogs/${selectedBlog.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`, // admin protected
        },
      }
    );

    const { success, message } = response.data;

    if (!success) {
      throw new Error(message || "Failed to delete blog");
    }

    // Update state safely using functional update
    setBlogs((prev) => {
      const updated = prev.filter((b) => b.id !== selectedBlog.id);
      sessionStorage.setItem("blogs", JSON.stringify(updated));
      return updated;
    });

    setDeleteModal(false);
    setSelectedBlog(null);
  } catch (error) {
    console.error("Delete blog error:", error);
    alert(error.response?.data?.message || error.message || "Delete failed");
  } finally {
    setActionLoading(false);
  }
};

  // Handle Status Change (Draft <-> Published)
  const handleStatusClick = (blog) => {
    setSelectedBlog(blog);
    setStatusModal(true);
  };

 const confirmStatusChange = async () => {
  if (!selectedBlog) return;

  try {
    setActionLoading(true);

    const newStatus =
      selectedBlog.status === "PUBLISHED" ? "DRAFTED" : "PUBLISHED";

    const response = await axios.patch(
      `${BASE_APP_API}/blogs/${selectedBlog.id}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const { success, message } = response.data;

    if (!success) {
      throw new Error(message || "Failed to update status");
    }

    // Update state safely
    setBlogs((prev) => {
      const updated = prev.map((b) =>
        b.id === selectedBlog.id ? { ...b, status: newStatus } : b
      );
      sessionStorage.setItem("blogs", JSON.stringify(updated));
      return updated;
    });

    setStatusModal(false);
    setSelectedBlog(null);
  } catch (error) {
    console.error("Status change error:", error);
    alert(
      error.response?.data?.message ||
        error.message ||
        "Status update failed"
    );
  } finally {
    setActionLoading(false);
  }
};
  const getStatusColor = (status) => {
    return status === "PUBLISHED" 
      ? "bg-green-100 text-green-700 border-green-200" 
      : "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-12 sm:p-16 text-center">
        <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-plum-600 animate-spin mx-auto mb-4" />
        <p className="font-body text-sm sm:text-base text-ink/60">Loading blogs...</p>
      </div>
    );
  }

  // Error state
  if (errMsg) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-12 sm:p-16 text-center">
        <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-rose-600 mx-auto mb-4" />
        <h3 className="font-heading text-xl sm:text-2xl text-ink mb-2">Error Loading Blogs</h3>
        <p className="font-body text-sm sm:text-base text-rose-600">{errMsg}</p>
      </div>
    );
  }

  // Empty state
  if (!blogs.length) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-12 sm:p-16 text-center">
        <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-ink/20 mx-auto mb-4" />
        <h3 className="font-heading text-xl sm:text-2xl text-ink/60 mb-2">
          No Blogs Yet
        </h3>
        <p className="font-body text-sm sm:text-base text-ink/50">
          Create your first blog post to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl sm:text-2xl text-ink">
            Your Blogs{" "}
            <span className="text-base sm:text-lg font-body font-normal text-ink/60">
              ({blogs.length})
            </span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
              onDelete={handleDeleteClick}
              onStatusChange={handleStatusClick}
              onRead={() => navigate(`/blog-post/${blog.id}/${slugify(blog.title)}`)}
              getStatusColor={getStatusColor}
              BASE_APP_API={BASE_APP_API}
            />
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedBlog(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Blog Post?"
        message={`Are you sure you want to delete "${selectedBlog?.title}"? This action cannot be undone.`}
        icon={Trash2}
        confirmText="Delete"
        confirmColor="red"
        isLoading={actionLoading}
      />

      {/* Status Change Confirmation Modal */}
      <ConfirmModal
        isOpen={statusModal}
        onClose={() => {
          setStatusModal(false);
          setSelectedBlog(null);
        }}
        onConfirm={confirmStatusChange}
        title={selectedBlog?.status === "PUBLISHED" ? "Draft This Post?" : "Publish This Post?"}
        message={
          selectedBlog?.status === "PUBLISHED"
            ? `"${selectedBlog?.title}" will be moved to drafts and hidden from public view.`
            : `"${selectedBlog?.title}" will be published and visible to everyone.`
        }
        icon={Edit}
        confirmText={selectedBlog?.status === "PUBLISHED" ? "Move to Draft" : "Publish"}
        confirmColor={selectedBlog?.status === "PUBLISHED" ? "rose" : "green"}
        isLoading={actionLoading}
      />
    </>
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