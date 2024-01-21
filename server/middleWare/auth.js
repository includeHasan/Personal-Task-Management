var bodyParser = require('body-parser')
var cookieParser=require('cookie-parser')
var jwt=require('jsonwebtoken')

// Middleware for authenticating requests

const authenticateUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
  console.log(token)
      if (!token) {
       
        throw new Error('No token found');
      }
      
      const decodedToken = jwt.verify(token, 'hasan');
      
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  };
  
// Middleware for creating and sending JWT as HTTP-only cookie
const sendTokenAsCookie = (res, token) => {
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000, // Token expiry time in milliseconds (1 hour in this example)
    });
  };


module.exports={authenticateUser,sendTokenAsCookie}
