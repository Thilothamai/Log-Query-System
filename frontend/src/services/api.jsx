import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchLogs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API_BASE}/logs?${params}`);
  return res.data;
};
