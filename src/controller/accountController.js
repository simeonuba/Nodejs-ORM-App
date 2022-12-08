const  {Addfund, RemoveFund}  = require('../app.wallets/walletServices');
const transaction= require('../app.transactions/transactionServices')

exports.alltransactions = async (req, res, next) => {
        const {id} = parseInt(req.params);
        const historydata = await transaction.index(id)
        
        .then(historydata => {
                return res.status(200).json( historydata )
            })
            .catch((err) => {
                return next(err);
            })
              
}
exports.purchase = async (req, res, next) => {




}