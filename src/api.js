import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all jobs from the backend
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

// Search jobs by title in the backend
export const searchJobs = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-jobs`, {
      params: { title }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
};
