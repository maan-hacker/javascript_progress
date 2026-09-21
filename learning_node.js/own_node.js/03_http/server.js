const http = require("http");

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");


    // Handle preflight
    if (request.method === "OPTIONS") {
        response.statusCode = 204;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.end();

        return;
    }

    if (request.method === 'GET' && request.url === '/products') {

        const products = [
            {
                id: 1,
                name: "Laptop",
                price: 1000
            }, 

            {
                id: 2,
                name: "Keyboard",
                price: 100
            }
        ];

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(products));
    }

    else if (request.method === 'POST' && request.url === '/products') {

        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {

            const product = JSON.parse(body);

            console.log(product);
            console.log(product.name);
            console.log(product.price);

            response.statusCode = 201;
            response.end("Product received");
        })
    }

    else {
        response.statusCode = 404;
        response.end('Route not found');
    }

});

server.listen(3000);