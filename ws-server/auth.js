const config = require('./config.js')
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.secretPhrase, (err, token) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    req.ruolo = token.ruolo;
    next();
  });
}

module.exports = auth;
