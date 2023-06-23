const key = "name";

const obj = {
    name: "sourav",
    passcode: "singh"
}
console.log({...obj, [`${key}`]: "shubham"});