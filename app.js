// const fs = require('fs');
// let textIn = fs.readFileSync('./Files/input.txt','utf-8');//nodejs is single threaded 
// //so unitl the file is read line by line the below code should wait so it is synchronous
// console.log(textIn)

// let content = `Node JS : ${textIn}. \n Date created ${new Date()}`
// fs.writeFileSync('./Files/output.txt',content)


// const fs = require('fs');
// fs.readFile('./Files/start.txt','utf-8',(err,data) => {
//     console.log(data)
//     fs.readFile(`./Files/${data}.txt`, 'utf-8', (error,data2)=>{
//         console.log(data2)
//         fs.readFile('./Files/append.txt','utf-8',(error3,data3) => {
//             console.log(data3)
//             fs.writeFile('./Files/output.txt', `${data2}\n\n${data3}\n\nDate created ${new Date()}`,()=>{
//                 console.log('file written succesfully');
//             })
//         })
//     })
// });
// // the readfile method runs in background hence the below cde can be executes
 //console.log('reading file...');


const fs = require('fs');
const html = fs.readFileSync('./Template/index.html','utf-8')

const http = require('http');
const server = http.createServer((request, response) => {
    let path = request.url;

    if(path=== '/'|| path.toLocaleLowerCase() === '/home'){
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}','in home page'));
    }else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}','in about page'));
    }else{
        response.writeHead(404);
        response.end(html.replace('{{%CONTENT%}}','404 error'));
    }
});

server.listen(8000,'127.0.0.1',() => {
    console.log('server has started');
})
