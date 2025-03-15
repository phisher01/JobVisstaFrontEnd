import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const JobCard = ({ job }) => {
  return (
    <Card variant="outlined" sx={{ margin: 2, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginY: 1 }}>
          {job.location} {job.experience ? `| ${job.experience}` : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" href={job.link} target="_blank">
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
