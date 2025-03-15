// import "./App.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from './components/Nav';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    if (!filters.title && !filters.location && !filters.experience) {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      const res = await axios.get('http://localhost:5000/api/search-jobs', {
        params: filters,
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ 
        background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)', 
        minHeight: '100vh', 
        py: 4,
        width: '100%'
      }}
    >
      <Navbar />
      {/* Remove maxWidth constraint for full width */}
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ color: '#102a43', fontWeight: 'bold', mb: 3 }}
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
    </Box>
  );
}

export default App;
