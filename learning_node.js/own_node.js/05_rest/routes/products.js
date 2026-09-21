const products = require("../data/products");

function productRoutes(request, response) {

    // first REST endpoint
    if (request.method === 'GET' && request.url === '/products') {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

        response.end(JSON.stringify(products));
    }

    // adding PUT route
    else if (request.method === 'PUT' && request.url.startsWith("/products/")) {
        const id = Number(request.url.split("/")[2]);

        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            const updateData = JSON.parse(body);

            const product = products.find(product => product.id === id);

            if (!product) {
                response.statusCode = 404;
                response.setHeader("Content-Type", "application/json");

                response.end(JSON.stringify({
                    message: "Product not found"
                }));

                return;
            }

            product.name = updateData.name;
            product.price = updateData.price;

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");

            response.end(JSON.stringify(product));
        })
    }

    // adding POST routes
    else if (request.method === 'POST' && request.url === '/products') {
        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            const newProduct = JSON.parse(body);

            newProduct.id = products.length + 1;

            products.push(newProduct);

            response.statusCode = 201;
            response.setHeader("Content-Type", "application/json");

            response.end(JSON.stringify(newProduct));
        });
    }

    // to get specific product using routing of url
    else if (request.method === 'GET' && request.url.startsWith("/products")) {
        const id = Number(request.url.split("/")[2]);

        const product = products.find(product => product.id === id);

        if (product) {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(product));
        } else {
            response.statusCode = 404;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({
                message: "Product not found"
            }))
        }
    }

    // adding DELETE request Method
    else if (request.method === "DELETE" && request.url.startsWith("/products/")) {

        const id = Number(request.url.split("/")[2]);

        const index = products.findIndex(product => product.id === id);

        if (index === -1) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");

            response.end(JSON.stringify({
                message: "Product not found"
            }));

            return;
        }

        const deletedProduct = products.splice(index, 1)[0];

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

        response.end(JSON.stringify(deletedProduct));
    }
};

module.exports = productRoutes;