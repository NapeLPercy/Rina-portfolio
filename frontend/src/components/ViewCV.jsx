import { useEffect, useState } from "react";
import { FileText, Download, Star, Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import ConfirmModal from "./ui/ConfirmModal";
import ResumeCard from "./ResumeCard";
import { formatDate } from "../utils/dateTime";
import BlockDeleteModal from "./ui/BlockDeleteModal";
import { useAuth } from "../context/AuthContext";
export default function ViewCV() {
  // Mock data - replace with actual API data
  const [resumes, setResumes] = useState([]);

  //action modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  //tracks an index of the currently proccessed item
  const [currentIndex, setCurrentIndex] = useState(null);

  //block delete
  const [showBlockModal, setShowBlockModal] = useState(false);

  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const { user } = useAuth();
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const fetchCVs = async () => {
      try {
        const res = await axios.get(`${BASE_APP_API}/documents`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const { success, message, data } = res.data;

        if (!success) {
          console.error(message);
          return;
        }

        console.log(data, "here is the data");
        if (isMounted) setResumes(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        console.error("Fetch CVs failed:", err);
      }
    };

    fetchCVs();

    return () => {
      isMounted = false;
    };
  }, []);

  //set cv to main
  const handleEdit = async () => {
    setIsLoading(true);
    const resume = resumes.at(currentIndex);
 

    try {
      const res = await axios.patch(
        `${BASE_APP_API}/documents/${resume.id}/main`,{},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const { success, message } = res.data;

      if (!success) {
        alert(message);
        return;
      }

      // update state locally: only one main
      setResumes((prev) =>
        prev.map((r) => ({
          ...r,
          is_main: r.id === resume.id ? 1 : 0,
        })),
      );

      setIsLoading(false);
      setEditModal(false);
      alert(message || "Main CV updated");
    } catch (err) {
      console.error("Set main CV failed:", err);
      alert(err.response?.data?.message || "Failed to update main CV.");
    }
  };

  //remove a resume
  const handleDelete = async () => {
    setIsLoading(true);

    const resume = resumes.at(currentIndex);
    if (resume.is_main) {
      setIsLoading(false);
      setDeleteModal(false);

      setShowBlockModal(true);

      return;
    }
    try {
      const res = await axios.delete(`${BASE_APP_API}/documents/${resume.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { success, message } = res.data;

      if (!success) {
        alert(message);
        return;
      }

      // remove from UI
      setResumes((prev) => prev.filter((r) => r.id !== resume.id));
      setIsLoading(false);
      setDeleteModal(false);
      alert(message || "CV deleted");
    } catch (err) {
      setIsLoading(false);
      console.error("Delete CV failed:", err);
      alert(err.response?.data?.message || "Failed to delete CV.");
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);

    const resume = resumes.at(currentIndex);

    try {
      const res = await axios.get(`${BASE_APP_API}/documents/${resume.id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      const safeTitle = resume.title?.trim()
        ? resume.title.trim()
        : `cv-${resume.id}`;
      a.download = `${safeTitle}`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      setDownloadModal(false);
    } catch (err) {
      console.error("Download CV failed:", err);
      alert(err.response?.data?.message || "Failed to download CV.");
    } finally {
      setIsLoading(false);
    }
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-50 bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-plum-600 animate-spin mx-auto" />
          <p className="font-body text-ink/60">Loading CV's...</p>
        </div>
      </div>
    );
  }

  /*Error state
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
    }*/

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl sm:text-2xl text-ink">
          Your Resumes{" "}
          <span className="text-base sm:text-lg font-body font-normal text-ink/60">
            ({resumes.length})
          </span>
        </h2>
      </div>

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Resume?"
        message="Are you sure you want to delete this resume? This action cannot be undone and the file will be permanently removed."
        icon={Trash2}
        confirmText="Delete"
        confirmColor="red"
        isLoading={isLoading}
      />

      {/* SET AS MAIN CV MODAL */}
      <ConfirmModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        onConfirm={handleEdit}
        title="Set as Main CV?"
        message="This resume will be set as your primary CV and will be displayed first. Your current main CV will be changed."
        icon={Star}
        confirmText="Set as Main"
        confirmColor="green"
        isLoading={isLoading}
      />

      {/* DOWNLOAD MODAL */}
      <ConfirmModal
        isOpen={downloadModal}
        onClose={() => setDownloadModal(false)}
        onConfirm={handleDownload}
        title="Download Resume?"
        message="Your resume will be downloaded to your device. Make sure you have enough storage space."
        icon={Download}
        confirmText="Download"
        confirmColor="plum"
        isLoading={isLoading}
      />
      {/*BLOCK DELETE */}
      <BlockDeleteModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
      />

      {/* Resume List */}
      {resumes.length > 0 || !isLoading ? (
        <div className="space-y-4">
          {resumes.map((resume, index) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={() => {
                setCurrentIndex(index);
                setEditModal(true);
              }}
              onDelete={() => {
                setCurrentIndex(index);
                setDeleteModal(true);
              }}
              onDownload={() => {
                setCurrentIndex(index);
                setDownloadModal(true);
              }}
              formatDate={formatDate}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-12 sm:p-16 text-center">
          <FileText className="w-16 h-16 sm:w-20 sm:h-20 text-ink/20 mx-auto mb-4" />
          <h3 className="font-heading text-xl sm:text-2xl text-ink/60 mb-2">
            No Resumes Yet
          </h3>
          <p className="font-body text-sm sm:text-base text-ink/50">
            Upload your first resume to get started
          </p>
        </div>
      )}
    </div>
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
