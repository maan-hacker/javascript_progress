// import http module
const http = require("http");
// import products from database
const products = require("./data/products");
const productRoutes = require("./routes/products");



// create a server
const server = http.createServer((request, response) => {
    productRoutes(request, response);
});

// Start the server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});

