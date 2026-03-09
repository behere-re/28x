const express = require('express');
const cors = require('cors');

const nowRouter = require('./routes/now');
const convertRouter = require('./routes/convert');
const seasonRouter = require('./routes/season');
const afnCoordinateRouter = require('./routes/afnCoordinate');
const healthRouter = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: '28x Time API',
    version: '0.1',
    description: 'The official time service for the 28x temporal standard',
    epoch: '2026-03-20T00:00:00.000Z',
    endpoints: {
      'GET /now': 'Current moment in 28x time',
      'GET /convert': 'Convert between Gregorian and 28x',
      'GET /season': 'Season information for a 28x year',
      'GET /afn-coordinate': '28x coordinate for AFN minting',
      'GET /health': 'Health check',
    },
    standard: 'https://28x.org/standard',
    afnStandard: 'https://28x.org/afn',
  });
});

app.use('/now', nowRouter);
app.use('/convert', convertRouter);
app.use('/season', seasonRouter);
app.use('/afn-coordinate', afnCoordinateRouter);
app.use('/health', healthRouter);

app.use((req, res) => {
  res.status(404).json({
    error: `Not found: ${req.method} ${req.path}`,
    code: 'NOT_FOUND',
  });
});

app.listen(PORT, () => {
  console.log(`28x Time API running on port ${PORT}`);
});

module.exports = app;
