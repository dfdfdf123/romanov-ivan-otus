const stream = require('stream');
const maxNum = 10;

const randomNumberStream = (function () {
  const readable = new stream.Readable({
    read(size) {
    },
    highWaterMark: 100
  });
  setInterval(() => {
    let buf = new Uint8Array(1);
    const num = Math.random() * maxNum;
    buf.fill(num);
    readable.push(buf);
  }, 1000);

  return readable;
})();

const transformer = new stream.Transform({
  transform(chunk, encoding, callback) {
    const num = Math.random() * maxNum;
    chunk[0] += num;
    callback(null, chunk);
  }
});

const writer = new stream.Writable({
  write(chunk, encoding, callback) {
    console.log(chunk[0]);
    callback();
  }
});


randomNumberStream.pipe(transformer);
transformer.pipe(writer);