require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const cors = require('cors')
// const ejs = require('ejs');
// const path = require('path')
// const pdf = require('html-pdf');
// const fs = require('fs');
// const Web3 = require('web3');
// const pdf2base64 = require('pdf-to-base64');
// const sha256 = require('sha256');
// const multer = require('multer');
// const InputDataDecoder = require('ethereum-input-data-decoder');
// const pdfMerger = require('pdf-merger-js');


// const {auth, aDeanRoute, deanRoute, instructorRoute, deanAdeanRoute} = require('./middlewares');
const { sequelize } = require('./utils/database');
const adminRoutes = require('./routes/admin');
const instructorRoutes = require('./routes/instructor');
const { associations } = require('./models');

const app = express();

associations();

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './results');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '--' + file.originalname)
//   }
// });

// const upload = multer({storage: fileStorageEngine});

// app.set('view engine', 'ejs');
// app.set('views', 'views');


// app.use(cors({credentials: true, origin: "http://localhost:3000"}))
//app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser())
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);

// let users = require('./user.json');
// // users = users.map(async (u) => {
// //   const hashedPassword = await bcrypt.hash(u.password, 10)
// //   const user = {...u, password: hashedPassword}
// //   //console.log(user.password, user.username);
// //   return user;
// // });
// let students = require('./students.json');
// const { mongoConnect } = require('./utils/database');

// let pendingResultsForApproval = [];

// let approvedResult = [];

// let signedResult = [];

// let finalResults = [];

// let approvedFinalResults = [];

// let failedFinalResults = [];

// let signedFinalResults = [];

// const populateFinalResults = () => {
//   signedResult.forEach((e, i) => {
//     if(e.course === "M.Tech" && !e.finalResultStatus && e.signDetails.length === 4){
//       e.finalResultStatus = true;
//       finalResults.push(e);
//     }
//   })
// }



// const generateAccessToken = (user) => {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '200s' })
// }

// const populatePendingResult = (studentRecords) => {
//   studentRecords.forEach(student => {
//     let s = student.subjects.filter((sub) => !sub.marks)
//     if(s.length === 0)
//       pendingResultsForApproval.push(student);
//   });
// }

// app.get('/users', (req, res) => {
//   res.json(users)
// })

// app.post('/users', async (req, res) => {

//   let tempUser = req.body.users.map(async (u) => {
//     const hashedPassword = await bcrypt.hash(u.password, 10)
//     const user = { username:u.username, name: u.name, password: hashedPassword, role: u.role}
//     return user;
//   });

//   try{
//     let tusers = await Promise.all(tempUser);
//     users = [...users, ...tusers];
//     res.status(201).send()
//   } catch (err){
//     //console.log(err)
//     res.status(500).send()
//   }
// })

// app.get('/students', (req, res) => {
//   res.send(students);
// })

// app.post('/students', (req, res) => {
//   let studnetArr = req.body.students
//   studnetArr.forEach(student => {
//     students.push(student);
//   });
//   res.status(201).send();
// })

// app.put('/students/marks', auth, instructorRoute, (req, res) => {
//   const semSession = req.body.semSession;
//   const semType = req.body.semType;
//   req.body.students.forEach(student => {
//     for(let i=0; i<students.length; i++){
//       if((student.admNo === students[i].admNo) && student.semNo === students[i].semNo){
//         for(let j=0; j<students[i].subjects.length;j++){
//           if(student.subject.code === students[i].subjects[j].code){
//             students[i].subjects[j].marks = student.subject.marks
//             break;
//           }
//         }
//       }
//     }
//   });
//   // for(let i=0;i<students.length;i++){
//   //   for(let j=0;j<students[i].subjects.length;j++){
//   //     let m = Math.round(Math.random() * 100);
//   //     if(m>35)
//   //       students[i].subjects[j].marks = m;
//   //     else
//   //       students[i].subjects[j].marks = 35;
//   //   }
//   // }
//   populatePendingResult(students);
//   //console.log(pendingResultsForApproval);
//   res.status(200).send({message: "marks updated"});
// })

