// importing built-in module for filesystem
const fs = require("fs");

// Sync write: blocks execution until the file is written
fs.writeFileSync("message.txt", "This is from writeFileSync");

// Async write: non-blocking; callback runs after write completes
fs.writeFile("async-message.txt", "This is from writeFile", (err) => {});
console.log("Async file write.");

// Sync read: blocks execution and returns data immediately.
const contact = fs.readFileSync("message.txt", "utf-8");
console.log(contact);

// Async read: non-blocking; result is available inside callback
fs.readFile("message.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log(result);
    }
});

// Sync append: blocks execution until data is appended
const date = new Date();
let dateMonthYear = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
fs.appendFileSync("message.txt", `${dateMonthYear}`);

// Sync copy: blocks execution until file is copied.
fs.cpSync("message.txt", "copy-message.txt");

// Sync delete: blocks execution until file is deleted
fs.writeFileSync('delete.txt', "This file is to be deleted.");
fs.unlinkSync('delete.txt');

// Sync stat: blocks execution and returns file stats immediately
console.log(fs.statSync("message.txt"));

// Sync methods return values directly
// Async methods do not return immediately. They provide it via callback/ Promise later.