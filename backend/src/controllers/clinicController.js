import clinicService from '../services/clinicService'
let createClinic =async (req,res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
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
let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic()
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
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id, req.query.location)
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
module.exports = {
    createClinic: createClinic,
    getAllClinic:getAllClinic,
    getDetailClinicById:getDetailClinicById,
}