// app.get('/student/instructor/:instructor/submit', auth, instructorRoute, (req, res) => {
//   let resData = [];
//   //console.log(req.params.instructor);
//   students.forEach(student => {
//     let s=student.subjects.filter((sub) => ((sub.instructor === req.params.instructor) && !sub.marks))
//     //console.log(s);
//     // if(s.length>0){
//     //   resData.push({...student,subjects:s[0]})
//     // }
//     if(s.length>0){
//       s.forEach(subj => {
//         resData.push({...student,subjects:subj})
//       })
//     }
//   });
//   //console.log(resData);
//   res.json(resData);
// })

// app.get('/student/instructor/:instructor/submitted', auth, instructorRoute, (req, res) => {
//   let resData = [];
//   //console.log(req.params.instructor);
//   students.forEach(student => {
//     let s=student.subjects.filter((sub) => ((sub.instructor === req.params.instructor) && sub.marks))
//     //console.log(s);
//     // if(s.length>0){
//     //   resData.push({...student,subjects:s[0]})
//     // }
//     if(s.length>0){
//       s.forEach(subj => {
//         resData.push({...student,subjects:subj})
//       })
//     }
//   });
//   //console.log(resData);
//   res.json(resData);
// })

// app.post('/login', async (req, res) => {
//   // Authenticate User
//   const { username, password } = req.body;
//   //console.log(username, password);
//   if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
//   const foundUser = users.find(user => user.username == username);
//   //console.log("foundUser", foundUser);
//   if (!foundUser) return res.sendStatus(401); //Unauthorized 
//   // evaluate password 
//   const match = await bcrypt.compare(password, foundUser.password);
//   if (match) {
//       // create JWTs
//       const accessToken = generateAccessToken(foundUser)
//       const refreshToken = jwt.sign(
//           { "username": foundUser.username },
//           process.env.REFRESH_TOKEN_SECRET,
//           { expiresIn: '1d' }
//       );
//       // Saving refreshToken with current user
//       const otherUsers = users.filter(person => person.username !== foundUser.username);
//       const currentUser = { ...foundUser, refreshToken };
//       users = [...otherUsers, currentUser];
//       //console.log(refreshToken, "refresh")
//       res.cookie('jwt', refreshToken, { httpOnly: true , maxAge: 24 * 60 * 60 * 1000 });
//       res.json({ ...foundUser, accessToken });
//   } else {
//       res.sendStatus(401);
//   }

// })

// app.delete('/logout', async (req, res) => {
//   // On client, also delete the accessToken
//   const cookies = req.cookies;
//   if (!cookies.jwt) return res.sendStatus(204); //No content
//   const refreshToken = cookies.jwt;

//   // Is refreshToken in db?
//   const foundUser = users.find(person => person.refreshToken === refreshToken);
//   if (!foundUser) {
//       res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//       return res.sendStatus(204);
//   }

//   // Delete refreshToken in db
//   const otherUsers = users.filter(person => person.refreshToken !== foundUser.refreshToken);
//   const currentUser = { ...foundUser, refreshToken: '' };
//   users = [...otherUsers, currentUser];
//   //console.log(users);

//   res.clearCookie('jwt', { httpOnly: true });
//   res.sendStatus(204);
// })

// app.post('/token', async (req, res) => {
//   const cookies = req.cookies;
//   //console.log("cookies:", cookies.jwt)
//     if (!cookies.jwt) return res.status(403).send({message: 'unauthorized'});
//     const refreshToken = cookies.jwt;

//     const foundUser = users.find(person => person.refreshToken === refreshToken);
//     if (!foundUser) return res.status(403).send({message: "forbidden"}); //Forbidden 
//     // evaluate jwt 
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err || foundUser.username !== decoded.username) return res.status(403).send({message: "forbidden"});
//             const accessToken = generateAccessToken(foundUser)
//             res.json({accessToken })
//         }
//     );
// })

// app.get('/results/pending', auth, aDeanRoute, (req, res) => {
//   //console.log("suarsuar");
//   res.json(pendingResultsForApproval);
// })

