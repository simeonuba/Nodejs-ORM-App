const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const checkEmail = async (data) => {
 
    return await prisma.users.findUnique({
        where: {
          email: data,
        },
      })
}
const checkPhoneNumber = async (data) => {
 
  return await prisma.users.findUnique({
      where: {
        phone_number: data,
      },
    })
}

const passwordCheck = async (data) => {
    return await prisma.users.findUnique({
        where: { email: data.email},
				select: {
        password: true
    }

});
}

const generateToken = async () =>{
  let codes = require('crypto').randomBytes(25).toString('hex');
  
  return codes;
}
const checkRestToken = async (data) => {
   const {token} = data;
   return await prisma.acces_tokens.findUnique({
    where: { 
      token: token 
    },
   })
  
}

module.exports = {
    checkEmail,
    passwordCheck,
    generateToken,
    checkRestToken,
    checkPhoneNumber
}