import React, { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
      <input type="text" name="message" placeholder="Search message..." onChange={handleChange} />
      <select name="level" onChange={handleChange} defaultValue="">
        <option value="">All Levels</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
      <input type="text" name="resourceId" placeholder="Resource ID" onChange={handleChange} />
      <input type="datetime-local" onChange={e => handleDateChange('timestamp_start', e.target.value)} />
      <input type="datetime-local" onChange={e => handleDateChange('timestamp_end', e.target.value)} />
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}
