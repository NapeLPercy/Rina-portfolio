const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, username, role }
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}


function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(); //public request continues
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g. { userId, role, ... }
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
    // OR if you want to allow public even with bad token, do: return next();
  }
}

module.exports = { requireAuth,optionalAuth };