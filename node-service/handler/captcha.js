/**
 * Created by suihao on 2018/9/29.
 */

const svgCaptcha = require('svg-captcha');
const tokenUtil = require('./token');
const secrets = "secretsstring";
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
    let ip = req.request.ip;
    let time = (new Date()).getTime();
    const token = tokenUtil.create(secrets, captcha.text, time);
    const elapsed = new Date() - beginTime;
    callback(null, {
        token: token,
        captcha: captcha.data
    })
}

function parseCaptcha(req, callback) {
    console.log("parseCaptcha");
    let info = tokenUtil.parse(secrets, req.request.token);
    if (info.length !== 2){
        callback(null, {ok: false});
        return
    }
    if (req.request.captcha.toLowerCase() !== info[0].toLowerCase()){
        callback(null, {ok: false});
        return;
    }
    let tokenTime = new Date();
    tokenTime.setTime(info[1]);
    const timeDiff = Math.abs((new Date()).getTime() - tokenTime) / 1000; //秒
    if (timeDiff > 60){
        // 超过60秒失效
        callback(null, {ok: false});
        return;
    }
    callback(null, {ok: true});
}

module.exports.createCaptcha = createCaptcha;
module.exports.parseCaptcha = parseCaptcha;
