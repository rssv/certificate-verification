require('dotenv').config()
const Web3 = require('web3');
const web3 = new Web3(process.env.BLOCKCHAIN_URL);
web3.eth.getBlock(1000).then((block) => //console.log("block", block))
.catch((err) => //console.log(err.message));