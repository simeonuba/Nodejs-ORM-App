const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const verifyService = require("./verifyServices");
const validating = require("../shared/validation/auth.validation");
let Validator = require("validatorjs");



const registerServices = async (data) => {
  let validators = new Validator(data, validating.forminput);
  if (validators.passes()) {
    const { phone_number,email } = data;

    const checkuser = await verifyService.checkPhoneNumber(phone_number);
    const checkuseremail = await verifyService.checkEmail(email);

    if (!checkuser && !checkuseremail) {
      const hashPassword = await bcrypt.hash(data.password, 12);
      data.password = hashPassword;
      const createUser = await prisma.users.create({
        data: data,
      });

      data = {};
      data.user_id = createUser.id;
      await prisma.accounts.create({
        data: data,
      });
      const regInfo = {
        email: createUser.email,
        fullname: createUser.name,
      };

      return {
        userMessage: "Account Created Successfully!",
        userError: false,
        userData: regInfo,
      };
    } else {
      return {
        userMessage: "User Already Exist !",
        userError: true,
        userData: {},
      };
    }
  } else {
    return {
      userMessage: "Validation Error!",
      userError: true,
      userData: validators.errors,
    };
  }
};

const loginServices = async (data) => {
  let validators = new Validator(data, validating.loginform);
  if (validators.passes()) {
    const { phone_number } = data;

    const checkuser = await verifyService.checkPhoneNumber(phone_number);

    if (checkuser) {
      const matchPassword = await bcrypt.compare(
        data.password,
        checkuser.password
      );
      if (!matchPassword) {
        return {
          userMessage: "Incorrect Password!",
          userError: true,
          userData: {},
        };
      }
      const payload = { email: checkuser.email };
      const options = { expiresIn: '1d', issuer: process.env.APP_DOMAIN };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, options);
     
      return {
        userMessage: "Login Successful!",
        userError: false,
        userData: token,
      };
    } else {
      return {
        userMessage: "Account does not exist",
        userError: true,
        userData: {},
      };
    }
  }
  else {
    return {
      userMessage: "Validation Error!",
      userError: true,
      userData: validators.errors,
    };
  }
};

const forgotPassWord = async (data) =>{
  const {email} = data;
  const checkEmail = await verifyService.checkEmail(email);  
   if(checkEmail){
     const setToken = await verifyService.generateToken()
     console.log(setToken);
     const data = {
       user_id: checkEmail.id,
       token: setToken,
       status: "pending",
       createAt:  new Date(), 
       updateAt:  new Date()
      }
     await prisma.acces_tokens.create({
      data: data,
    });
     return {
      userMessage: "Password Reset Link Sent Successful!",
      userError: false,
      userData: data,
    };
   }else{
    return {
      userMessage: "No Record Found on this user! ",
      userError: true,
      userData: email,
    };
   }
}
const setNewPassword = async (data) =>{

    const {token,password} = data;
  console.log(token)
    const  verifyToken =  await  verifyService.checkRestToken(token);
     console.log(verifyToken);

    if(!verifyToken){
      return {
        userMessage: "Inavlid Token Provided!",
        userError: true,
        userData: token,
      };
    }
    let validators = new Validator(data, validating.changePasswordform);
    if (validators.passes()) { 
            const hashPassword = await bcrypt.hash(password, 12);
              
            await prisma.users.update({
              where: { id: verifyToken.user_id },
              data: {
                password: hashPassword,
              },
              
            });
            await prisma.acces_tokens.update({
              where: { id: verifyToken.id },
              data: {
                status: "used"
              },
              
            });
            return {
              userMessage: "Password changed Successfully!",
              userError: false,
              userData: {},
            };

        }
        else {
          return {
            userMessage: "Validation Error!",
            userError: true,
            userData: validators.errors,
          };
        }
}
module.exports = {
  registerServices,
  loginServices,
  forgotPassWord,
  setNewPassword
};
