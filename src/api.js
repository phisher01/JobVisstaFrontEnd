import axios from 'axios';

const API_BASE_URL = 'https://jobvisstabackend.onrender.com/api';

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

// Search jobs using provided filters (e.g., title, location, experience)
export const searchJobs = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-jobs`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
};
