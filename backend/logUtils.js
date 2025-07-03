const fs = require('fs');
const path = require('path');

const LOG_FILE_PATH = path.join(__dirname, 'logs.json');

function readLogs() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) return [];
    const data = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read logs:', err);
    return [];
  }
}

function writeLog(newLog) {
  const logs = readLogs();
  logs.push(newLog);
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
}

function filterLogs(filters, logs = readLogs()) {
  return logs
    .filter(log => {
      if (filters.level && log.level !== filters.level) return false;
      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) return false;
      if (filters.resourceId && log.resourceId !== filters.resourceId) return false;
      if (filters.timestamp_start && new Date(log.timestamp) < new Date(filters.timestamp_start)) return false;
      if (filters.timestamp_end && new Date(log.timestamp) > new Date(filters.timestamp_end)) return false;
      if (filters.traceId && log.traceId !== filters.traceId) return false;
      if (filters.spanId && log.spanId !== filters.spanId) return false;
      if (filters.commit && log.commit !== filters.commit) return false;
      return true;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

module.exports = { readLogs, writeLog, filterLogs };
