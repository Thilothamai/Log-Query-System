import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from './components/filterBar';
import LogList from './components/logList';
import LogAnalytics from './components/logAnalytics'; // ⬅ NEW
import { fetchLogs } from './services/api';

export default function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs(filters).then(setLogs).catch(console.error);
  }, [filters]);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Log Ingestion and Query System</h1>
      <button onClick={() => navigate('/create')} style={{ marginBottom: '1rem' }}>
        ➕ Create New Log
      </button>
      <FilterBar onFilterChange={setFilters} />
      <LogAnalytics logs={logs} /> {/* 📊 Show analytics here */}
      <LogList logs={logs} />
    </div>
  );
}
