const fs = require("fs");
const crypto = require("crypto");
const transform = require('stream').Transform;
const hash = crypto.createHash("md5");

class TransformToNex extends transform {
	_transform(chank, encoding, callback) {
		this.push(chank.toString('hex'));
		console.log(chank.toString('hex'));
		callback();
	}
}

let readableStream = fs.createReadStream("data.txt", "utf8");
let writeableStream = fs.createWriteStream("dataW.txt");
 
readableStream
	.pipe(hash)
	.pipe(new TransformToNex())
	.pipe(writeableStream);

