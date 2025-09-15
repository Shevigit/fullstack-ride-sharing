// const jwt = require('jsonwebtoken');
// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyJWT;
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // שומר את המידע של המשתמש עבור רוטים מאובטחים
    next();
  } catch (err) {
    // מחזיר Forbidden אם הטוקן לא תקין או פג תוקף
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = verifyJWT;
