import userService from "../services/userService";
import CRUDService from "../services/CRUDService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    // check email exist
    //compare password
    // return userInfor
    // access_token:JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
        //userData
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;    //all, id
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
    
}
let handleCreateNewUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
   let data = req.body;
   let message = await CRUDService.updateUserData(data);
   return res.status(200).json(message);

}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let updateUserData =  (data) => {
    return new Promise (async (resolve, reject) => {
        try{
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
          
            let user = await db.User.findOne({
            where: {id: data.id},
            raw : false
            })
            if(user ){
                user.firstName= data.firstName,
                user.lastName= data.lastName,
                user.address= data.address
                await user.save();
            }
            resolve({
                errCode: 0,
                errMessage: 'Update the user successfully'
            });
        }catch(e){
            reject({
                errCode: 1,
                errMessage: 'User not found'
            });
        }
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUsers:handleCreateNewUsers,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    updateUserData:updateUserData
}