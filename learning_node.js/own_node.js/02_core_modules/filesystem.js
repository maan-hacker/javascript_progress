const fs = require("fs");  // importing a 'file system' module

// writing using asynchronous function into file
fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});

console.log("This runs first.");

