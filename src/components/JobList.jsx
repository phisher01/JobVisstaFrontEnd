
import React from 'react';
import { Grid, Typography } from '@mui/material';
import JobCard from './JobCard';

const JobList = ({ jobs = [] }) => {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        No jobs found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
