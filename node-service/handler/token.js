/**
 * Created by suihao on 2018/9/29.
 */
const crypto = require('crypto');

module.exports.create = function(pwd) {
    if (arguments.length <= 1){
        return null;
    }

    const args = Array.prototype.slice.call(arguments, 1);
    const msg = args.join('|');

    const cipher = crypto.createCipher('aes256', pwd);
    let enc = cipher.update(msg, 'utf8', 'base64');
    enc += cipher.final('base64');
    return enc;
};

module.exports.parse = function(pwd, token) {
    const decipher = crypto.createDecipher('aes256', pwd);
    let dec;
    try {
        dec = decipher.update(token, 'base64', 'utf8');
        dec += decipher.final('utf8');
    } catch(err) {
        console.error('[token] fail to decrypt token. %j', token);
        return null;
    }

    return dec.split('|');
};
