const express = require('express');

const adminController = require('../controllers/admin');
const { auth } = require('../middlewares/auth');
const { adminRoute } = require('../middlewares/roles');


const router = express.Router();

router.get('/users', auth, adminRoute, adminController.getUsers);
router.post('/users', auth, adminRoute, adminController.createUsers);


router.get('/students', auth, adminRoute, adminController.getStudents);
router.post('/students', auth, adminRoute, adminController.createStudents);

router.get('/student/:id', auth, adminRoute, adminController.getStudent);
router.post('/student', auth, adminRoute, adminController.createStudent);
router.put('/student/:id', auth, adminRoute, adminController.updateStudent);
router.delete('/student/:id', auth, adminRoute, adminController.removeStudent);


router.get('/employees', auth, adminRoute, adminController.getEmployees);
router.post('/employees', auth, adminRoute, adminController.createEmployees);

router.get('/employee/:id', auth, adminRoute, adminController.getEmployee);
router.post('/employee', auth, adminRoute, adminController.createEmployee);
router.put('/employee/:id', auth, adminRoute, adminController.updateEmployee);
router.delete('/employee/:id', auth, adminRoute, adminController.removeEmployee);


router.get('/departments', auth, adminRoute, adminController.getDepartments);
router.post('/departments', auth, adminRoute, adminController.createDepartments);

router.get('/department/:id', auth, adminRoute, adminController.getDepartment);
router.post('/department', auth, adminRoute, adminController.createDepartment);
router.put('/department/:id', auth, adminRoute, adminController.updateDepartment);
router.delete('/department/:id', auth, adminRoute, adminController.removeDepartment);


router.get('/courses', auth, adminRoute, adminController.getCourses);
router.post('/courses', auth, adminRoute, adminController.createCourses);

router.get('/course/:id', auth, adminRoute, adminController.getCourse);
router.post('/course', auth, adminRoute, adminController.createCourse);
router.put('/course/:id', auth, adminRoute, adminController.updateCourse);
router.delete('/course/:id', auth, adminRoute, adminController.removeCourse);


router.get('/semesters', auth, adminRoute, adminController.getSemesters);
router.post('/semesters', auth, adminRoute, adminController.createSemesters);

router.get('/semester/:id', auth, adminRoute, adminController.getSemester);
router.post('/semester', auth, adminRoute, adminController.createSemester);
router.put('/semester/:id', auth, adminRoute, adminController.updateSemester);
router.delete('/semester/:id', auth, adminRoute, adminController.removeSemester);


router.get('/instructors', auth, adminRoute, adminController.getInstructors);
router.post('/instructors', auth, adminRoute, adminController.createInstructors);

router.get('/instructor/:id', auth, adminRoute, adminController.getInstructor);
router.post('/instructor', auth, adminRoute, adminController.createInstructor);
router.put('/instructor/:id', auth, adminRoute, adminController.updateInstructor);
router.delete('/instructor/:id', auth, adminRoute, adminController.removeInstructor);


module.exports = router;