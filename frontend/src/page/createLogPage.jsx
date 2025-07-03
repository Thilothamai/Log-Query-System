import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogForm from '../components/logForm';

export default function CreateLogPage() {
  const navigate = useNavigate();

  const handleBack = () => navigate('/');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create New Log</h1>
      <div style={{
        background: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 8px rgba(0,0,0,0.1)'
      }}>
        <LogForm onLogSubmitted={handleBack} />
      </div>
      <button onClick={handleBack} style={{ marginTop: '1rem' }}>
        ← Back to Logs
      </button>
    </div>
  );
}
