import specialtyService from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from this server'
        })
    }
}

let updateSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.updateSpecialty(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json(
            {
                errCode: -1,
                message: 'error from server',
            }
        )
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty()
        //let infor = await specialtyService.getAllspecialty();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from this server'
        })
    }
}
let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from this server'
        })
    }
}
let deleteSpecialty = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }
    let message = await specialtyService.deleteSpecialty(req.query.id);
    return res.status(200).json(message);
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    updateSpecialty: updateSpecialty,
    deleteSpecialty: deleteSpecialty
}