// app.get('/results/final', auth, aDeanRoute, (req, res) => {
//   //console.log("suarsuar");
//   res.json(finalResults);
// })

// app.get('/results/final-failed', auth, aDeanRoute, (req, res) => {
//   //console.log("suarsuar");
//   res.json(failedFinalResults);
// })

// app.get('/results/final-approved', auth, deanAdeanRoute, (req, res) => {
//   //console.log("suarsuar");
//   res.json(approvedFinalResults);
// })

// app.put('/results/approved', auth, aDeanRoute, (req, res) => {
//   //console.log("results/approved, req.body", req.body)
//   for(let i=0; i<pendingResultsForApproval.length; i++){
//     if((pendingResultsForApproval[i].admNo === req.body.admNo) && (pendingResultsForApproval[i].semNo === req.body.semNo)){
//       approvedResult.push(pendingResultsForApproval[i]);
//       break;
//     }
//   }

//   let newpnedR = pendingResultsForApproval.filter((element) => ((element.admNo !== req.body.admNo) || (element.semNo !== req.body.semNo)))
//   pendingResultsForApproval = newpnedR;
//   const stud = approvedResult.find((e) => ((e.admNo === req.body.admNo) && (e.semNo === req.body.semNo)));
//   if(!stud)
//     return res.send({message: "student not found"});
//   ejs.renderFile(path.join(__dirname, 'views', 'pdf.ejs'), {studentData: stud}, {}, function(err, str) {
//     if (err) return res.status(500).send(err);

//     // str now contains your rendered html
//     const options = {
//       format: 'A4',
//       orientation: 'portrait'
//     }
//     pdf.create(str, options).toFile(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`), function(err, data) {
//       if (err) return res.status(500).send(err);

//       res.send({message: "pdf created"});
//     });
//   });
// })

// app.put('/results/final-approved', auth, aDeanRoute, async(req, res) => {
//   //console.log("results/approved, req.body", req.body)
//   const checkResultsInstegrity = async(resultSign) => {
//     let flag = true;
//     let strArray = [];
//     for(let i=0;i<resultSign.length;i++){
//       strArray.push(pdf2base64(path.join(__dirname, 'results', `result_${resultSign[i].admNo}_${resultSign[i].semNo}.pdf`)))
//     }

//     try{
//       strArray = await Promise.all(strArray);
//     } catch(e){
//       console.log(e);
//       return false;
//     }

//     for(let i=0;i<resultSign.length;i++){
//       let str=strArray[i];
//       str = "0x" + sha256(str);
//       let hexString = Buffer.from(resultSign[i].admNo, 'utf8').toString('hex');
//       hexString =  "0x" + hexString;
//       console.log("resultSign[i].blockNumber", resultSign[i].receipt.blockNumber);
//       let block = await web3.eth.getBlock(resultSign[i].receipt.blockNumber);
//       //console.log("block", block);
//       let blockTransactions = [];
//       for(let i=0;block && block.transactions && i<block.transactions.length;i++){
//         blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//       }
//       blockTransactions = await Promise.all(blockTransactions);
//       let retrievedHash = null;
//       let someascii = null;
//       if(blockTransactions.length){
//         someascii = decoder.decodeData(blockTransactions[0].input);
//         retrievedHash = someascii.inputs[0];
//       }
      
//       if(someascii && someascii.inputs && hexString !== someascii.inputs[1]){
//         flag = false;
//         break;
//       }
//       console.log(retrievedHash);
//       console.log(str);
//       if(retrievedHash !== str){
//         flag = false;
//         break;
//       }
//     }
//     return flag;
//   }

//   let finalR = null;

