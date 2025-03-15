import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import JobCard from "./JobCard";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Store jobs
  const [page, setPage] = useState(1); // Track page number
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // Fetch jobs function
  const fetchJobs = useCallback(async () => {
    if (!hasMore) return; // Stop if no more jobs

    setLoading(true);
    try {
      const res = await axios.get(`https://jobvisstabackend.onrender.com/api/jobs?page=${page}&limit=10`);
      setJobs((prev) => [...prev, ...res.data.jobs]); // Append new jobs
      setHasMore(res.data.jobs.length > 0); // Check if more jobs exist
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  }, [page, hasMore]);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  // Infinite Scroll: Detect last job
  const lastJobRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Grid container spacing={2}>
      {jobs.length === 0 && !loading && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No jobs found.
        </Typography>
      )}
      
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={job._id || job.id} ref={index === jobs.length - 1 ? lastJobRef : null}>
          <JobCard job={job} />
        </Grid>
      ))}

      {loading && (
        <Box display="flex" justifyContent="center" width="100%" sx={{ mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Grid>
  );
};

export default JobList;
