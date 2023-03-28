const express = require('express');

const router = express.Router();

router.get('/results/pending', auth, aDeanRoute, (req, res) => {
    //console.log("suarsuar");
    res.json(pendingResultsForApproval);
})

router.get('/results/final', auth, aDeanRoute, (req, res) => {
    //console.log("suarsuar");
    res.json(finalResults);
})

router.get('/results/final-failed', auth, aDeanRoute, (req, res) => {
    //console.log("suarsuar");
    res.json(failedFinalResults);
})

router.get('/results/final-approved', auth, deanAdeanRoute, (req, res) => {
    //console.log("suarsuar");
    res.json(approvedFinalResults);
})

router.put('/results/approved', auth, aDeanRoute, (req, res) => {
    //console.log("results/approved, req.body", req.body)
    for (let i = 0; i < pendingResultsForApproval.length; i++) {
        if ((pendingResultsForApproval[i].admNo === req.body.admNo) && (pendingResultsForApproval[i].semNo === req.body.semNo)) {
            approvedResult.push(pendingResultsForApproval[i]);
            break;
        }
    }

    let newpnedR = pendingResultsForApproval.filter((element) => ((element.admNo !== req.body.admNo) || (element.semNo !== req.body.semNo)))
    pendingResultsForApproval = newpnedR;
    const stud = approvedResult.find((e) => ((e.admNo === req.body.admNo) && (e.semNo === req.body.semNo)));
    if (!stud)
        return res.send({ message: "student not found" });
    ejs.renderFile(path.join(__dirname, 'views', 'pdf.ejs'), { studentData: stud }, {}, function (err, str) {
        if (err) return res.status(500).send(err);

        // str now contains your rendered html
        const options = {
            format: 'A4',
            orientation: 'portrait'
        }
        pdf.create(str, options).toFile(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`), function (err, data) {
            if (err) return res.status(500).send(err);

            res.send({ message: "pdf created" });
        });
    });
})

router.put('/results/final-approved', auth, aDeanRoute, async (req, res) => {
    //console.log("results/approved, req.body", req.body)
    const checkResultsInstegrity = async (resultSign) => {
        let flag = true;
        let strArray = [];
        for (let i = 0; i < resultSign.length; i++) {
            strArray.push(pdf2base64(path.join(__dirname, 'results', `result_${resultSign[i].admNo}_${resultSign[i].semNo}.pdf`)))
        }

        try {
            strArray = await Promise.all(strArray);
        } catch (e) {
            console.log(e);
            return false;
        }

        for (let i = 0; i < resultSign.length; i++) {
            let str = strArray[i];
            str = "0x" + sha256(str);
            let hexString = Buffer.from(resultSign[i].admNo, 'utf8').toString('hex');
            hexString = "0x" + hexString;
            console.log("resultSign[i].blockNumber", resultSign[i].receipt.blockNumber);
            let block = await web3.eth.getBlock(resultSign[i].receipt.blockNumber);
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

            if (someascii && someascii.inputs && hexString !== someascii.inputs[1]) {
                flag = false;
                break;
            }
            console.log(retrievedHash);
            console.log(str);
            if (retrievedHash !== str) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    let finalR = null;

    for (let i = 0; i < finalResults.length; i++) {
        if (finalResults[i].admNo === req.body.admNo) {
            finalR = finalResults[i];
            break;
        }
    }
    if (finalR) {
        let integrity = await checkResultsInstegrity(finalR.signDetails);
        if (integrity) {
            const merger = new pdfMerger();
            finalR.signDetails.forEach(e => {
                merger.add(path.join(__dirname, 'results', `result_${e.admNo}_${e.semNo}.pdf`));
            })
            await merger.save(path.join(__dirname, 'results', `result_${finalR.admNo}_final.pdf`));
            let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
            finalResults = newFinalR;
            approvedFinalResults.push(finalR);
            return res.send({ message: 'approved' });
        }
        else {
            console.log("not integrity")
            let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
            finalResults = newFinalR;
            failedFinalResults.push(finalR);
            return res.send({ message: 'failed' })
        }
    }
    res.send({ message: 'not found' });
})

router.put('/results/final-approved-new', auth, aDeanRoute, async (req, res) => {
    //console.log("results/approved, req.body", req.body)
    const checkResultsInstegrity1 = async (resLen) => {
        let flag = true;
        let strArray = [];
        for (let i = 0; i < resLen; i++) {
            strArray.push(pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${i + 1}.pdf`)))
        }

        try {
            strArray = await Promise.all(strArray);
        } catch (e) {
            console.log(e);
            return false;
        }

        for (let i = 0; i < resLen; i++) {
            let str = strArray[i];
            str = "0x" + sha256(str);
            let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
            hexString = "0x" + hexString;
            let retrievedHash = null;
            try {
                retrievedHash = await myContract1.methods.getResult(hexString, i + 1).call();
            } catch (e) {
                console.log(e.message);
                return res.send(e);
            }
            if (retrievedHash !== str) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    let finalR = null;

    for (let i = 0; i < finalResults.length; i++) {
        if (finalResults[i].admNo === req.body.admNo) {
            finalR = finalResults[i];
            break;
        }
    }
    if (finalR) {
        let integrity = await checkResultsInstegrity1(finalR.signDetails.length);
        if (integrity) {
            const merger = new pdfMerger();
            finalR.signDetails.forEach(e => {
                merger.add(path.join(__dirname, 'results', `result_${e.admNo}_${e.semNo}.pdf`));
            })
            await merger.save(path.join(__dirname, 'results', `result_${finalR.admNo}_final.pdf`));
            let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
            finalResults = newFinalR;
            approvedFinalResults.push(finalR);
            return res.send({ message: 'approved' });
        }
        else {
            console.log("not integrity")
            let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
            finalResults = newFinalR;
            failedFinalResults.push(finalR);
            return res.send({ message: 'failed' })
        }
    }
    res.send({ message: 'not found' });
})


module.exports = router