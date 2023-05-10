const express = require('express');

const router = express.Router();

router.put('/students/marks', auth, instructorRoute, (req, res) => {
    
    })

router.get('/student/instructor/:instructor/submit', auth, instructorRoute, (req, res) => {
    let resData = [];
    //console.log(req.params.instructor);
    students.forEach(student => {
        let s=student.subjects.filter((sub) => ((sub.instructor === req.params.instructor) && !sub.marks))
        //console.log(s);
        // if(s.length>0){
        //   resData.push({...student,subjects:s[0]})
        // }
        if(s.length>0){
        s.forEach(subj => {
            resData.push({...student,subjects:subj})
        })
        }
    });
    //console.log(resData);
    res.json(resData);
})

router.get('/student/instructor/:instructor/submitted', auth, instructorRoute, (req, res) => {
    let resData = [];
    //console.log(req.params.instructor);
    students.forEach(student => {
        let s=student.subjects.filter((sub) => ((sub.instructor === req.params.instructor) && sub.marks))
        //console.log(s);
        // if(s.length>0){
        //   resData.push({...student,subjects:s[0]})
        // }
        if(s.length>0){
        s.forEach(subj => {
            resData.push({...student,subjects:subj})
        })
        }
    });
    //console.log(resData);
    res.json(resData);
})

module.exports = router;