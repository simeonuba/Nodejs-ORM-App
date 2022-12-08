const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Flutterwave = require('flutterwave-node-v3');
const open = require('open');
const flw = new Flutterwave(process.env.flut_Pub, process.env.flut_Secret);





getWalletBalance = async (data, res, req, next) => {
    return await prisma.accounts.findUnique({
        where: { user_id: parseInt(data) },
        select: {
            naira_bal: true
        }
    })
}



Addfund = async (data) => {
    let id = parseInt(data.user_id);
    const fundamount = data.amount;

    const balance = await getWalletBalance(id);

    const newBal = parseInt(balance.naira_bal) + parseInt(fundamount)


    if (balance) {
        const addfund = await prisma.accounts.update({
            where: {
                user_id: data.user_id,
            },
            data: {
                naira_bal: newBal,
                updateAt: new Date(),
            }
        })

    }



}
RemoveFund = async (data) => {
    let id = parseInt(data.user_id);
    console.log(id);
    const walletbalance = await getWalletBalance(id);
    console.log(walletbalance);
    const balance = parseInt(walletbalance.naira_bal);

    if (data.amount > balance) {
        return {
            userMessage: "Insufficent Fund!",
            userError: true,
            userData: balance,
        }
    } else {

        const newBal = balance - parseInt(data.amount);
        const update = await prisma.accounts.update({
            where: {
                user_id: id,
            },
            data: {
                naira_bal: newBal,
                updateAt: new Date(),
            }
        })
        return {
            userMessage: "Wallet Charged Successfully!",
            userError: false,
            userData: update.naira_bal,
        }
    }

}
const createAcctNumber = async (data) => {
    const { email, bvn, id } = data;
    const trans_ref = Math.random().toString(36).slice(2);
    console.log(data);
    try {
        const payload = {
            "email": email,
            "is_permanent": true,
            "bvn": bvn,
            "amount": 0,
            "tx_ref": trans_ref
        }
        const createAcct = await flw.VirtualAcct.create(payload)


        return {
            userMessage: createAcct.message,
            userError: false,
            userData: createAcct
        }
    } catch (error) {
        const { message } = error;
        return {
            userMessage: message,
            userError: true,
            userData: {},
        }
    }

}


const initTrans = async () => {

    try {
        const payload = {
            "account_bank": "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
            "account_number": "0690000040",
            "amount": 200,
            "narration": "ionnodo",
            "currency": "NGN",
            "reference": "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            "debit_currency": "NGN"
        }

        const response = await flw.Transfer.initiate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


const cardData = async (data) => {
    const { card_number, cvv, expiry_month, expiry_year, amount, fullname, email, phone_number, pincode } = data;
    const trans_ref = Math.random().toString(36).slice(2);
    const payload = {
        "card_number": card_number,
        "cvv": cvv,
        "expiry_month": expiry_month,
        "expiry_year": expiry_year,
        "currency": "NGN",
        "amount": amount,
        "redirect_url": "",
        "fullname": fullname,
        "email": email,
        "phone_number": phone_number,
        "enckey": "FLWSECK_TEST96c855426463",
        "tx_ref": "cardCharge-" + trans_ref,// This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
        "authorization": {
            "mode": "pin",
            "pin": pincode
        }
    }
    //console.log(payload)
    return payload;
}

const chargeCard = async (cardData) => {
    try {
        const response = await flw.Charge.card(cardData)
        console.log(response)
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = cardData
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": cardData.pincode
            }
            const reCallCharge = await flw.Charge.card(payload2)
            console.log(reCallCharge)
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref,
                "type": "card"

            })


        }
        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }

        return {
            userMessage: "Card Charged Successfully!",
            userError: false,
            userData: response.amount,
        };


    } catch (error) {
        const { message } = error
        return {
            userMessage: "Card Not Charged!",
            userError: true,
            userData: message,
        };

        //console.log(error)
    }
}

const getBanks = async () => {

    try {
        const payload = {

            "country": "NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively

        }
        const response = await flw.Bank.country(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}
const createOTP = async () => {

    try {

        const payload = {
            "length": 7,
            "customer": { "name": "Kazan", "email": "ziestwily@gmai.com", "phone": "08104093502" },
            "sender": "log t",
            "send": true,
            "medium": ["email", "whatsapp"],
            "expiry": 5
        }

        const response = await flw.Otp.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


const getATransfer = async () => {

    try {
        const payload = {
            "id": "1570636" // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
        }

        const response = await flw.Transfer.get_a_transfer(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

module.exports = { cardData, Addfund, RemoveFund, getWalletBalance, chargeCard, createAcctNumber }