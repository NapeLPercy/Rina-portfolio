const { randomUUID } = require("crypto");
const blogModel = require("../models/Blog");

async function createBlog(req, res) {
  try {
    const { title, topic, excerpt, content, status } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "title and content are required" });
    }

    const id = randomUUID();
    const authorId = "0df6868e-1f74-4f74-a16f-8802b28d8aa1"; // later: req.user.userId

    const normalizedStatus = (status || "DRAFT").toUpperCase();
    const publishedAt = normalizedStatus === "PUBLISHED" ? new Date() : null;

    //cover image bytes (BLOB) from multer
    const coverImage = req.file ? req.file.buffer : null;

    const result = await blogModel.createBlog({
      id,
      authorId,
      title: title.trim(),
      topic: topic || null,
      excerpt: excerpt || null,
      content,
      coverImage,
      status: normalizedStatus,
      publishedAt,
    });

    return res
      .status(201)
      .json({ success: true, message: "Blog created", data: result });
  } catch (err) {
    console.error("createBlog error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
}

// GET /api/blogs
async function getAllBlogs(req, res) {
  try {
    const role = req.user?.role; // set by your JWT middleware
    const isAdmin = role === "ADMIN";

    const posts = await blogModel.getBlogsList({ includeDrafts: isAdmin });

    // add coverImageUrl (presentation layer)
    const data = posts.map((p) => ({
      ...p,
      coverImageUrl: p.hasCover ? `/blogs/${p.id}/cover` : null,
    }));

    return res.json({
      success: true,
      count: data.length,
      posts: data,
      meta: { scope: isAdmin ? "admin" : "public" },
    });
  } catch (err) {
    console.error("getAllBlogs error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// DELETE /blogs/:id
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog id" });
    }

    const deleted = await blogModel.deleteBlogById(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.json({
      success: true,
      message: "Blog deleted successfully",
      data: { id },
    });
  } catch (err) {
    console.error("deleteBlog error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// PATCH /blogs/:id/status
async function updateBlogStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["DRAFTED", "PUBLISHED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowed.join(", ")}`,
      });
    }

    const updated = await blogModel.updateBlogStatus(id, status);

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.json({
      success: true,
      message: "Blog status updated successfully",
      data: { id, status },
    });
  } catch (err) {
    console.error("updateBlogStatus error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

//used to fetch a single image
async function getBlogCover(req, res) {
  try {
    const { id } = req.params;

    const blog = await blogModel.getCoverById(id);

    if (!blog || !blog.cover_image) {
      return res.status(404).end();
    }

    res.setHeader("Content-Type", "image/jpeg"); // or dynamic
    return res.send(blog.cover_image);
  } catch (err) {
    console.error("getBlogCover error:", err);
    return res.status(500).end();
  }
}

//get a single blog
async function getSingleBlog(req, res) {
  try {
    const { id } = req.params;
    const role = req.user?.role;

    const blog = await blogModel.getBlogById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // If this is public route, block drafts
    if (blog.status !== "PUBLISHED" && role != "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Blog not published",
      });
    }

    return res.json({
      success: true,
      data: {
        ...blog,
        coverImageUrl: blog.has_cover ? `/blogs/${blog.id}/cover` : null,
      },
    });
  } catch (err) {
    console.error("getSingleBlog error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlogStatus,
  getBlogCover,
  getSingleBlog,
};
