const router = require('express').Router();
const amiddleware = require('../middleware/authMiddleware');
const walletController = require('../app.wallets/walletController')
router.get('/profile',amiddleware,(req, res) => {
    res.send('order');
  });

router.post('/wallet/charge/card/:id', walletController.chargeCard);

  module.exports = router;