import db from "../models/index"
import bcrypt from 'bcryptjs';
// const db = require("../models/index");
// const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    //let check = true;
                    if (check) {
                        userData.errorCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                        // userData.errorCode = 3;
                        // userData.errMessage = 'Wrong Password';
                    } else {
                        userData.errorCode = 3;
                        userData.errMessage = 'Wrong Password';
                        //userData.errorCode = 0;
                        // userData.errMessage = 'Ok',
                        //     userData.user = user;
                    }
                } else {
                    userData.errorCode = 2;
                    userData.errMessage = `User's not found`
                }


            } else {
                //return error
                userData.errorCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email!`

            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = '';
            if(userId ==='ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                });
               
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            resolve(users);
        }
        catch (e) {
            reject(e)
        }
    })
}
let createNewUser =(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email does not exist
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    message: `Your's Email is already exist in your system. Plz try other email!`
                })
            }
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

            resolve({
                errCode: 0,
                message:'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser =(userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        if(!foundUser){
            resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }

        await db.User.destroy({
            where: {id: userId}
        })

        resolve({
            errCode: 0,
            errMessage: 'The user is deleted'
        })
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser
}