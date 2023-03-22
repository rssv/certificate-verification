require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const pdf2base64 = require('pdf-to-base64');
const sha256 = require('sha256');

const app = express();
const port = process.env.PORT || 3000;

const SmartContractAddress = "0x9b57aE7f046b7A0E6776d85CbA8c05e6E7a9EB20";
const SmartContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "adm",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "sem",
				"type": "uint256"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "hash",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "adm",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "sem",
				"type": "uint256"
			}
		],
		"name": "storeResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


app.get('/send-hash', async(req, res) => {
  const web3 = new Web3(process.env.BLOCKCHAIN_URL);
  const myContract = new web3.eth.Contract([...SmartContractABI], SmartContractAddress);

  let str;
//   try{
//     str = await pdf2base64("result.pdf")
//   } catch(e){
//     console.log(e)
//   }

  //str = "0x" + sha256(str);
  let hexString = Buffer.from('17JE002970', 'utf8').toString('hex');
  hexString =  "0x" + hexString;
  //console.log("hexString", hexString, str);
  //let receipt;
  
  //const receipt = await myContract.methods.getHash(hexString).call();
	await web3.eth.personal.unlockAccount("0x1e0b8f4522c3c43bbe3cd31595e8f9b2d9193528", "1234")
  	//const receipt = await myContract.methods.storeHash(str, hexString).send({from:"0x1e0b8f4522c3c43bbe3cd31595e8f9b2d9193528"});
	  let retrievedHash;
	  console.log(hexString, "lslslfl");
	  try{
		retrievedHash = await myContract.methods.getResult(hexString, 1).call();
		//retrievedHash = await myContract.methods.storeResult(hexString, hexString, 1)
    //.send({from:"0x1e0b8f4522c3c43bbe3cd31595e8f9b2d9193528"})
	 } catch(e){
		 console.log(e.message);
	 }
	  
   //console.log(receipt, "receipt");
   res.send(retrievedHash);
 
})

app.listen(port);
console.log('listening on', port);

