const express = require('express');
const app = express();
const multiplyRoute = require('./routes/multiply');

app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/mam/multiply', multiplyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`M.A.M. API running on ${PORT}`));