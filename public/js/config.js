const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "https://blogspace-api-dy5p.onrender.com/api";

export default API_BASE_URL;
