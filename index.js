const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const app = express();
const PORT = 3000;
const teamId = "11251";

// Middleware
app.use(bodyParser.json());

const cache = new NodeCache({ stdTTL: 300 }); // 300 saniye (5 dakika)

// Route'lar
const matchRoutes = require('./routes/matches');
const teamRoutes = require('./routes/team');
const playerRoutes = require('./routes/player');
app.use('/api/matches', matchRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/player', playerRoutes);

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
