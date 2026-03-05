import { useState } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function AddCV() {
  const [formData, setFormData] = useState({
    description: "",
    file: null,
  });
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const { user } = useAuth();

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setFormData({ ...formData, file });
        setFileName(file.name);
        if (status === "error") setStatus("idle");
      } else {
        setStatus("error");
        setMessage("Please upload a PDF file only");
        setFileName("");
        setFormData({ ...formData, file: null });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.description.trim()) {
      setStatus("error");
      setMessage("Please enter a description");
      return;
    }

    if (!formData.file) {
      setStatus("error");
      setMessage("Please upload a PDF file");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Simulate API call
      const data = new FormData();
      data.append("description", formData.description);
      data.append("file", formData.file);
      data.append("title", fileName);

      const response = await axios.post(`${BASE_APP_API}/documents`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const { success, message } = response.data;

      setStatus("success");
      setMessage("Resume uploaded successfully!");

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ description: "", file: null });
        setFileName("");
        setStatus("idle");
        setMessage("");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setMessage("Failed to upload resume. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 max-w-3xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl text-ink flex items-center gap-2">
            <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-plum-600" />
            Upload New Resume
          </h2>
          <p className="font-body text-sm sm:text-base text-ink/60">
            Add a description and upload your PDF resume
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Description Input */}
          <div className="space-y-2">
            <label className="font-body text-sm sm:text-base font-medium text-ink/80">
              Description <span className="text-rose-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="e.g., Software Developer Resume 2024, Marketing Manager CV..."
              rows="4"
              disabled={status === "loading"}
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-sm sm:text-base text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="font-body text-sm sm:text-base font-medium text-ink/80">
              PDF Resume <span className="text-rose-600">*</span>
            </label>

            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={status === "loading"}
                className="hidden"
                id="resume-upload"
              />

              <label
                htmlFor="resume-upload"
                className={`group flex items-center justify-center gap-3 w-full px-6 py-8 sm:py-10 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                  fileName
                    ? "border-plum-400 bg-plum-50"
                    : "border-plum-200 bg-plum-50/30 hover:border-plum-400 hover:bg-plum-50"
                } ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-plum-500 to-plum-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {fileName ? (
                      <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
                    ) : (
                      <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
                    )}
                  </div>

                  <div>
                    <p className="font-body text-sm sm:text-base font-semibold text-ink">
                      {fileName || "Click to upload PDF"}
                    </p>
                    {!fileName && (
                      <p className="font-body text-xs sm:text-sm text-ink/60 mt-1">
                        or drag and drop your file here
                      </p>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Status Messages */}
          {status === "error" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border-2 border-rose-200 animate-[shake_0.5s_ease-in-out]">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-rose-700">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border-2 border-green-200 animate-[fadeSlideIn_0.4s_ease-out]">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-green-700">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 sm:py-5 rounded-xl font-body text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2">
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Submit Resume
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
