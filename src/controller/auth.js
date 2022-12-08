const {auth} = require('../services');




exports.register = async ( req, res, next)=>{
 try {
	const {userError,userMessage,userData} = await auth.registerServices(req.body);
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
   

 } catch (err) {
	  return next(err);
 }
  
}

 
exports.login = async (req, res, next)=>{
   try {
	const {userError,userMessage,userData} = await auth.loginServices(req.body);
	if(userError){
		console.log(userMessage);

		return res.json({
			message: userMessage,
			data:userData,
			error: userError
		});
	}
const PayintgoApp = req.session;
PayintgoApp.email = req.body.email;
console.log(PayintgoApp.email);

	return res.json({
		message: userMessage,
		data:userData,
		error: userError
	});
   
	 } catch (err) {
		  return next(err)
	 }
        
}

exports.forgotPassword = async (req, res, next) =>{
	try {
		const {userError,userMessage,userData} = await auth.forgotPassWord(req.body);
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
	   
	
	 } catch (err) {
		  return next(err);
	 }
}


exports.setNewPassword = async (req, res, next) =>{
	    const token = req.params;
		 const data = {
			 token: token,
			 password: req.body.password
		 }
	try {
		const {userError,userMessage,userData} = await auth.setNewPassword(data);
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
	   
	
	 } catch (err) {
		  return next(err);
	 }
}

generatecode = async (req, res, next) =>{
	const code = Math.floor(Math.random()*10000,4);
	return code;

}


exports.verfication = async (req, res, next)=>{
	 const {id} = req.params;
	 try {
		  const getcode = await generatecode();
			return res.status(200).json(getcode);
	 } catch (err) {
		  return next(err);
	 }

}