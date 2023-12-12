const { reject } = require("lodash")
const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {

        // imageBase64: '',
        // descriptionHTML: '',
        // descriptionMarkdown: ''
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let dataSpecialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (dataSpecialty) {
                dataSpecialty.name = data.name;
                dataSpecialty.image = data.imageBase64;
                dataSpecialty.descriptionHTML = data.descriptionHTML;
                dataSpecialty.descriptionMarkdown = data.descriptionMarkdown;
                await dataSpecialty.save();
            }
            resolve({
                errCode: 0,
                errMessage: 'Update the specialty successfully'
            });
        } catch (e) {
            reject({
                errCode: 1,
                errMessage: 'Specialty not found'
            });
        }
    })
}

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let foundSpecialty = await db.Specialty.findOne({
            where: { id: specialtyId }
        })
        if (!foundSpecialty) {
            resolve({
                errCode: 2,
                errMessage: `The specialty isn't exist`
            })
        }

        await db.Specialty.destroy({
            where: { id: specialtyId }
        })

        resolve({
            errCode: 0,
            errMessage: 'The Specialty is deleted'
        })
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({

            });
            if (data && data.lenghth > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'OK',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'image', 'descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
                } else data = {}
                resolve({
                    errMessage: 'OK',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    updateSpecialty: updateSpecialty,
    deleteSpecialty: deleteSpecialty
}