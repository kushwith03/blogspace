// Detect if running locally or in production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://your-backend-on-render.com/api'; // Replace with your actual Render URL

export default API_BASE_URL;
