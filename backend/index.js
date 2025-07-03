import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { readLogs, writeLog, filterLogs } from './logUtils.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/logs', (req, res) => {
  const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
  const log = req.body;

  if (!requiredFields.every(field => field in log)) {
    return res.status(400).json({ error: 'Missing required log fields' });
  }

  try {
    writeLog(log);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save log' });
  }
});

app.get('/logs', (req, res) => {
  try {
    const filteredLogs = filterLogs(req.query);
    res.json(filteredLogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
