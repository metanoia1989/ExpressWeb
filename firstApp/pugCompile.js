const fs = require('fs');
const pug = require('pug');

const jsFuncString = pug.compileFileClient('./views/conpileFileClient.pug', { name: 'fancyTempalteFun' });

fs.writeFileSync('template-pug.js', jsFuncString);

const html = pug.renderFile('./views/conpileFileClient.pug', { author: 'metanoia1989' });
console.log(html);