//   for(let i=0; i<finalResults.length; i++){
//     if(finalResults[i].admNo === req.body.admNo){
//       finalR = finalResults[i];
//       break;
//     }
//   }
//   if(finalR){
//     let integrity = await checkResultsInstegrity(finalR.signDetails);
//     if(integrity){
//       const merger = new pdfMerger();
//       finalR.signDetails.forEach(e => {
//         merger.add(path.join(__dirname, 'results', `result_${e.admNo}_${e.semNo}.pdf`));
//       })
//       await merger.save(path.join(__dirname, 'results', `result_${finalR.admNo}_final.pdf`));
//       let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
//       finalResults = newFinalR;
//       approvedFinalResults.push(finalR);
//       return res.send({message: 'approved'});
//     }
//     else{
//       console.log("not integrity")
//       let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
//       finalResults = newFinalR;
//       failedFinalResults.push(finalR);
//       return res.send({message: 'failed'})
//     }
//   }
//   res.send({message: 'not found'});
// })

// app.put('/results/final-approved-new', auth, aDeanRoute, async(req, res) => {
//   //console.log("results/approved, req.body", req.body)
//   const checkResultsInstegrity1 = async(resLen) => {
//     let flag = true;
//     let strArray = [];
//     for(let i=0;i<resLen;i++){
//       strArray.push(pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${i+1}.pdf`)))
//     }

//     try{
//       strArray = await Promise.all(strArray);
//     } catch(e){
//       console.log(e);
//       return false;
//     }

//     for(let i=0;i<resLen;i++){
//       let str=strArray[i];
//       str = "0x" + sha256(str);
//       let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//       hexString =  "0x" + hexString;
//       let retrievedHash = null;
//       try{
//         retrievedHash = await myContract1.methods.getResult(hexString, i+1).call();
//       } catch(e){
//         console.log(e.message);
//         return res.send(e);
//       }
//       if(retrievedHash !== str){
//         flag = false;
//         break;
//       }
//     }
//     return flag;
//   }

//   let finalR = null;

//   for(let i=0; i<finalResults.length; i++){
//     if(finalResults[i].admNo === req.body.admNo){
//       finalR = finalResults[i];
//       break;
//     }
//   }
//   if(finalR){
//     let integrity = await checkResultsInstegrity1(finalR.signDetails.length);
//     if(integrity){
//       const merger = new pdfMerger();
//       finalR.signDetails.forEach(e => {
//         merger.add(path.join(__dirname, 'results', `result_${e.admNo}_${e.semNo}.pdf`));
//       })
//       await merger.save(path.join(__dirname, 'results', `result_${finalR.admNo}_final.pdf`));
//       let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
//       finalResults = newFinalR;
//       approvedFinalResults.push(finalR);
//       return res.send({message: 'approved'});
//     }
//     else{
//       console.log("not integrity")
//       let newFinalR = finalResults.filter((e) => e.admNo !== req.body.admNo)
//       finalResults = newFinalR;
//       failedFinalResults.push(finalR);
//       return res.send({message: 'failed'})
//     }
//   }
//   res.send({message: 'not found'});
// })

// app.get('/results/approved', auth, deanAdeanRoute, (req, res) => {
//   res.json(approvedResult);
// })

// app.get('/results/signed', auth, deanRoute, (req, res) => {
//   res.json(signedResult);
// })

// app.get('/results/final-signed', auth, deanRoute, (req, res) => {
//   res.json(signedFinalResults);
// })

// app.post('/result/storeHash', auth, deanRoute , async (req, res) => {
//   console.log("req.body", req.body)
//   let str=null;
//   let studentResult=null;
//   for(let i=0; i<approvedResult.length; i++){
//     if((approvedResult[i].admNo === req.body.admNo) && (approvedResult[i].semNo === req.body.semNo)){
//       studentResult = approvedResult[i];
//       try{
//           str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`))
//           //console.log(str);
//       } catch(e){
//           console.log(e, "error in pdf64");
//       }
//       str = "0x" + sha256(str);
//       break;
//     }
//   }

//   if(!str){
//     return res.send({message: "no result to approve"});
//   }
  
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;
//   let signDetail = null;
//   try{
//     await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
//     let receipt = await myContract.methods.storeHash(str, hexString)
//     .send({from:process.env.SMART_CONTRACT_OWNER});

