const express = require('express');
const { HLTV } = require('hltv');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 300 saniye (5 dakika)

const router = express.Router();

// Belirli bir oyuncunun detaylarını getir
router.get('/:id', async (req, res) => {
    const playerId = parseInt(req.params.id);
    const cacheKey = 'player_${playerId}';

    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        return res.json(cache.get(cacheKey));
    }

    try {
        const playerDetails = await HLTV.getPlayer({ id: playerId });
        cache.set(cacheKey, playerDetails); // Veriyi cache'e kaydet
        res.json(playerDetails);
    } catch (error) {
        res.status(500).json({ error: 'oyuncu detayları alınamadı.' });
    }
});

// Belirli bir oyuncunun istatistik detaylarını getir
router.get('/:id/stats', async (req, res) => {
    const playerId = parseInt(req.params.id);
    const cacheKey = 'player_${playerId}_stats';


    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        return res.json(cache.get(cacheKey));
    }

    try {
        const playerStats = await HLTV.getPlayerStats({ id: playerId });
        cache.set(cacheKey, playerStats); // Veriyi cache'e kaydet
        res.json(playerStats);
    } catch (error) {
        res.status(500).json({ error: 'oyuncu istatistikleri alınamadı.' });
    }
});



module.exports = router;
