import db from "../models/index"
import bcrypt from 'bcryptjs';
// const db = require("../models/index");
// const bcrypt = require('bcryptjs');

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

module.exports = {
    handleUserLogin: handleUserLogin
}