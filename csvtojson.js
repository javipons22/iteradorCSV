let csv2json = require('csv2json');
let fs = require('fs');
 
fs.createReadStream('variantes.csv')
  .pipe(csv2json({
    separator: ';'
  }))
  .pipe(fs.createWriteStream('data.json'));