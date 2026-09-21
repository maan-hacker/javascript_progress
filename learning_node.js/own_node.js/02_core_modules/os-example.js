// import 'os' module short for operating system
const os = require("os");

console.log("Platform: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("CPU cores: ", os.cpus().length);
console.log("Home directory: ", os.homedir());