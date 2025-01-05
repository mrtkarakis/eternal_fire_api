const express = require('express');
const { HLTV, MatchEventType, MatchFilter } = require('hltv');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 300 saniye (5 dakika)

const router = express.Router();


// Belirli bir maçın detaylarını getir
router.get('/all', async (req, res) => {
    const cacheKey = 'matches_all';


    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        return res.json(cache.get(cacheKey));
    }


    try {
        const matchDetails = await HLTV.getMatches({ 
            eventIds: [],
            eventType : MatchEventType.All,
            filter: MatchFilter.LanOnly,
            teamIds: ["10854"] });
        console.log("qe")
        cache.set(cacheKey, matchDetails); // Veriyi cache'e kaydet

        res.json(matchDetails);
    } catch (error) {
        res.status(500).json({ error: 'Maç detayları alınamadı.' });
    }
});


// geçmiş maç istatistik detaylarını getir
router.get('/results', async (req, res) => {
    const playerId = parseInt(req.params.id);
    const cacheKey = 'matches_results';
    if (cache.has(cacheKey)) {
        console.log('Cache kullanılıyor.');
        return res.json(cache.get(cacheKey));
    }

    try {
        const matchResults = await HLTV.getResults({ teamIds: [11251] });
        cache.set(cacheKey, matchResults); // Veriyi cache'e kaydet

        res.json(matchResults);
    } catch (error) {
        res.status(500).json({ error: 'geçmiş maç istatistikleri alınamadı.' });
    }
});
module.exports = router;
