const bcrypt = require('bcrypt');

const { intToStringId, stringToIntId, } = require('../utils/transformers');
const { 
    Student,
    Employee,
    Department,
    Course, 
    User, 
    Instructor,
    Semester
} = require('../models')


module.exports = {
    getStudents: async (req, res, next) => {
        let allStudents;        

        try{
            allStudents = await Student.findAll();
        }catch(err){
            return next(err);
        }

        allStudents = allStudents.map((student) => {
            const stringId = intToStringId(student.id);
            return {
                id: stringId,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: student.departmentId,
                courseId: student.courseId
            };
        });
        return res.json(allStudents);
    },

    createStudents: async (req, res, next) => {
        let createdStudents;

        try{
            createdStudents =  await Student.bulkCreate(req.body.students, { returning: true });
        } catch(err){
            return next(err);
        }

        createdStudents = createdStudents.map((student) => {
            const stringId = intToStringId(student.id);
            return {
                id: stringId,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: student.departmentId,
                courseId: student.courseId
            };
        });
        return res.json(createdStudents);
    },

    getStudent: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedStudent;

        try{
            fetchedStudent = await Student.findOne({
                where: {
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedStudent){
            return res.status(404).send({msg: 'student not found'});
        }

        const stringId = intToStringId(fetchedStudent.id);
        return res.json({
            id: stringId,
            adm_no: fetchedStudent.adm_no,
            s_name: fetchedStudent.s_name,
            year_of_adm: fetchedStudent.year_of_adm,
            gender: fetchedStudent.gender,
            major1: fetchedStudent.major1,
            major2: fetchedStudent.major2,
            departmentId: fetchedStudent.departmentId,
            courseId: fetchedStudent.courseId
        });
    },

    createStudent: async (req, res, next) => {
        let createdStudent;

        try{
            createdStudent =  await Student.create(req.body);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdStudent.id);

        return res.json({
            id: stringId,
            adm_no: createdStudent.adm_no,
            s_name: createdStudent.s_name,
            year_of_adm: createdStudent.year_of_adm,
            gender: createdStudent.gender,
            major1: createdStudent.major1,
            major2: createdStudent.major2,
            departmentId: createdStudent.departmentId,
            courseId: createdStudent.courseId
        });
    },

    updateStudent: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedStudent;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedStudent = await Student.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedStudent);
    },

    removeStudent: async (req, res) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedStudent;

        try{
            removedStudent = await Student.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedStudent);
    },

    getEmployees: async (req, res, next) => {
        let allEmployees;

        try {
            allEmployees = await Employee.findAll();
        } catch(err){
            return next(err);
        }

        allEmployees = allEmployees.map((emp) => {
            const stringId = intToStringId(emp.id);
            return {
                id: stringId,
                emp_name: emp.emp_name,
                e_type: emp.e_type,
                e_role: emp.e_role,
                gender: emp.gender
            };
        });
        return res.json(allEmployees);
    },

    createEmployees: async (req, res, next) => {
        let createdEmployees;

        try{
            createdEmployees =  await Employee.bulkCreate(req.body.employees, { returning: true });
        } catch(err){
            return next(err);
        }

        createdEmployees = createdEmployees.map((emp) => {
            const stringId = intToStringId(emp.id);
            return {
                id: stringId,
                emp_name: emp.emp_name,
                e_type: emp.e_type,
                e_role: emp.e_role,
                gender: emp.gender
            };
        })
        return res.json(createdEmployees);
    },

    getEmployee: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedEmployee;

        try{
            fetchedEmployee = await Employee.findOne({
                where: {
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        if(!fetchedEmployee){
            return res.status(404).send({msg: 'employe not found'});
        }
       
        const stringId = intToStringId(fetchedEmployee.id);
        return res.json({
            id: stringId,
            emp_name: fetchedEmployee.emp_name,
            e_type: fetchedEmployee.e_type,
            e_role: fetchedEmployee.e_role,
            gender: fetchedEmployee.gender
        });
    },

    createEmployee: async (req, res) => {
        let createdEmployee;

        try{
            createdEmployee =  await Employee.create(req.body);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdEmployee.id);
        return res.json({
            id: stringId,
            emp_name: createdEmployee.emp_name,
            e_type: createdEmployee.e_type,
            e_role: createdEmployee.e_role,
            gender: createdEmployee.gender
        });
    },

    updateEmployee: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedEmployee;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedEmployee = await Employee.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedEmployee);
    },

    removeEmployee: async (req, res) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedEmployee;

        try{
            removedEmployee = await Employee.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedEmployee);
    },

    getDepartments: async (req, res, next) => {
        let allDepartments;

        try {
            allDepartments = await Department.findAll();
        } catch(err){
            return next(err);
        }

        allDepartments = allDepartments.map((dept) => {
            const stringId = intToStringId(dept.id);
            return {
                id: stringId,
                d_code: dept.d_code,
                d_name: dept.d_name,
                head: dept.head
            };
        });
        return res.json(allDepartments);
    },

    createDepartments: async (req, res, next) => {
        let createdDepartments;

        try {
            createdDepartments = await Department.bulkCreate(req.body.departments, { returning: true });
        } catch(err){
            return next(err);
        }

        createdDepartments = createdDepartments.map((dept) => {
            const stringId = intToStringId(dept.id);
            return {
                id: stringId,
                d_code: dept.d_code,
                d_name: dept.d_name,
                head: dept.head
            };
        });
        return res.json(createdDepartments);
    },

    getDepartment: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedDepartment;

        try{
            fetchedDepartment =  await Department.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedDepartment){
            return res.status(404).send({msg: 'department not found'});
        }
        
        const stringId = intToStringId(fetchedDepartment.id);
        return res.json({
            id: stringId,
            d_code: fetchedDepartment.d_code,
            d_name: fetchedDepartment.d_name,
            head: fetchedDepartment.head
        });
    },

    createDepartment: async (req, res, next) => {
        let createdDepartment;

        try{
            createdDepartment =  await Department.create(req.body);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdDepartment.id);
        return res.json({
            id: stringId,
            d_code: createdDepartment.d_code,
            d_name: createdDepartment.d_name,
            head: createdDepartment.head
        });
    },

    updateDepartment: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedDepartment;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedDepartment = await Department.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedDepartment);
    },

    removeDepartment: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedDepartment;

        try{
            removedDepartment = await Department.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedDepartment);
    },

    createCourses: async (req, res, next) => {
        let createdCourses;

        try{
            createdCourses =  await Course.bulkCreate(req.body.courses, { 
                returning: true,
            });
        } catch(err){
            return next(err);
        }
        
        createdCourses = createdCourses.map((course) => {
            const stringId = intToStringId(course.id);
            return {
                id: stringId,
                c_name: course.c_name,
                c_duration: course.c_duration
            };
        });
        return res.json(createdCourses);
    },

    getCourses: async (req, res, next) => {
        let allCourses;

        try {
            allCourses = await Course.findAll();
        } catch(err){
            return next(err);
        }
        
        allCourses = allCourses.map((course) => {
            const stringId = intToStringId(course.id);
            return {
                id: stringId,
                c_name: course.c_name,
                c_duration: course.c_duration
            }
        })
        return res.json(allCourses);
    },

    createCourse: async (req, res, next) => {
        let createdCourse;

        try{
            createdCourse =  await Course.create(req.body);
        } catch(err){
            return next(err);
        }
       
        const stringId = intToStringId(createdCourse.id);
        return res.json({
            id: stringId,
            c_name: createdCourse.c_name,
            c_duration: createdCourse.c_duration
        });
    },

    getCourse: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedCourse;

        try{
            fetchedCourse =  await Course.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedCourse){
            return res.status(404).send({msg: 'course not found'});
        }
        
        const stringId = intToStringId(fetchedCourse.id);
        return res.json({
            id: stringId,
            c_name: fetchedCourse.c_name,
            c_duration: fetchedCourse.c_duration
        });
    },

    updateCourse: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedCourse;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedCourse = await Course.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedCourse);
    },

    removeCourse: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedCourse;

        try{
            removedCourse = await Course.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedCourse);
    }, 

    createUsers: async (req, res, next) => {
        let reqUsers = req.body.users.map(async(r_user) => {
            const hashedPasscode = await bcrypt.hash(r_user.passcode, 10);
            return {...r_user, passcode: hashedPasscode};
        })
        reqUsers = await Promise.all(reqUsers);
        let createdUsers;

        try {
            createdUsers = await User.bulkCreate(reqUsers, { returning: true });
        } catch(err){
            return next(err);
        }

        createdUsers = createdUsers.map((user) => {
            const stringId = intToStringId(user.id);
            return {
                id: stringId,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: user.employeeId,
                studentId: user.studendId
            };
        })
        return res.json(createdUsers);
    },

    getUsers: async (req, res, next) => {
        let allUsers;

        try {
            allUsers = await User.findAll();
        } catch(err){
            return next(err);
        }

        allUsers = allUsers.map((user) => {
            const stringId = intToStringId(user.id);
            return {
                id: stringId,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: user.employeeId,
                studentId: user.studendId
            };
        });
        return res.json(allUsers);
    },

    createUser: async (req, res, next) => {
        const hashedPasscode = await bcrypt.hash(req.body.passcode, 10);
        const reqUser = {...req.body, passcode: hashedPasscode};
        let createdUser;

        try{
            createdUser =  await User.create(reqUser);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdUser.id);
        return res.json({
            id: stringId,
            user_name: createdUser.user_name,
            user_role: createdUser.user_role,
            user_type: createdUser.user_type,
            employeeId: createdUser.employeeId,
            studentId: createdUser.studentId
        });
    },

    getUser: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedUser;

        try{
            fetchedUser =  await User.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedUser){
            return res.status(404).send({msg: 'user not found'});
        }
        
        const stringId = intToStringId(fetchedUser.id);
        return res.json({
            id: stringId,
            user_name: fetchedUser.user_name,
            user_role: fetchedUser.user_role,
            user_type: fetchedUser.user_type,
            employeeId: fetchedUser.employeeId,
            studentId: fetchedUser.studentId
        });
    },

    updateUser: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedUser;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedUser = await User.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedUser);
    },

    removeUser: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedUser;

        try{
            removedUser = await User.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedUser);
    },

    getInstructors: async (req, res, next) => {
        let allInstructors;

        try {
            allInstructors = await Instructor.findAll();
        } catch(err){
            return next(err);
        }

        allInstructors = allInstructors.map((instructor) => {
            const stringId = intToStringId(instructor.id);
            return {
                id: stringId,
                cv_link: instructor.cv_link,
                departmentId: instructor.departmentId,
                employeeId: instructor.employeeId
            };
        })
        return res.json(allInstructors);
    },

    createInstructors: async (req, res, next) => {
        let createdInstructors;

        try {
            createdInstructors = await Instructor.bulkCreate(req.body.instructors, { returning: true });
        } catch(err){
            return next(err);
        }

        createdInstructors = createdInstructors.map((instructor) => {
            const stringId = intToStringId(instructor.id);
            return {
                id: stringId,
                cv_link: instructor.cv_link,
                departmentId: instructor.departmentId,
                employeeId: instructor.employeeId
            };
        });
        return res.json(createdInstructors);
    },

    getInstructor: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedInstructor;

        try{
            fetchedInstructor =  await Instructor.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedInstructor){
            return res.status(404).send({msg: 'instructor not found'});
        }
       
        const stringId = intToStringId(fetchedInstructor.id);
        return res.json({
            id: stringId,
            cv_link: fetchedInstructor.cv_link,
            departmentId: fetchedInstructor.departmentId,
            employeeId: fetchedInstructor.employeeId
        });
    },

    createInstructor: async (req, res, next) => {
        let createdInstructor;

        try{
            createdInstructor =  await Instructor.create(req.body);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdInstructor.id);
        return res.json({
            id: stringId,
            cv_link: createdInstructor.cv_link,
            departmentId: createdInstructor.departmentId,
            employeeId: createdInstructor.employeeId
        });
    },

    updateInstructor: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedInstructor;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedInstructor = await Instructor.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedInstructor);
    },

    removeInstructor: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedInstructor;

        try{
            removedInstructor = await Instructor.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedInstructor);
    },

    createSemesters: async (req, res, next) => {
        let createdSemesters;

        try {
            createdSemesters = await Semester.bulkCreate(req.body.semesters, { returning: true });
        } catch(err){
            return next(err);
        }

        createdSemesters = createdSemesters.map((sem) => {
            const stringId = intToStringId(sem.id);
            return {
                id: stringId,
                sem_session: sem.sem_session,
                sem_type: sem.sem_type
            };
        });
        return res.json(createdSemesters);
    },

    getSemesters: async (req, res, next) => {
        let allSemesters;

        try {
            allSemesters = await Semester.findAll();
        } catch(err){
            return next(err);
        }

        allSemesters = allSemesters.map((sem) => {
            const stringId = intToStringId(sem.id);
            return {
                id: stringId,
                sem_session: sem.sem_session,
                sem_type: sem.sem_type
            };
        })
        return res.json(allSemesters);
    }, 

    createSemester: async (req, res, next) => {
        let createdSemester;

        try{
            createdSemester =  await Semester.create(req.body);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdSemester.id);
        return res.json({
            id: stringId,
            sem_session: createdSemester.sem_session,
            sem_type: createdSemester.sem_type
        });
    },

    getSemester: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedSemester;

        try{
            fetchedSemester =  await Semester.findOne({
                where:{
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSemester){
            return res.status(404).send({msg: 'semester not found'});
        }
       
        const stringId = intToStringId(fetchedSemester.id);
        return res.json({
            id: stringId,
            sem_session: fetchedSemester.sem_session,
            sem_type: fetchedSemester.sem_type
        });
    },

    updateSemester: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedSemester;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedSemester = await Semester.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedSemester);
    },

    removeSemester: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedSemester;

        try{
            removedSemester = await Semester.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedSemester);
    }
}