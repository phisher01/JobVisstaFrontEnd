import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // Use job._id if available, otherwise try job.id
  const jobId = job._id || job.id;
  
  return (
    <Card variant="outlined" sx={{ m: 2, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
          {job.location} {job.experience ? `| ${job.experience} years` : ''}
        </Typography>
      </CardContent>
      <CardActions>
        {/* ✅ Fixed the route to match the correct path */}
        <Button 
          size="small" 
          variant="outlined" 
          component={Link} 
          to={`/jobs/${jobId}`}  // 🔥 Fixed: "jobs" instead of "job"
        >
          View Details
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          href={job.link} 
          target="_blank"
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
