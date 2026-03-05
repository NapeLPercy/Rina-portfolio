const { randomUUID } = require("crypto");
const documentModel = require("../models/Document");

// POST /api/documents
async function addDocument(req, res) {
  try {
    const { description, title } = req.body;
    const file = req.file;

    if (!file || !description) {
      return res.status(400).json({
        success: false,
        message: "Pdf file and description are required",
      });
    }

    const id = randomUUID();

    const result = await documentModel.addDocument({
      id,
      file,
      description,
      title,
    });

    return res
      .status(201)
      .json({ success: true, message: "Document added", ...result });
  } catch (err) {
    console.error("addDocument error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// GET /documents  -> fetch list of CVs (metadata)
async function getAllCVs(req, res) {
  try {
    const docs = await documentModel.getAllCVs();

    return res.json({
      success: true,
      message: "Documents fetched successfully",
      data: docs,
    });
  } catch (error) {
    console.error("getAllDocuments error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
    });
  }
}
// GET /api/documents/:id  -> downloads pdf
async function getDocument(req, res) {
  try {
    const { id } = req.params;

    const doc = await documentModel.getDocumentById(id);

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    if (!doc.resume) {
      return res
        .status(404)
        .json({ success: false, message: "No PDF stored for this document" });
    }

    // MySQL BLOB with mysql2 usually returns Buffer already
    const pdfBuffer = Buffer.isBuffer(doc.resume)
      ? doc.resume
      : Buffer.from(doc.resume); // safest fallback

    const fileName = doc.title?.trim() ? doc.title.trim() : `cv-${doc.id}`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", pdfBuffer.length);

    return res.send(pdfBuffer);
  } catch (err) {
    console.error("getDocument error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// DELETE /documents/:id  -> delete one CV
async function deleteCV(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Document id is required",
      });
    }

    const deleted = await documentModel.deleteCVById(id);

    console.log("In the controller: ", deleted);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Document not deleted",
      });
    }

    return res.json({
      success: true,
      message: "Document deleted successfully",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("deleteDocument error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete document",
    });
  }
}

//PATCH /documents/:id/main  -> set a CV as "main"
async function setMainCV(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Document id id required",
      });
    }

    const updated = await documentModel.setMainCV(id);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Document not set not main",
      });
    }

    return res.json({
      success: true,
      message: "Main CV updated successfully",
      data: updated, // e.g. { id, is_main: true }
    });
  } catch (error) {
    console.error("setMainDocument error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to set main CV",
    });
  }
}


// GET /api/documents/main/download
async function downloadMainCV(req, res) {
  try {
    const doc = await documentModel.getMainCV();

    if (!doc || !doc.resume) {
      return res.status(404).json({
        success: false,
        message: "Main CV not found",
        data: null,
      });
    }

    // mysql2 should return Buffer for BLOB
    const pdfBuffer = Buffer.isBuffer(doc.resume)
      ? doc.resume
      : Buffer.from(doc.resume);

    const fileName = doc.title?.trim(); // ? doc.title.trim() : "cv.pdf";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", pdfBuffer.length);

    return res.send(pdfBuffer);
  } catch (err) {
    console.error("downloadMainCV error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
}

module.exports = {
  addDocument,
  getAllCVs,
  getDocument,
  deleteCV,
  setMainCV,
  downloadMainCV,
};
