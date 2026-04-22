const express = require('express');
const Seva = require('../models/Seva');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sevas = await Seva.find({ available: true }).sort({ price: 1 });
    res.json({ success: true, sevas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/seed', protect, adminOnly, async (req, res) => {
  try {
    const defaultSevas = [
      { name: "Rahu Ketu Pooja", teluguName: "రాహు కేతు పూజ", description: "Special pooja for Rahu and Ketu dosha nivarana.", price: 1116, icon: "🐍" },
      { name: "Abhishekam", teluguName: "అభిషేకం", description: "Sacred bathing ceremony of the Vayu Lingam.", price: 500, icon: "🪔" },
      { name: "Kalyanotsavam", teluguName: "కళ్యాణోత్సవం", description: "Celestial wedding of Lord Shiva and Goddess Parvati.", price: 2500, icon: "💍" },
      { name: "Sahasra Deepotsavam", teluguName: "సహస్ర దీపోత్సవం", description: "Festival of thousand lamps.", price: 1000, icon: "✨" },
      { name: "Annadanam", teluguName: "అన్నదానం", description: "Offering of food to devotees.", price: 5000, icon: "🍚" },
      { name: "Rudrabhishekam", teluguName: "రుద్రాభిషేకం", description: "Special Abhishekam with Rudra Mantras.", price: 750, icon: "🕉️" }
    ];
    
    await Seva.deleteMany();
    await Seva.insertMany(defaultSevas);
    res.json({ success: true, message: 'Sevas seeded successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
