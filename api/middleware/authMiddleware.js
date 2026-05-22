import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "dev_secret_key";

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    const message = err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token";
    res.status(401).json({ error: message });
  }
};

export default authMiddleware;
