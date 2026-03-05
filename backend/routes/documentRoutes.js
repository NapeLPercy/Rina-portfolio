const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  addDocument,
  getAllCVs,
  deleteCV,
  setMainCV,
  getDocument,
  downloadMainCV,
} = require("../controllers/documentController");
const { requireAuth } = require("../middleware/auth"); 

router.post("/", upload.single("file"), requireAuth,addDocument);
router.get("/", requireAuth,getAllCVs);
router.get("/:id",requireAuth,getDocument);
router.delete("/:id", requireAuth, deleteCV);
router.patch("/:id/main",requireAuth, setMainCV);

// download main CV
router.get("/main/download", downloadMainCV);

module.exports = router;