//     let block = await web3.eth.getBlock(receipt.blockHash);
//     //console.log("block", block);
//     let blockTransactions = [];
//     for(let i=0;i<block.transactions.length;i++){
//       blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//     }
//     blockTransactions = await Promise.all(blockTransactions);
//     //console.log("blockTransactions", blockTransactions);
//     let someascii = decoder.decodeData(blockTransactions[0].input);
//     //console.log("someascii", someascii);
//     signDetail = {
//       admNo: req.body.admNo,
//       semNo: req.body.semNo,
//       receipt: receipt,
//       block: block,
//       transaction: blockTransactions[0],
//       data: someascii
//     }
//   }
//   catch(e){
//     console.log(e);
//   }
//   console.log(signDetail);
//   console.log("signedResult", signedResult);
//   if(signDetail){
//     let newApprovedResult = approvedResult.filter((e) => ((e.admNo !== req.body.admNo) || (e.semNo !== req.body.semNo)))
//     approvedResult = [...newApprovedResult];
//     let findFlag = false;
//     for(let i=0;i<signedResult.length;i++){
//       if(signedResult[i].admNo === studentResult.admNo){
//         findFlag = true;
//         signedResult[i].signDetails.push(signDetail);
//         signedResult[i].results.push({
//           semNo: studentResult.semNo,
//           semType: studentResult.semType,
//           semSession: studentResult.semSession,
//           subjects: studentResult.subjects
//         })
//         break;
//       }
//     }
//     if(!findFlag){
//       let details = [];
//       details.push(signDetail);
//       let studentDetails = {
//         name: studentResult.name,
//         admNo: studentResult.admNo,
//         course: studentResult.course, 
//         courseDuration: studentResult.courseDuration,
//         yearOfAdmission: studentResult.yearOfAdmission,
//         department: studentResult.department,
//         results: [],
//         signDetails: details
//       }
//       let resultDetails = {
//         semNo: studentResult.semNo,
//         semType: studentResult.semType,
//         semSession: studentResult.semSession,
//         subjects: studentResult.subjects
//       }
//       studentDetails.results.push(resultDetails);
//       signedResult.push(studentDetails);
//     }
//   }
//   populateFinalResults();
//   //console.log(signDetail);
//   res.send(signDetail);
// })

// app.post('/result/storeHash-new', auth, deanRoute , async (req, res) => {
//   console.log("req.body", req.body)
//   let str=null;
//   let studentResult=null;
//   for(let i=0; i<approvedResult.length; i++){
//     if((approvedResult[i].admNo === req.body.admNo) && (approvedResult[i].semNo === req.body.semNo)){
//       studentResult = approvedResult[i];
//       try{
//           str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_${req.body.semNo}.pdf`))
//           //console.log(str);
//       } catch(e){
//           console.log(e, "error in pdf64");
//       }
//       str = "0x" + sha256(str);
//       break;
//     }
//   }

//   if(!str){
//     return res.send({message: "no result to approve"});
//   }
  
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;
//   let signDetail = null;
//   try{
//     await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
//     let receipt = await myContract1.methods.storeResult(str, hexString, parseInt(req.body.semNo))
//     .send({from:process.env.SMART_CONTRACT_OWNER});

