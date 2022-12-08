const router = require('express').Router();
const Auth = require('../controller/auth');
const Users = require('../controller/users')
const Wallet = require('../app.wallets/walletController');
const  account = require('../app.accounts/accountController')
const  transaction = require('../app.transactions/transactionController')

router.post('/register',Auth.register);
router.post('/login',Auth.login);
router.post('/forgotpassword',Auth.forgotPassword);
router.post('/setpassword/:token',Auth.setNewPassword);
router.get('/users',Users.getAllUsers);
router.post('/ty/:id', Users.updateUser);
router.post('/verify/:id', Auth.verfication);
router.post('/wallet/:id/', Wallet.wallet);
router.post('/wallet/account_number/:id', Wallet.createVirtualAccount);


router.post('/wallet/:id/charge', Wallet.chargeWallet);
router.get('/user/:id/transactions', transaction.alltransactions);
module.exports = router;

