

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import SearchBar from './SearchBar';
import JobList from './JobList';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all jobs from the backend
  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://jobvisstabackend.onrender.com/api/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all jobs on mount
  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Handle search with filters
  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      // If no filters provided, fetch all jobs
      if (!filters.title && !filters.location && !filters.experience) {
        await fetchAllJobs();
      } else {
        const res = await axios.get('http://localhost:5000/api/search-jobs', {
          params: filters,
        });
        setJobs(res.data);
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
     <Typography
  variant="h3"
  align="center"
  gutterBottom
  sx={{
    color: '#2c3e50',             // Deep blue-gray color for a professional look
    fontWeight: 'bold',
    mb: 3,
    fontFamily: "'Roboto Slab', serif",  // A stylish serif font
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  }}
>
  Job Vista
</Typography>

      <SearchBar onSearch={handleSearch} loading={loading} />
      {loading ? (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{ mt: 4, minHeight: '300px', width: '100%' }} 
        >
          <CircularProgress />
        </Box>
      ) : (
        <JobList jobs={jobs} />
      )}
    </Container>
  );
};

export default Home;
