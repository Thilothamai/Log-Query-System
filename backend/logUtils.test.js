const { filterLogs } = require('./logUtils.js');

const sampleLogs = [
  {
    level: 'error',
    message: 'Database connection failed',
    resourceId: 'server-1',
    timestamp: '2025-07-03T10:00:00Z',
    traceId: 'trace-1',
    spanId: 'span-1',
    commit: 'abc123',
    metadata: {}
  },
  {
    level: 'info',
    message: 'Startup complete',
    resourceId: 'server-2',
    timestamp: '2025-07-03T11:00:00Z',
    traceId: 'trace-2',
    spanId: 'span-2',
    commit: 'def456',
    metadata: {}
  }
];

describe('filterLogs()', () => {
  test('returns all logs when no filters are applied', () => {
    const result = filterLogs({}, sampleLogs);
    expect(result.length).toBe(2);
  });

  test('filters by level', () => {
    const result = filterLogs({ level: 'error' }, sampleLogs);
    expect(result.length).toBe(1);
    expect(result[0].level).toBe('error');
  });

  test('filters by resourceId', () => {
    const result = filterLogs({ resourceId: 'server-2' }, sampleLogs);
    expect(result.length).toBe(1);
    expect(result[0].resourceId).toBe('server-2');
  });

  test('filters by full-text search', () => {
    const result = filterLogs({ message: 'database' }, sampleLogs);
    expect(result.length).toBe(1);
    expect(result[0].message.toLowerCase()).toContain('database');
  });

  test('filters by timestamp range', () => {
    const result = filterLogs(
      {
        timestamp_start: '2025-07-03T10:30:00Z',
        timestamp_end: '2025-07-05T12:00:00Z'
      },
      sampleLogs
    );
    expect(result.length).toBe(1);
    expect(result[0].timestamp).toBe('2025-07-03T11:00:00Z');
  });
});
