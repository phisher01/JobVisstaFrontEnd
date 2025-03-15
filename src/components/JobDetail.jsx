import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const JobDetail = () => {
  const { jobId } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`https://jobvisstabackend.onrender.com/api/jobs/${jobId}`);
        setJob(res.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Job not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        {job.title}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {job.company}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Location: {job.location}
      </Typography>
      <Typography variant="body1">
        Experience Required: {job.experience ? `${job.experience} years` : 'Not specified'}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {job.description}
      </Typography>
    </Container>
  );
};

export default JobDetail;
