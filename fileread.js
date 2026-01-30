const fs = require('fs');
const data = fs.readFileSync("sample.txt", "utf-8");
console.log(data);