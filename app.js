const fs = require('fs');
let textIn = fs.readFileSync('./Files/input.txt','utf-8');//nodejs is single threaded 
//so unitl the file is read line by line the below code should wait so it is synchronous
console.log(textIn)

let content = `Node JS : ${textIn}. \n Date created ${new Date()}`
fs.writeFileSync('./Files/output.txt',content)