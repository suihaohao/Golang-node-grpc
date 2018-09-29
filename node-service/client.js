/**
 * Created by suihao on 2018/9/29.
 */

var PROTO_PATH =  __dirname + '/proto/data.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var svg_proto = grpc.loadPackageDefinition(packageDefinition).kgfamily.svc.kgadmin;

function main() {
    var client = new svg_proto.svgService('localhost:50053',
        grpc.credentials.createInsecure());
    var user;
    if (process.argv.length >= 3) {
        user = process.argv[2];
    } else {
        user = 'world';
    }
    client.GetSvgCaptcha({ip: "192.168.1.1"}, function(err, response) {
        console.log('Greeting:', response);
    });
}
main();
