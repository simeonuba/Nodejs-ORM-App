const  walletServices  = require('./walletServices');
const transaction= require('../app.transactions/transactionServices');

const userCardCharge =  async ( data)=>{
        let payload = await walletServices.cardData(data);
        console.log(payload);
        return await walletServices.chargeCard(payload);
         
}
exports.createVirtualAccount = async (req, res, next)=>{
     const {id} = req.params;
      const data = {};
       data.id=parseInt(id);
       data.email = req.body.email;
     data.bvn = req.body.bvn
    const {userError,userMessage,userData} =  await walletServices.createAcctNumber(data);
    if(userError){
        return res.status(200).send({
            message: userMessage,
            data:userData,
            error: userError
        });
    }
    return res.status(200).send({
        message: userMessage,
        data:userData,
        error: userError
    });
}
exports.wallet = async ( req, res, next)=>{
    const {id} = req.params;
           data = {};
           data.user_id=parseInt(id);
           data.amount= req.body.amount;
           const {userError,userMessage,userData} =  await userCardCharge(req.body);
          if(userError===false){
              return await walletServices.Addfund(data)
              
           .then(async () => {
               data.trans_id= Math.random().toString(36).slice(2);
               data.type= 'wallet';
               data.status= 'success';
               data.updateAt =  new Date();
             await transaction.createData(data);
               return res.status(200).send({
                message: userMessage,
                data:userData,
                error: userError
            });
           })
           
          }else{
            return res.status(200).send({
                message: userMessage,
                data:userData,
                error: userError
            });
          }
           
           


}
exports.chargeWallet = async (req, res, next) => {
    const {id} = req.params;
         data ={}
         data.user_id = parseInt(id);
         data.amount = req.body.amount;
         console.log(data);
         
         const {userError,userMessage,userData} = await RemoveFund(data)
         if(userError===false){
           data.trans_id= Math.random().toString(36).slice(2);
           data.type= 'wallet';
           data.status= 'success';
           data.updateAt =  new Date();
           await transaction.createData(data);
           return res.status(200).send({
            message: userMessage,
            data:userData,
            error: userError
        });
       }
       return res.status(200).send({
        message: userMessage,
        data:userData,
        error: userError
    });
    

}

exports.chargeCard =  async (req, res, next) => {
    const {userError,userMessage,userData}  =  await userCardCharge(req.body);
       if(userError){
        return res.status(200).send({
            message: userMessage,
            data:userData,
            error: userError
        });

       }

       return res.status(200).send({
        message: userMessage,
        data:userData,
        error: userError
    });

}
