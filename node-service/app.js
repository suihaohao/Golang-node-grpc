/**
 * Created by suihao on 2018/9/28.
 */

const PORT = ':50053';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const captcha = require("./handler/captcha");
let packageDefinition = protoLoader.loadSync(
    __dirname + '/proto/data.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const svg_proto = grpc.loadPackageDefinition(packageDefinition).kgfamily.svc.kgadmin;

function getServer() {
    console.log(`Starting svgCaptcha gRPC server on port ${PORT}...`);
    const server = new grpc.Server();
    server.addService(svg_proto.svgService.service, {GetSvgCaptcha: captcha.createCaptcha});
    server.bind('0.0.0.0:50053', grpc.ServerCredentials.createInsecure());
    server.start();
}
function main() {
    getServer()
}

main();