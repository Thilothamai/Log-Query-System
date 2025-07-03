import React from 'react';

const getColor = level => {
  switch (level) {
    case 'error': return '#ffcccc';
    case 'warn': return '#fff5cc';
    case 'info': return '#cce5ff';
    case 'debug': return '#e6e6e6';
    default: return 'white';
  }
};

export default function LogList({ logs }) {
  if (logs.length === 0) return <p>No logs found.</p>;

  return (
    <div style={{ borderTop: '1px solid #ccc' }}>
      {logs.map((log, index) => (
        <div key={index} style={{ background: getColor(log.level), padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <strong>{log.level.toUpperCase()}</strong> - {log.timestamp}
          <div><strong>Resource:</strong> {log.resourceId}</div>
          <div><strong>Message:</strong> {log.message}</div>
          <div><strong>TraceId:</strong> {log.traceId} | <strong>SpanId:</strong> {log.spanId} | <strong>Commit:</strong> {log.commit}</div>
          <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
