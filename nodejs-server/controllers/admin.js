const { intToStringId, stringToIntId, } = require('../utils/transformers');
const { 
    Student,
    Employee,
    Department,
    Course, 
    User, 
    Instructor
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
            const stringDepartmentId = intToStringId(student.departmentId);
            const stringCourseId = intToStringId(student.courseId);
            return {
                id: stringId,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                courseId: stringCourseId,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: stringDepartmentId
            }
        });

        return res.json(allStudents);
    },

    createStudents: async (req, res, next) => {
        const reqStudents = req.body.students.map((stud) => {
            const intCourseId = stringToIntId(stud.courseId);
            const intDepartmentId = stringToIntId(stud.departmentId);
            return { ...stud, courseId: intCourseId, departmentId: intDepartmentId };
        });
        let createdStudents;

        try{
            createdStudents =  await Student.bulkCreate(reqStudents, { returning: true });
        } catch(err){
            return next(err);
        }

        createdStudents = createdStudents.map((student) => {
            const stringId = intToStringId(student.id);
            const stringDepartmentId = intToStringId(student.departmentId);
            const stringCourseId = intToStringId(student.courseId);
            return {
                id: stringId,
                adm_no: student.adm_no,
                s_name: student.s_name,
                year_of_adm: student.year_of_adm,
                courseId: stringCourseId,
                gender: student.gender,
                major1: student.major1,
                major2: student.major2,
                departmentId: stringDepartmentId
            }
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
        const stringDepartmentId = intToStringId(fetchedStudent.departmentId);
        const stringCourseId = intToStringId(fetchedStudent.courseId);
        return res.json({
            id: stringId,
            adm_no: fetchedStudent.adm_no,
            s_name: fetchedStudent.s_name,
            year_of_adm: fetchedStudent.year_of_adm,
            courseId: stringCourseId,
            gender: fetchedStudent.gender,
            major1: fetchedStudent.major1,
            major2: fetchedStudent.major2,
            departmentId: stringDepartmentId
        });
    },

    createStudent: async (req, res, next) => {
        const intCourseId = stringToIntId(req.body.courseId);
        const intDepartmentId = stringToIntId(req.body.departmentId);
        const reqStudent = { ...req.body, courseId: intCourseId, departmentId: intDepartmentId };
        let createdStudent;

        try{
            createdStudent =  await Student.create(reqStudent);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdStudent.id);
        const stringDepartmentId = intToStringId(createdStudent.departmentId);
        const stringCourseId = intToStringId(createdStudent.courseId);
        return res.json({
            id: stringId,
            adm_no: createdStudent.adm_no,
            s_name: createdStudent.s_name,
            year_of_adm: createdStudent.year_of_adm,
            courseId: stringCourseId,
            gender: createdStudent.gender,
            major1: createdStudent.major1,
            major2: createdStudent.major2,
            departmentId: stringDepartmentId
        });
    },

    updateStudent: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let reqStudent = req.body;
        if(reqStudent.id){
            const intId = stringToIntId(reqStudent.id);
            reqStudent = {...reqStudent, id: intId};
        }
        if(reqStudent.departmentId){
            const intDepartmentId = stringToIntId(reqStudent.departmentId);
            reqStudent = {...reqStudent, departmentId: intDepartmentId};
        }
        if(reqStudent.courseId){
            const intCourseId = stringToIntId(reqStudent.courseId);
            reqStudent = {...reqStudent, intCourseId: intCourseId};
        }

        let updatedStudent;

        try{
            updatedStudent = await Student.update(reqStudent, {
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
            }
        });

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
        let reqEmployee = req.body;
        if(reqEmployee.id){
            const intId = stringToIntId(reqEmployee.id);
            reqEmployee = {...reqEmployee, id: intId};
        }

        let updatedEmployee;

        try{
            updatedEmployee = await Employee.update(reqEmployee, {
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
            const stringHead = intToStringId(dept.head);
            return {
                id: stringId,
                d_name: dept.d_name,
                d_code: dept.d_code,
                head: stringHead
            };
        });

        return res.json(allDepartments);
    },

    createDepartments: async (req, res, next) => {
        const reqDepartments = req.body.departments.map((dept) => {
            const intHead = stringToIntId(dept.head);
            return { ...dept, head: intHead};
        })
        let createdDepartments;
        try {
            createdDepartments = await Department.bulkCreate(reqDepartments, { returning: true });
        } catch(err){
            return next(err);
        }

        createdDepartments = createdDepartments.map((dept) => {
            const stringId = intToStringId(dept.id);
            const stringHead = intToStringId(dept.head);
            return {
                id: stringId,
                d_name: dept.d_name,
                d_code: dept.d_code,
                head: stringHead
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
        const stringHead = intToStringId(fetchedDepartment.head);
        return res.json({
            id: stringId,
            d_name: fetchedDepartment.d_name,
            d_code: fetchedDepartment.d_code,
            head: stringHead
        });
    },

    createDepartment: async (req, res, next) => {
        const intHead = stringToIntId(req.body.head);
        const reqDepartment = {...req.body, head:intHead};
        let createdDepartment;

        try{
            createdDepartment =  await Department.create(reqDepartment);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdDepartment.id);
        const stringHead = intToStringId(createdDepartment.head);
        return res.json({
            id: stringId,
            d_name: createdDepartment.d_name,
            d_code: createdDepartment.d_code,
            head: stringHead
        });
    },

    updateDepartment: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let reqDepartment = req.body;
        if(reqDepartment.id){
            const intId = stringToIntId(reqStudent.id);
            reqDepartment = {...reqDepartment, id: intId};
        }
        if(reqDepartment.head){
            const intHeadId = stringToIntId(reqDepartment.head);
            reqDepartment = {...reqDepartment, head: intHeadId};
        }
        let updatedDepartment;

        try{
            updatedDepartment = await Department.update(reqDepartment, {
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
            };
        });
        
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
        let reqCourse = req.body;
        if(reqCourse.id){
            const intId = stringToIntId(reqCourse.id);
            reqCourse = {...reqCourse, id: intId};
        }

        let updatedCourse;

        try{
            updatedCourse = await Course.update(reqCourse, {
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
        const reqUsers = req.body.users.map((user) => {
            let intEmployeeId = null;
            let intStudentId = null;
            if(user.employeeId){
                intEmployeeId = stringToIntId(user.employeeId);
            }
            if(user.studentId){
                intStudentId = stringToIntId(user.studentId);
            }
            return { ...user, employeeId: intEmployeeId, studentId: intStudentId };
        })
        let createdUsers;

        try {
            createdUsers = await User.bulkCreate(reqUsers, { returning: true });
        } catch(err){
            return next(err);
        }

        createdUsers = createdUsers.map((user) => {
            const stringId = intToStringId(user.id);
            let stringEmployeeId = null;
            let stringStudentId = null;
            if(user.employeeId){
                stringEmployeeId = intToStringId(user.employeeId);
            }
            if(user.studentId){
                stringStudentId = intToStringId(user.studentId);
            }
            return {
                id: stringId,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: stringEmployeeId,
                studentId: stringStudentId
            };
        });

        return res.json(createdUsers);
    },

    getUsers: async (req, res, next) => {
        let allUsers;
        try {
            allUsers = await Users.findAll();
        } catch(err){
            return next(err);
        }
        allUsers = allUsers.map((user) => {
            const stringId = intToStringId(user.id);
            let stringEmployeeId = null;
            let stringStudentId = null;
            if(user.employeeId){
                stringEmployeeId = intToStringId(user.employeeId);
            }
            if(user.studentId){
                stringStudentId = intToStringId(user.studentId);
            }
            return {
                id: stringId,
                user_name: user.user_name,
                user_role: user.user_role,
                user_type: user.user_type,
                employeeId: stringEmployeeId,
                studentId: stringStudentId
            };
        });

        return res.json(allUsers);
    },

    createUser: async (req, res, next) => {
        let reqUsers = req.body.users;
        let intEmployeeId = null;
        let intStudentId = null;
        if(req.body.employeeId){
            intEmployeeId = stringToIntId(req.body.employeeId);
        }
        if(req.body.studentId){
            intStudentId = stringToIntId(req.body.studentId);
        }
        const reqUser = {...req.body, employeeId: intEmployeeId, studentId: intStudentId};
        let createdUser;

        try{
            createdUser =  await User.create(reqUser);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdUser.id);
        let stringEmployeeId = null;
        let stringStudentId = null;
        if(createdUser.employeeId){
            stringEmployeeId = intToStringId(createdUser.employeeId);
        }
        if(createdUser.studentId){
            stringStudentId = intToStringId(createdUser.studentId);
        }
        return res.json({
            id: stringId,
            user_name: createdUser.user_name,
            user_role: createdUser.user_role,
            user_type: createdUser.user_type,
            employeeId: stringEmployeeId,
            studentId: stringStudentId
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
        let stringEmployeeId = null;
        let stringStudentId = null;
        if(fetchedUser.employeeId){
            stringEmployeeId = intToStringId(fetchedUser.employeeId);
        }
        if(fetchedUser.studentId){
            stringStudentId = intToStringId(fetchedUser.studentId);
        }
        return res.json({
            id: stringId,
            user_name: fetchedUser.user_name,
            user_role: fetchedUser.user_role,
            user_type: fetchedUser.user_type,
            employeeId: stringEmployeeId,
            studentId: stringStudentId
        });
    },

    updateUser: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let reqUser = req.body;
        if(reqUser.id ){
            const intId = stringToIntId(reqUser.id);
            reqUser = {...reqUser, id: intId};
        }
        if(reqUser.employeeId){
            let stringEmployeeId = intToStringId(fetchedUser.employeeId);
            reqUser = {...reqUser, employeeId: stringEmployeeId};
        }
        if(reqUser.studentId){
            let stringStudentId = intToStringId(fetchedUser.studentId);
            reqUser = {...reqUser, studentId: stringStudentId};
        }
        let updatedDepartment;

        try{
            updatedDepartment = await User.update(reqUser, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(reqUser);
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
        allInstructors = allInstructors.map((inst) => {
            const stringId = intToStringId(inst.id);
            const stringEmployeeId = intToStringId(inst.employeeId);
            const stringDepartmentId = intToStringId(inst.departmentId);
            return {
                id: stringId,
                cv_link: inst.cv_link,
                employeeId: stringEmployeeId,
                studentId: stringDepartmentId
            };
        });

        return res.json(allInstructors);
    },

    createInstructors: async (req, res, next) => {
        const reqInstructors = req.body.departments.map((inst) => {
            const intEmployeeId = stringToIntId(inst.employeeId);
            const intDepartmentId = stringToIntId(inst.departmentId);
            return { ...inst, employeeId: intEmployeeId, departmentId: intDepartmentId};
        })
        let createdInstructors;
        try {
            createdDepartments = await Instructor.bulkCreate(reqInstructors, { returning: true });
        } catch(err){
            return next(err);
        }

        createdInstructors = createdInstructors.map((inst) => {
            const stringId = intToStringId(inst.id);
            const stringEmployeeId = intToStringId(inst.employeeId);
            const stringDepartmentId = intToStringId(inst.departmentId);
            return {
                id: stringId,
                cv_link: inst.cv_link,
                employeeId: stringEmployeeId,
                studentId: stringDepartmentId
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
        const stringEmployeeId = intToStringId(fetchedInstructor.employeeId);
        const stringDepartmentId = intToStringId(fetchedInstructor.departmentId);
        return res.json({
            id: stringId,
            cv_link: fetchedInstructor.cv_link,
            employeeId: stringEmployeeId,
            studentId: stringDepartmentId
        });
    },

    createInstructor: async (req, res, next) => {
        const intEmployeeId = stringToIntId(req.body.employeeId);
        const intDepartmentId = stringToIntId(req.body.departmentId);
        const reqInstructor = {...req.body, employeeId: intEmployeeId, departmentId: intDepartmentId};
        let createdInstructor;

        try{
            createdInstructor =  await Department.create(reqInstructor);
        } catch(err){
            return next(err);
        }
        
        const stringId = intToStringId(createdInstructor.id);
        const stringEmployeeId = intToStringId(createdInstructor.employeeId);
        const stringDepartmentId = intToStringId(createdInstructor.departmentId);
        return res.json({
            id: stringId,
            cv_link: createdInstructor.cv_link,
            employeeId: stringEmployeeId,
            studentId: stringDepartmentId
        });
    },

    updateInstructor: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        
        const intDepartmentId = stringToIntId(req.body.departmentId);
        let reqInstructor = req.body;
        if(reqInstructor.id){
            const intId = stringToIntId(reqInstructor.id);
            reqInstructor = {...reqInstructor, id: intId};
        }
        if(reqInstructor.employeeId){
            const intEmployeeId = stringToIntId(reqInstructor.employeeId);
            reqInstructor = {...reqInstructor, employeeId: intEmployeeId};
        }
        if(reqInstructor.departmentId){
            const intDepartmentId = stringToIntId(reqInstructor.departmentId);
            reqInstructor = {...reqInstructor, departmentId: intDepartmentId};
        }
        let updatedInstructor;

        try{
            updatedInstructor = await Instructor.update(reqInstructor, {
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
}