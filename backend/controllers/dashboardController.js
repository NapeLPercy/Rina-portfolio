const dashboardModel = require("../models/Dashboard");

async function getDashboard(req, res) {
  try {
    const [totalCVs,
      totalBlogs,
      draftedBlogs,
      publishedBlogs,
      distinctTopics,
      publishedLast7Days,
      publishedLast7DaysCount,
      lastResumeUpdatedAt,
    ] = await Promise.all([dashboardModel.getTotalCVs(),
      dashboardModel.getTotalBlogs(),
      dashboardModel.getDraftedCount(),
      dashboardModel.getPublishedCount(),
      dashboardModel.getDistinctTopicsCount(),
      dashboardModel.getPublishedLast7DaysList(),
      dashboardModel.getPublishedLast7DaysCount(),
      dashboardModel.getLastResumeUpdatedAt(),
    ]);

    return res.json({
      totals: {
        blogs: totalBlogs,
        drafted: draftedBlogs,
        published: publishedBlogs,
        distinctTopics: distinctTopics,
        cvs:totalCVs,
      },
      last7Days: {
        publishedCount: publishedLast7DaysCount,
        publishedList: publishedLast7Days.map((p) => ({
          title: p.title,
          excerpt: p.excerpt,
          publishedAt: p.published_at,
        })),
      },
      documents: {
        lastResumeUpdatedAt: lastResumeUpdatedAt, // null if none uploaded yet
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getDashboard};