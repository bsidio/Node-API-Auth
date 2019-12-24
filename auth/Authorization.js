var jwt = require('jsonwebtoken');
var config = require('../config/keys'); // add config keys

var authorization = function (req, res, next) {
var authorizationHeaader = req.headers.cookie
let result;
if (authorizationHeaader) {
  const token =  authorizationHeaader.split('=')[1]; // Bearer <token>
  const options = { expiresIn: '2d', issuer: 'https://bsid.io' }; 

  try {
    // verify makes sure that the token hasn't expired and has been issued by us
    result = jwt.verify( token, config.secretOrKey,options );

    // Let's pass back the decoded token to the request object
    req.decoded = result;
    // We call next to pass execution to the subsequent middleware
    next();
  } catch (err) {
    // Throw an error just in case anything goes wrong with verification
    throw new Error(`Authentication error. Token required.`);
  }
} else {
  result = { 
      
    error: `Authentication error. Token required.`,
    status: 401
  };
  res.status(401).send(result);
}
}

module.exports = authorization;