//     let block = await web3.eth.getBlock(receipt.blockHash);
//     //console.log("block", block);
//     let blockTransactions = [];
//     for(let i=0;i<block.transactions.length;i++){
//       blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//     }
//     blockTransactions = await Promise.all(blockTransactions);
//     //console.log("blockTransactions", blockTransactions);
//     let someascii = decoder1.decodeData(blockTransactions[0].input);
//     //console.log("someascii", someascii);
//     signDetail = {
//       admNo: req.body.admNo,
//       semNo: req.body.semNo,
//       receipt: receipt,
//       block: block,
//       transaction: blockTransactions[0],
//       data: someascii
//     }
//   }
//   catch(e){
//     console.log(e);
//   }
//   console.log(signDetail);
//   console.log("signedResult", signedResult);
//   if(signDetail){
//     let newApprovedResult = approvedResult.filter((e) => ((e.admNo !== req.body.admNo) || (e.semNo !== req.body.semNo)))
//     approvedResult = [...newApprovedResult];
//     let findFlag = false;
//     for(let i=0;i<signedResult.length;i++){
//       if(signedResult[i].admNo === studentResult.admNo){
//         findFlag = true;
//         signedResult[i].signDetails.push(signDetail);
//         signedResult[i].results.push({
//           semNo: studentResult.semNo,
//           semType: studentResult.semType,
//           semSession: studentResult.semSession,
//           subjects: studentResult.subjects
//         })
//         break;
//       }
//     }
//     if(!findFlag){
//       let details = [];
//       details.push(signDetail);
//       let studentDetails = {
//         name: studentResult.name,
//         admNo: studentResult.admNo,
//         course: studentResult.course, 
//         courseDuration: studentResult.courseDuration,
//         yearOfAdmission: studentResult.yearOfAdmission,
//         department: studentResult.department,
//         results: [],
//         signDetails: details
//       }
//       let resultDetails = {
//         semNo: studentResult.semNo,
//         semType: studentResult.semType,
//         semSession: studentResult.semSession,
//         subjects: studentResult.subjects
//       }
//       studentDetails.results.push(resultDetails);
//       signedResult.push(studentDetails);
//     }
//   }
//   populateFinalResults();
//   //console.log(signDetail);
//   res.send(signDetail);
// })

// app.post('/result-final/storeHash', auth, deanRoute , async (req, res) => {
//   console.log("req.body", req.body)
//   let str=null;
//   let studentResult=null;
//   for(let i=0; i<approvedFinalResults.length; i++){
//     if(approvedFinalResults[i].admNo === req.body.admNo){
//       studentResult = approvedFinalResults[i];
//       try{
//           str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_final.pdf`))
//           //console.log(str);
//       } catch(e){
//           console.log(e, "error in pdf64");
//       }
//       str = "0x" + sha256(str);
//       break;
//     }
//   }

//   if(!str){
//     return res.send({message: "no result to approve"});
//   }
  
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;
//   let signDetail = null;
//   try{
//     await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
//     let receipt = await myContract.methods.storeHash(str, hexString)
//     .send({from:process.env.SMART_CONTRACT_OWNER});

//     let block = await web3.eth.getBlock(receipt.blockHash);
//     //console.log("block", block);
//     let blockTransactions = [];
//     for(let i=0;i<block.transactions.length;i++){
//       blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//     }
//     blockTransactions = await Promise.all(blockTransactions);
//     //console.log("blockTransactions", blockTransactions);
//     let someascii = decoder.decodeData(blockTransactions[0].input);
//     //console.log("someascii", someascii);
//     signDetail = {
//       admNo: req.body.admNo,
//       receipt: receipt,
//       block: block,
//       transaction: blockTransactions[0],
//       data: someascii
//     }
//   }
//   catch(e){
//     console.log(e);
//   }
//   console.log(signDetail);
//   console.log("signedResult", signedResult);
//   if(signDetail){
//     let newApprovedFresult = approvedFinalResults.filter((e) => e.admNo !== req.body.admNo)
//     approvedFinalResults = [...newApprovedFresult];
//     studentResult.signDetails = [signDetail];
//     signedFinalResults.push(studentResult);
//   }
//   console.log(signDetail);
//   res.send(signDetail);
// })

// app.post('/result-final/storeHash-new', auth, deanRoute , async (req, res) => {
//   console.log("req.body", req.body)
//   let str=null;
//   let studentResult=null;
//   for(let i=0; i<approvedFinalResults.length; i++){
//     if(approvedFinalResults[i].admNo === req.body.admNo){
//       studentResult = approvedFinalResults[i];
//       try{
//           str = await pdf2base64(path.join(__dirname, 'results', `result_${req.body.admNo}_final.pdf`))
//           //console.log(str);
//       } catch(e){
//           console.log(e, "error in pdf64");
//       }
//       str = "0x" + sha256(str);
//       break;
//     }
//   }

