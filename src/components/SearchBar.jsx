import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton, Paper, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    experience: "", // initially a string; will be converted to a number on change
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert experience to a number (or keep it as empty string)
    setFilters({
      ...filters,
      [name]: name === "experience" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <Paper elevation={3} sx={{ p: 1, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          name="title"
          label="Job Title"
          variant="outlined"
          size="small"
          value={filters.title}
          onChange={handleInputChange}
          sx={{ flex: 1, minWidth: 120 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          size="small"
          value={filters.location}
          onChange={handleInputChange}
          sx={{ flex: 1, minWidth: 120 }}
        />
        <TextField
          name="experience"
          label="Experience (years)"
          variant="outlined"
          size="small"
          type="number"
          value={filters.experience}
          onChange={handleInputChange}
          sx={{ width: 150 }}
        />
        <IconButton 
          type="submit" 
          color="primary" 
          sx={{ height: '40px', width: '40px' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : <SearchIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default SearchBar;
