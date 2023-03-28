const express = require('express');

const router = express.Router();

router.get('/results/signed', auth, deanRoute, (req, res) => {
    res.json(signedResult);
})

router.get('/results/final-signed', auth, deanRoute, (req, res) => {
    res.json(signedFinalResults);
})

router.post('/result/storeHash', auth, deanRoute, async (req, res) => {
    console.log("req.body", req.body)
    let str = null;
    let studentResult = null;
    for (let i = 0; i < approvedResult.length; i++) {
        if ((approvedResult[i].admNo === req.body.admNo) && (approvedResult[i].semNo === req.body.semNo)) {
            studentResult = approvedResult[i];
            try {
                str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`))
                //console.log(str);
            } catch (e) {
                console.log(e, "error in pdf64");
            }
            str = "0x" + sha256(str);
            break;
        }
    }

    if (!str) {
        return res.send({ message: "no result to approve" });
    }

    let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
    hexString = "0x" + hexString;
    let signDetail = null;
    try {
        await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
        let receipt = await myContract.methods.storeHash(str, hexString)
            .send({ from: process.env.SMART_CONTRACT_OWNER });

        let block = await web3.eth.getBlock(receipt.blockHash);
        //console.log("block", block);
        let blockTransactions = [];
        for (let i = 0; i < block.transactions.length; i++) {
            blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
        }
        blockTransactions = await Promise.all(blockTransactions);
        //console.log("blockTransactions", blockTransactions);
        let someascii = decoder.decodeData(blockTransactions[0].input);
        //console.log("someascii", someascii);
        signDetail = {
            admNo: req.body.admNo,
            semNo: req.body.semNo,
            receipt: receipt,
            block: block,
            transaction: blockTransactions[0],
            data: someascii
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log(signDetail);
    console.log("signedResult", signedResult);
    if (signDetail) {
        let newApprovedResult = approvedResult.filter((e) => ((e.admNo !== req.body.admNo) || (e.semNo !== req.body.semNo)))
        approvedResult = [...newApprovedResult];
        let findFlag = false;
        for (let i = 0; i < signedResult.length; i++) {
            if (signedResult[i].admNo === studentResult.admNo) {
                findFlag = true;
                signedResult[i].signDetails.push(signDetail);
                signedResult[i].results.push({
                    semNo: studentResult.semNo,
                    semType: studentResult.semType,
                    semSession: studentResult.semSession,
                    subjects: studentResult.subjects
                })
                break;
            }
        }
        if (!findFlag) {
            let details = [];
            details.push(signDetail);
            let studentDetails = {
                name: studentResult.name,
                admNo: studentResult.admNo,
                course: studentResult.course,
                courseDuration: studentResult.courseDuration,
                yearOfAdmission: studentResult.yearOfAdmission,
                department: studentResult.department,
                results: [],
                signDetails: details
            }
            let resultDetails = {
                semNo: studentResult.semNo,
                semType: studentResult.semType,
                semSession: studentResult.semSession,
                subjects: studentResult.subjects
            }
            studentDetails.results.push(resultDetails);
            signedResult.push(studentDetails);
        }
    }
    populateFinalResults();
    //console.log(signDetail);
    res.send(signDetail);
})

router.post('/result/storeHash-new', auth, deanRoute, async (req, res) => {
    console.log("req.body", req.body)
    let str = null;
    let studentResult = null;
    for (let i = 0; i < approvedResult.length; i++) {
        if ((approvedResult[i].admNo === req.body.admNo) && (approvedResult[i].semNo === req.body.semNo)) {
            studentResult = approvedResult[i];
            try {
                str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`))
                //console.log(str);
            } catch (e) {
                console.log(e, "error in pdf64");
            }
            str = "0x" + sha256(str);
            break;
        }
    }

    if (!str) {
        return res.send({ message: "no result to approve" });
    }

    let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
    hexString = "0x" + hexString;
    let signDetail = null;
    try {
        await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
        let receipt = await myContract1.methods.storeResult(str, hexString, parseInt(req.body.semNo))
            .send({ from: process.env.SMART_CONTRACT_OWNER });

        let block = await web3.eth.getBlock(receipt.blockHash);
        //console.log("block", block);
        let blockTransactions = [];
        for (let i = 0; i < block.transactions.length; i++) {
            blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
        }
        blockTransactions = await Promise.all(blockTransactions);
        //console.log("blockTransactions", blockTransactions);
        let someascii = decoder1.decodeData(blockTransactions[0].input);
        //console.log("someascii", someascii);
        signDetail = {
            admNo: req.body.admNo,
            semNo: req.body.semNo,
            receipt: receipt,
            block: block,
            transaction: blockTransactions[0],
            data: someascii
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log(signDetail);
    console.log("signedResult", signedResult);
    if (signDetail) {
        let newApprovedResult = approvedResult.filter((e) => ((e.admNo !== req.body.admNo) || (e.semNo !== req.body.semNo)))
        approvedResult = [...newApprovedResult];
        let findFlag = false;
        for (let i = 0; i < signedResult.length; i++) {
            if (signedResult[i].admNo === studentResult.admNo) {
                findFlag = true;
                signedResult[i].signDetails.push(signDetail);
                signedResult[i].results.push({
                    semNo: studentResult.semNo,
                    semType: studentResult.semType,
                    semSession: studentResult.semSession,
                    subjects: studentResult.subjects
                })
                break;
            }
        }
        if (!findFlag) {
            let details = [];
            details.push(signDetail);
            let studentDetails = {
                name: studentResult.name,
                admNo: studentResult.admNo,
                course: studentResult.course,
                courseDuration: studentResult.courseDuration,
                yearOfAdmission: studentResult.yearOfAdmission,
                department: studentResult.department,
                results: [],
                signDetails: details
            }
            let resultDetails = {
                semNo: studentResult.semNo,
                semType: studentResult.semType,
                semSession: studentResult.semSession,
                subjects: studentResult.subjects
            }
            studentDetails.results.push(resultDetails);
            signedResult.push(studentDetails);
        }
    }
    populateFinalResults();
    //console.log(signDetail);
    res.send(signDetail);
})

