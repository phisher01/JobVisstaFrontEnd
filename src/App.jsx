import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Nav';
import Home from './components/Home';
import JobDetail from './components/JobDetail'; // Import JobDetail component

function App() {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)', minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <Box sx={{ mt: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} /> {/* Route for JobDetail */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
