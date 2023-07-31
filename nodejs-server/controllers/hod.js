const {
    Subject
} = require('../models');

module.exports = {
    createSubjects: async (req, res, next) => {
        let createdSubjects;

        try{
            createdSubjects =  await Subject.bulkCreate(req.body.subjects, { returning: true });
        } catch(err){
            return next(err);
        }

        createdSubjects = createdSubjects.map((sub) => {
            const stringId = intToStringId(sub.id);
            return {
                id: stringId,
                sub_code: sub.sub_code,
                sub_name: sub.sub_name,
                departmentId: sub.departmentId
            };
        });
        return res.json(createdSubjects);
    },

    getSubjects: async (req, res, next) => {
        let allSubjects;        

        try{
            allSubjects = await Subject.findAll();
        }catch(err){
            return next(err);
        }

        allSubjects = allSubjects.map((sub) => {
            const stringId = intToStringId(sub.id);
            return {
                id: stringId,
                sub_code: sub.sub_code,
                sub_name: sub.sub_name,
                departmentId: sub.departmentId
            };
        });
        return res.json(allSubjects);
    },
    
    createSubject: async (req, res, next) => {
        let createdSubject;

        try{
            createdSubject =  await Subject.create(req.body);
        } catch(err){
            return next(err);
        }

        const stringId = intToStringId(createdSubject.id);

        return res.json({
            id: stringId,
            sub_code: createdSubject.sub_code,
            sub_name: createdSubject.sub_name,
            departmentId: createdSubject.departmentId
        });
    },

    getSubject: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let fetchedSubject;

        try{
            fetchedSubject = await Subject.findOne({
                where: {
                    id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        if(!fetchedSubject){
            return res.status(404).send({msg: 'subject not found'});
        }

        const stringId = intToStringId(fetchedSubject.id);
        return res.json({
            id: stringId,
            sub_code: fetchedSubject.sub_code,
            sub_name: fetchedSubject.sub_name,
            departmentId: fetchedSubject.departmentId
        });
    },

    updateSubject: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let updatedSubject;

        if(req.body.id){
            return res.status(400).send({'msg': 'cannot update id'});
        }

        try{
            updatedSubject = await Subject.update(req.body, {
                where: {
                  id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }

        return res.json(updatedSubject);
    },

    removeSubject: async (req, res, next) => {
        const intParamsId = stringToIntId(req.params.id);
        let removedSubject;

        try{
            removedSubject = await Subject.destroy({
                where: {
                id: intParamsId
                }
            });
        } catch(err){
            return next(err);
        }
        
        return res.json(removedSubject);
    },

    createSubOfferings: async (req, res, next) => {

    },

    getSubOfferings: async (req, res, next) => {

    },

    createSubOffering: async (req, res, next) => {

    },

    getSubOffering: async (req, res, next) => {

    },

    updateSubOffering: async (req, res, next) => {

    },

    removeSubOffering: async (req, res, nexr) => {
        
    }
}