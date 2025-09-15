const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("Authorization header:", authHeader); // <-- הוספה כאן
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
            console.log("JWT verify error:", err); // <-- הוספה כאן
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
        console.log("Decoded token:", decoded); // <-- הוספה כאן
    next();
  });
};

module.exports = verifyJWT;