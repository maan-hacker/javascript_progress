// importing the basic modules 
const os = require("os");
const fs = require("fs");
const path = require("path");


// Call the methods of the above modules
const info = `
    Platform: ${os.platform()}
    Architecture: ${os.arch()}
    CPU Cores: ${os.cpus().length}
    Home Directory: ${os.homedir()}
`;

const filePath = path.join(__dirname, "system-info.txt");

fs.writeFileSync(filePath, info);

console.log("System information saved!");