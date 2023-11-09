import bcrypt from 'bcryptjs';
import db from '../models/index';
import { resolve } from 'path';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('Ok! Create a new user succeed')

        } catch (e) {
            reject(e.message);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e.message);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
               
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{resolve();}
            
        } catch (e) {
           console.log(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    updateUserData: updateUserData
}