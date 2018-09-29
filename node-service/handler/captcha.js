/**
 * Created by suihao on 2018/9/29.
 */

const svgCaptcha = require('svg-captcha');
const tokenUtil = require('./token');

function createCaptcha(req, callback) {
    const beginTime = new Date();
    let captcha = svgCaptcha.create({
        size: 5,
        noise: 3,
        ignoreChars: '0o1iIl',
        color: true,
        //background: '#ffc18f',
        height: 35,
        charPreset: 'ABCDEFGHIJKLMNPQRSTUVWXYZ012346789'
    });
    console.log(req);
    let ip = req.request.ip;
    // let ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    let time = (new Date()).getTime();
    const token = tokenUtil.create("&LYBr8DilX1Fq0&r", captcha.text, time);
    const elapsed = new Date() - beginTime;
    callback(null, {
        token: token,
        captcha: captcha.data
    })
}

module.exports.createCaptcha = createCaptcha;