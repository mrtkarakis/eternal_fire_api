const express = require('express');
const { HLTV } = require('hltv');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 300 saniye (5 dakika)

const router = express.Router();

// Takım bilgilerini getir
router.get('/', async (req, res) => {

    const cacheKey = 'team';

    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        return res.json(cache.get(cacheKey));
    }

    try {
        const team = await HLTV.getTeam( {id: "11251"});
        cache.set(cacheKey, matches); // Veriyi cache'e kaydet

        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'takım verileri alınamadı.' });
    }
});

// Takım istatistiklerini getir
router.get('/stats', async (req, res) => {
    const cacheKey = 'team_stats';


    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        
        return res.json(cache.get(cacheKey));
    }

    try {
        const stats = await HLTV.getTeamStats( {id: 11251});
        cache.set(cacheKey, stats); // Veriyi cache'e kaydet
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'takım istatistikleri alınamadı.' });
    }
});


module.exports = router;
