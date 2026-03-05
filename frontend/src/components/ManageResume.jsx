import { useState } from "react";
import { FileText, Plus, Eye } from "lucide-react";
import AddCV from "./AddCV";
import ViewCV from "./ViewCV";

export default function ManageResume() {
  const [activeTab, setActiveTab] = useState("add"); // "add" or "view"

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20">
      {/* Decorative background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-plum-500 to-rose-500 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ink">
              Manage{" "}
              <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
                Resume/CV
              </span>
            </h1>
          </div>
          <p className="font-body text-ink/60 text-base sm:text-lg ml-14">
            Upload, view, and manage your resume documents
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 sm:mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab("add")}
            className={`relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === "add"
                ? "text-white bg-gradient-to-r from-plum-600 to-plum-700 shadow-md"
                : "text-ink/60 hover:text-ink hover:bg-plum-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add CV</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("view")}
            className={`relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-body text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === "view"
                ? "text-white bg-gradient-to-r from-rose-600 to-rose-700 shadow-md"
                : "text-ink/60 hover:text-ink hover:bg-rose-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View CVs</span>
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-[fadeIn_0.4s_ease-out]">
          {activeTab === "add" ? <AddCV /> : <ViewCV />}
        </div>
      </div>

      {/* Keyframe Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}