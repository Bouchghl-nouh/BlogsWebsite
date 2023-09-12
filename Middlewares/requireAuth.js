const jwt = require('jsonwebtoken');
const secretKey = "secretKey"

function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('login');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.redirect('login');
        }
        req.decoded = decoded;
        next();
    });

}

module.exports = requireAuth