router.post('/result-final/storeHash', auth, deanRoute, async (req, res) => {
    console.log("req.body", req.body)
    let str = null;
    let studentResult = null;
    for (let i = 0; i < approvedFinalResults.length; i++) {
        if (approvedFinalResults[i].admNo === req.body.admNo) {
            studentResult = approvedFinalResults[i];
            try {
                str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_final.pdf`))
                //console.log(str);
            } catch (e) {
                console.log(e, "error in pdf64");
            }
            str = "0x" + sha256(str);
            break;
        }
    }

    if (!str) {
        return res.send({ message: "no result to approve" });
    }

    let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
    hexString = "0x" + hexString;
    let signDetail = null;
    try {
        await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
        let receipt = await myContract.methods.storeHash(str, hexString)
            .send({ from: process.env.SMART_CONTRACT_OWNER });

        let block = await web3.eth.getBlock(receipt.blockHash);
        //console.log("block", block);
        let blockTransactions = [];
        for (let i = 0; i < block.transactions.length; i++) {
            blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
        }
        blockTransactions = await Promise.all(blockTransactions);
        //console.log("blockTransactions", blockTransactions);
        let someascii = decoder.decodeData(blockTransactions[0].input);
        //console.log("someascii", someascii);
        signDetail = {
            admNo: req.body.admNo,
            receipt: receipt,
            block: block,
            transaction: blockTransactions[0],
            data: someascii
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log(signDetail);
    console.log("signedResult", signedResult);
    if (signDetail) {
        let newApprovedFresult = approvedFinalResults.filter((e) => e.admNo !== req.body.admNo)
        approvedFinalResults = [...newApprovedFresult];
        studentResult.signDetails = [signDetail];
        signedFinalResults.push(studentResult);
    }
    console.log(signDetail);
    res.send(signDetail);
})

router.post('/result-final/storeHash-new', auth, deanRoute, async (req, res) => {
    console.log("req.body", req.body)
    let str = null;
    let studentResult = null;
    for (let i = 0; i < approvedFinalResults.length; i++) {
        if (approvedFinalResults[i].admNo === req.body.admNo) {
            studentResult = approvedFinalResults[i];
            try {
                str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_final.pdf`))
                //console.log(str);
            } catch (e) {
                console.log(e, "error in pdf64");
            }
            str = "0x" + sha256(str);
            break;
        }
    }

    if (!str) {
        return res.send({ message: "no result to approve" });
    }

    let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
    hexString = "0x" + hexString;
    let signDetail = null;
    try {
        await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
        let receipt = await myContract1.methods.storeResult(str, hexString, parseInt(req.body.semNo))
            .send({ from: process.env.SMART_CONTRACT_OWNER });

        let block = await web3.eth.getBlock(receipt.blockHash);
        //console.log("block", block);
        let blockTransactions = [];
        for (let i = 0; i < block.transactions.length; i++) {
            blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
        }
        blockTransactions = await Promise.all(blockTransactions);
        //console.log("blockTransactions", blockTransactions);
        let someascii = decoder.decodeData(blockTransactions[0].input);
        //console.log("someascii", someascii);
        signDetail = {
            admNo: req.body.admNo,
            receipt: receipt,
            block: block,
            transaction: blockTransactions[0],
            data: someascii
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log(signDetail);
    console.log("signedResult", signedResult);
    if (signDetail) {
        let newApprovedFresult = approvedFinalResults.filter((e) => e.admNo !== req.body.admNo)
        approvedFinalResults = [...newApprovedFresult];
        studentResult.signDetails = [signDetail];
        signedFinalResults.push(studentResult);
    }
    console.log(signDetail);
    res.send(signDetail);
})

router.post('/result/verify', upload.single('result'), async (req, res) => {
    //console.log(req.file);
    //console.log(req.body.admNo);
    let str = null;
    try {
        str = await pdf2base64(`./results/${req.file.filename}`)
    } catch (e) {
        //console.log(e)
        return res.send(e);
    }
    str = "0x" + sha256(str);
    let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
    hexString = "0x" + hexString;

    //const retrievedHash = await myContract.methods.getHash(hexString).call();

    let block = await web3.eth.getBlock(req.body.blockNo);
    //console.log("block", block);
    let blockTransactions = [];
    for (let i = 0; block && block.transactions && i < block.transactions.length; i++) {
        blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
    }
    blockTransactions = await Promise.all(blockTransactions);
    let retrievedHash = null;
    let someascii = null;
    if (blockTransactions.length) {
        someascii = decoder.decodeData(blockTransactions[0].input);
        retrievedHash = someascii.inputs[0];
    }

    fs.unlink(path.join(__dirname, 'results', `${req.file.filename}`), (err) => {
        if (err)
            console.log(err);
        console.log(`${req.file.filename} deleted successfully`);
    })

    if (someascii && someascii.inputs && hexString !== someascii.inputs[1]) {
        return res.send({ verdict: "hash mismatched" })
    }

    if (retrievedHash !== str)
        return res.send({ verdict: "hash mismatched" })
    res.send({ verdict: "verified" });
})

module.exports = router;