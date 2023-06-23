const express = require('express');

const adminController = require('../controllers/admin');


const router = express.Router();

router.get('/students', adminController.getStudents);
router.post('/students', adminController.createStudents);

router.get('/student/:id', adminController.getStudent);
router.post('/student', adminController.createStudent);
router.put('/student/:id', adminController.updateStudent);
router.delete('/student/:id', adminController.removeStudent);

router.get('/employees', adminController.getEmployees);
router.post('/employees', adminController.createEmployees);

router.get('/employee/:id', adminController.getEmployee);
router.post('/employee', adminController.createEmployee);
router.put('/employee/:id', adminController.updateEmployee);
router.delete('/employee/:id', adminController.removeEmployee);

router.get('/departments', adminController.getDepartments);
router.post('/departments', adminController.createDepartments);

router.get('/department/:id', adminController.getDepartment);
router.post('/department', adminController.createDepartment);
router.put('/department/:id', adminController.updateDepartment);
router.delete('/department/:id', adminController.removeDepartment);

router.get('/courses', adminController.getCourses);
router.post('/courses', adminController.createCourses);

router.get('/course/:id', adminController.getCourse);
router.post('/course', adminController.createCourse);
router.put('/course/:id', adminController.updateCourse);
router.delete('/course/:id', adminController.removeCourse);

module.exports = router;