//   if(!str){
//     return res.send({message: "no result to approve"});
//   }
  
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;
//   let signDetail = null;
//   try{
//     await web3.eth.personal.unlockAccount(process.env.SMART_CONTRACT_OWNER, process.env.SMART_CONTRACT_OWNER_CODE)
//     let receipt = await myContract1.methods.storeResult(str, hexString, parseInt(req.body.semNo))
//     .send({from:process.env.SMART_CONTRACT_OWNER});

//     let block = await web3.eth.getBlock(receipt.blockHash);
//     //console.log("block", block);
//     let blockTransactions = [];
//     for(let i=0;i<block.transactions.length;i++){
//       blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//     }
//     blockTransactions = await Promise.all(blockTransactions);
//     //console.log("blockTransactions", blockTransactions);
//     let someascii = decoder.decodeData(blockTransactions[0].input);
//     //console.log("someascii", someascii);
//     signDetail = {
//       admNo: req.body.admNo,
//       receipt: receipt,
//       block: block,
//       transaction: blockTransactions[0],
//       data: someascii
//     }
//   }
//   catch(e){
//     console.log(e);
//   }
//   console.log(signDetail);
//   console.log("signedResult", signedResult);
//   if(signDetail){
//     let newApprovedFresult = approvedFinalResults.filter((e) => e.admNo !== req.body.admNo)
//     approvedFinalResults = [...newApprovedFresult];
//     studentResult.signDetails = [signDetail];
//     signedFinalResults.push(studentResult);
//   }
//   console.log(signDetail);
//   res.send(signDetail);
// })

// app.post('/result/verify', upload.single('result'), async (req, res) => {
//   //console.log(req.file);
//   //console.log(req.body.admNo);
//   let str=null;
//   try{
//       str = await pdf2base64(`./results/${req.file.filename}`)
//   } catch(e){
//       //console.log(e)
//       return res.send(e);
//   }
//   str = "0x" + sha256(str);
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;

//   //const retrievedHash = await myContract.methods.getHash(hexString).call();

//   let block = await web3.eth.getBlock(req.body.blockNo);
//   //console.log("block", block);
//   let blockTransactions = [];
//   for(let i=0;block && block.transactions && i<block.transactions.length;i++){
//     blockTransactions.push(web3.eth.getTransaction(block.transactions[i]));
//   }
//   blockTransactions = await Promise.all(blockTransactions);
//   let retrievedHash = null;
//   let someascii = null;
//   if(blockTransactions.length){
//      someascii = decoder.decodeData(blockTransactions[0].input);
//      retrievedHash = someascii.inputs[0];
//   }

//   fs.unlink(path.join(__dirname, 'results', `${req.file.filename}`), (err) => {
//     if(err)
//       console.log(err);
//     console.log(`${req.file.filename} deleted successfully`);
//   })
  
//   if(someascii && someascii.inputs && hexString !== someascii.inputs[1]){
//      return res.send({verdict: "hash mismatched"})
//   }

//   if(retrievedHash !== str)
//     return res.send({verdict: "hash mismatched"})
//   res.send({verdict:"verified"});
// })

// app.post('/result/verify-new', upload.single('result'), async (req, res) => {
//   //console.log(req.file);
//   //console.log(req.body.admNo);
//   let str=null;
//   try{
//       str = await pdf2base64(`./results/${req.file.filename}`)
//   } catch(e){
//       //console.log(e)
//       return res.send(e);
//   }
//   str = "0x" + sha256(str);
//   let hexString = Buffer.from(req.body.admNo, 'utf8').toString('hex');
//   hexString =  "0x" + hexString;

//   const retrievedHash = await myContract1.methods.getResult(hexString, parseInt(req.body.semNo)).call();

//   fs.unlink(path.join(__dirname, 'results', `${req.file.filename}`), (err) => {
//     if(err)
//       console.log(err);
//     console.log(`${req.file.filename} deleted successfully`);
//   })

//   if(retrievedHash !== str)
//     return res.send({verdict: "hash mismatched"})
//   res.send({verdict:"verified"});
// })

sequelize
.sync({alter: true})
.then(()=>{
    app.listen(4000, () => console.log('app is listening on port 4000!'));
})

