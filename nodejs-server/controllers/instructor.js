const { intToStringId, stringToIntId, } = require('../utils/transformers');
const { 
    StudentSubjectRegistration
} = require('../models')

module.exports = {
    updateStudentsMarks: async (req, res, next) => {
        
    },

    getUnsubmittedMarksStudents: async (req, res, next) => {
        const studentSubReg = await StudentSubjectRegistration.findAll({
            include: {
                all: true,
                nested: true
            }
        })

        console.log(studentSubReg);
        return res.json(studentSubReg);
    },

    getSubmittedMarksStudents: () => {

    }
}