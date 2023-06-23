const Course = require('./course');
const Department = require('./department');
const Employee = require('./employee');
const Instructor = require('./instructor');
const Semester = require('./semester');
const Student = require('./student');
const Subject = require('./subjects');
const User = require('./users');
const SubOffering = require('./subOffering');
const StudentSubjectRegistration = require('./studentSubjectRegistration');

module.exports = {
    Course, 
    Department,
    Employee,
    Instructor,
    Semester,
    Student,
    Subject,
    User,
    SubOffering,
    StudentSubjectRegistration,
    associations: () => {
        Department.hasMany(Instructor, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Instructor.belongsTo(Department);
    
        Employee.hasOne(Instructor, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Instructor.belongsTo(Employee);
    
        Course.hasMany(Student, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Student.belongsTo(Course);
    
        Department.hasMany(Subject, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Subject.belongsTo(Department);
    
        Department.hasMany(Student, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Student.belongsTo(Department);
    
        Employee.hasMany(User, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        User.belongsTo(Employee);
    
        Student.hasOne(User, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        User.belongsTo(Student);
    
        Employee.hasOne(Department, {
            foreignKey: {
                name: 'head',
                unique: true
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Department.belongsTo(Employee, {
            foreignKey: 'head',
        });

        Subject.belongsToMany(Semester, { through: SubOffering });
        Semester.belongsToMany(Subject, { through: SubOffering });

        Instructor.hasMany(SubOffering, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        SubOffering.belongsTo(Instructor);

        Student.belongsToMany(SubOffering, { through: StudentSubjectRegistration });
        SubOffering.belongsToMany(Student, { through: StudentSubjectRegistration });
    }   
}

