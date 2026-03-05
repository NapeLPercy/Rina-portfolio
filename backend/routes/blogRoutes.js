const router = require("express").Router();
const { createBlog, getAllBlogs,deleteBlog,updateBlogStatus,getBlogCover, getSingleBlog } = require("../controllers/blogController");
const { requireAuth,optionalAuth } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new Error("Only PNG/JPG/WEBP allowed"), ok);
  },
});

router.post("/", upload.single("coverImage"),requireAuth, createBlog);
router.get("/",optionalAuth, getAllBlogs);
router.delete("/:id",requireAuth, deleteBlog);
router.patch("/:id/status",requireAuth, updateBlogStatus);
router.get("/:id/cover", getBlogCover);
router.get("/:id", optionalAuth,getSingleBlog);

module.exports = router;

//get an entire blog
//get blogs partial