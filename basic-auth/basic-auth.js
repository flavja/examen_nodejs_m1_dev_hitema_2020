const crypto = require('crypto');
const HttpStatus = require('http-status-codes');

function sha1Encode(data) {
    return crypto.createHash("sha1").update(data).digest('hex');
    // To be implemented!
}

module.exports.digestAuth = (request, response, next) => {
    const authorization = request.headers.authorization;
    const encoded = authorization.replace('Basic ', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');

    const authentication = decoded.split(':');
    const isvalid = authentication[0] === 'node' && authentication[1] === sha1Encode('password');
    isvalid ? next() : response.sendStatus(HttpStatus.UNAUTHORIZED);
}
