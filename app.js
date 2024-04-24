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

const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');


const html = fs.readFileSync('./Template/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productsList = fs.readFileSync('./Template/productsList.html', 'utf-8')
let productDetails = fs.readFileSync('./Template/productDetails.html', 'utf-8')

function replacehtml(template, product) {
    let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);
    return output;
}

const server = http.createServer((request, response) => {
    // let path = request.url;
    let { query, pathname: path } = url.parse(request.url, true) // to extract the properties after we console the reuest url


    if (path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}', 'in home page'));
    } else if (path.toLocaleLowerCase() === '/about') {
        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}', 'in about page'));
    } else if (path.toLocaleLowerCase() === '/products') {
        if (!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replacehtml(productsList, prod)
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
            response.writeHead(200);
            response.end(productResponseHtml);
        } else {
            let prod = products[query.id];
            let productsDetailResponseHtml = replacehtml(productDetails, prod);
            response.end(html.replace('{{%CONTENT%}}', productsDetailResponseHtml));
        }
    }
    else {
        response.writeHead(404);
        response.end(html.replace('{{%CONTENT%}}', '404 error'));
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server has started');
})
