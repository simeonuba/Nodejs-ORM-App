const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next)=>{

  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: '1d',
      issuer: process.env.APP_DOMAIN
    };
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      console.log(req.decoded)
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }



















  // let token = req.headers["x-access-token"]  ;

  // if (!token) {
  //   return res.status(403).send({
  //     message: "No token provided!"
  //   });
  // }

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({
  //       message: "Unauthorized!",
  //       error: err
  //     });
  //   }
  //   req.userId = decoded.id;
  //   console.log(decoded)
  //   next();
  // });
  // const authHeader = req.headers.authorization;
  // console.log(authHeader)
  //   if (authHeader) {
  //       const token = authHeader.split(' ')[1];

  //       jwt.verify(token,  process.env.JWT_SECRET, (err, user) => {
  //           if (err) {
  //               return res.sendStatus(403);
  //           }

  //           req.user = user;
  //           console.log(user)
  //           next();
  //       });
  //   } else {
  //       res.sendStatus(401);
  //   }

    // var token = req.headers['x-access-token'] || '';
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    // jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    //   res.status(200).send(decoded);
    //   next();
    // });
}

module.exports = isLoggedIn;


