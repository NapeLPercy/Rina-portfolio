// EXAMPLE USAGE OF ConfirmModal

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { Trash2, Download, Star, AlertTriangle } from "lucide-react";

export default function ExampleUsage() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [mainCvModal, setMainCvModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DELETE EXAMPLE
  const handleDelete = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("CV Deleted!");
    setIsLoading(false);
    setDeleteModal(false);
  };

  // SET AS MAIN CV EXAMPLE
  const handleSetAsMain = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Set as main CV!");
    setIsLoading(false);
    setMainCvModal(false);
  };

  // DOWNLOAD EXAMPLE
  const handleDownload = async () => {
    setIsLoading(true);
    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Downloading CV...");
    setIsLoading(false);
    setDownloadModal(false);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">ConfirmModal Examples</h1>

      {/* Trigger Buttons */}
      <button
        onClick={() => setDeleteModal(true)}
        className="px-4 py-2 bg-red-600 text-white rounded mr-2"
      >
        Delete CV
      </button>

      <button
        onClick={() => setMainCvModal(true)}
        className="px-4 py-2 bg-green-600 text-white rounded mr-2"
      >
        Set as Main CV
      </button>

      <button
        onClick={() => setDownloadModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download CV
      </button>

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
        isOpen={mainCvModal}
        onClose={() => setMainCvModal(false)}
        onConfirm={handleSetAsMain}
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

      {/* You can also use it for warnings */}
      {/* 
      <ConfirmModal
        isOpen={warningModal}
        onClose={() => setWarningModal(false)}
        onConfirm={handleWarning}
        title="Warning!"
        message="This action requires careful consideration. Please confirm to proceed."
        icon={AlertTriangle}
        confirmText="Proceed"
        confirmColor="rose"
        isLoading={isLoading}
      />
      */}
    </div>
  );
}