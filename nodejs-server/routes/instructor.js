const express = require('express');

const instructorController = require('../controllers/instructor');

const router = express.Router();

router.put('/:instructorId/students-marks', instructorController.updateStudentsMarks);

router.get('/:instructorId/students-marks/submit', instructorController.getUnsubmittedMarksStudents);

router.get('/:instructorId/students-marks/submitted', instructorController.getSubmittedMarksStudents)

module.exports = router;