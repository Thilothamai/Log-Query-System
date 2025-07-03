import React, { useState } from 'react';
import axios from 'axios';

export default function LogForm({ onLogSubmitted }) {
  const [log, setLog] = useState({
    level: 'info',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    metadata: '{}'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setLog(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formattedLog = {
        ...log,
        metadata: JSON.parse(log.metadata)
      };
      await axios.post('http://localhost:5000/logs', formattedLog);
      alert('Log submitted!');
      setLog({ level: 'info', message: '', resourceId: '', timestamp: '', traceId: '', spanId: '', commit: '', metadata: '{}' });
      onLogSubmitted();
    } catch (err) {
      alert('Failed to submit log. Check console for details.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input name="message" placeholder="Message" value={log.message} onChange={handleChange} required />
      
      <select name="level" value={log.level} onChange={handleChange}>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>

      <input name="resourceId" placeholder="Resource ID" value={log.resourceId} onChange={handleChange} required />

      <input name="timestamp" type="datetime-local" value={log.timestamp} onChange={handleChange} required />

      <input name="traceId" placeholder="Trace ID" value={log.traceId} onChange={handleChange} required />

      <input name="spanId" placeholder="Span ID" value={log.spanId} onChange={handleChange} required />

      <input name="commit" placeholder="Commit" value={log.commit} onChange={handleChange} required />

      <textarea
        name="metadata"
        placeholder='{"key": "value"}'
        value={log.metadata}
        onChange={handleChange}
        required
        rows="4"
        style={{ resize: 'vertical' }}
      />

      <button type="submit" background-color = "#008CBA" >Submit Log</button>
    </form>
  );
}
