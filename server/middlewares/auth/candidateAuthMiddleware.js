const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'sajjadbhai';

function candidateAuthMiddleware(req, res, next) {
  let token = req.body.token;
  token= token?.split(' ')[1];

  if(!token)
  {
    token = req.headers['authorization'];
    token= token?.split(' ')[1];
  }

  if (!token) {
    console.log("access Denied Token Not Provided");
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.cnic = decoded.sub;
    req.type = decoded.type;
    decoded.type==="candidate"?next():res.status(401).json({ message: 'Invalid token.' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
    console.log("invalid Token");
  }
}

module.exports = candidateAuthMiddleware;
