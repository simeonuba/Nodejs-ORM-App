const users = require('./users');
const protected = require('./protectedRoutes');
var allowCors = function (req,res,next){
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
}


const router = (app) => {
  app.use(allowCors);
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.use(users);
  
    app.use(protected);
}

module.exports = router


