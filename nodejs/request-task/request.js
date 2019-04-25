const http = require('http');

const options = {
  hostname: '127.0.0.1',
  method: 'GET',
  port: 8080,
};

async function asyncReq() {
  const req = await http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('async request end.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
}

function syncReq() {
  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('sync request end.');
    });
  });
    
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
    
  req.end();
}

function request(count, sync = true) {
  for (let i = 0; i < count; i++) {
    if (!sync) {
      asyncReq();
    } else {
      syncReq();
    }
  }
}

request(3, false);