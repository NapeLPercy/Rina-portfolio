import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Tag,
  FileEdit,
} from "lucide-react";

export default function AddBlog() {
  const { user } = useAuth();
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const [formData, setFormData] = useState({
    topic: "",
    title: "",
    excerpt: "",
    content: "",
    status: "",
    coverImage: null,
  });
  const [coverImageName, setCoverImageName] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const topicOptions = [
  { value: "", label: "Select a topic..." },
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business" },
  { value: "beauty", label: "Beauty" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "productivity", label: "Productivity" },
  { value: "self-development", label: "Self Development" },
  { value: "career", label: "Career" },
  { value: "finance", label: "Finance" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "relationships", label: "Relationships" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "personal-stories", label: "Personal Stories" },
];

  const statusOptions = [
    { value: "", label: "Select status..." },
    { value: "DRAFTED", label: "Draft" },
    { value: "PUBLISHED", label: "Publish" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, coverImage: file });
      setCoverImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.topic ||
      !formData.title.trim() ||
      !formData.status ||
      !formData.content.trim() ||
      !formData.excerpt.trim() ||
      !formData.coverImage
    ) {
      setStatus("error");
      setMessage("Please fill required fields");
      return;
    }

    console.log("This is the data", formData);
    setStatus("loading");
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) submitData.append(key, formData[key]);
      });

      const response = await fetch(`${BASE_APP_API}/blogs/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to create blog");

      sessionStorage.removeItem("blogs");

      setStatus("success");
      setMessage("Blog created successfully!");
      setTimeout(() => {
        setFormData({
          topic: "",
          title: "",
          excerpt: "",
          content: "",
          status: "",
          coverImage: null,
        });
        setCoverImageName("");
        setStatus("idle");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 max-w-5xl">
      <h2 className="font-heading text-2xl sm:text-3xl text-ink flex items-center gap-2 mb-6">
        <FileEdit className="w-6 h-6 text-plum-600" />
        Create New Blog Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-ink/80 flex items-center gap-2">
              <Tag className="w-4 h-4 text-plum-600" />
              Topic <span className="text-rose-600">*</span>
            </label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm text-ink focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
            >
              {topicOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-ink/80 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-600" />
              Status <span className="text-rose-600">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-rose-200/60 bg-rose-50/30 font-body text-sm text-ink focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-ink/80">
            Title <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter blog title..."
            className="w-full px-4 py-3 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-ink/80">
            Excerpt<span className="text-rose-600">*</span>
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows="3"
            placeholder="Brief summary..."
            className="w-full px-4 py-3 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-ink/80">
            Content<span className="text-rose-600">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="10"
            placeholder="Write your blog..."
            className="w-full px-4 py-3 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-ink/80 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-rose-600" />
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="cover-upload"
            className="hidden"
          />
          <label
            htmlFor="cover-upload"
            className="group flex items-center justify-center gap-3 w-full px-6 py-8 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/30 hover:border-rose-400 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg">
                <ImageIcon className="w-7 h-7" />
              </div>
              <p className="font-body text-sm font-semibold text-ink mt-2">
                {coverImageName || "Click to upload"}
              </p>
            </div>
          </label>
        </div>

        {status === "error" && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border-2 border-rose-200">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <p className="font-body text-sm text-rose-700">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border-2 border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-body text-sm text-green-700">{message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 relative overflow-hidden group"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative flex items-center justify-center gap-2">
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Publish Blog
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
