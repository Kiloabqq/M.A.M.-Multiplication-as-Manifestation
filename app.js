const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const multiplyRoute = require('./routes/multiply');
const debugRoute = require('./routes/debug');
const interpretRoute = require('./routes/interpret');
const chainRoute = require('./routes/chain');

app.use('/mam/chain', chainRoute);
app.use('/mam/interpret', interpretRoute);
app.use('/mam/multiply', multiplyRoute);
app.use('/mam/debug', debugRoute);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Optional: redirect root to simulator
app.get('/', (req, res) => res.redirect('/simulator.html'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 M.A.M. API live on port ${PORT}`);
});


