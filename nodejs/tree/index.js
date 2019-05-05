const fs = require('fs');
const path = require('path');

function read(dir, done) {
  const results = {
    files: [],
    dirs: []
  };

  fs.readdir(dir, (err, list) => {
    if (err) return done(err);

    let pending = list.length;

    if (!pending) return done(null, results);

    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          results.dirs.push(file);
          read(file, (err, res) => {
            results.files = results.files.concat(res.files);
            results.dirs = results.dirs.concat(res.dirs);
            pending--;
            if (!pending) done(null, results);
          });
        } else {
          results.files.push(file);
          pending--;
          if (!pending) done(null, results);
        }
      });
    });
  });
}

const dir = process.argv[2];

if (dir === undefined) {
  console.log('error');
} else {
  read(dir, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log("files:");
      res.files.forEach(f => console.log(f));
      console.log("dirs:");
      res.dirs.forEach(d => console.log(d));
  });
}
