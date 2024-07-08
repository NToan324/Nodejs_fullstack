import bcrypt from 'bcrypt';
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId
            })
            resolve('Created Successful');
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, //easy look
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getInfoUserFromId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoData = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            resolve(infoData);
        } catch (e) {
            reject(e);
        }
    })
}

let updateInfoUserFromId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoData = await db.User.findOne({
                where: { id: data.id },
            });
            await infoData.update({
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address
            });
            await infoData.save();
            let allUserAfterUpdate = await db.User.findAll();
            resolve(allUserAfterUpdate);
        } catch (e) {
            reject(e)
        }
    })
}

let deleteInfoUserFromId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoUser = await db.User.findOne({
                where: { id: userId }
            });
            if (infoUser) {
                await infoUser.destroy();
                let dataAfterDelete = await db.User.findAll();
                resolve(dataAfterDelete);
            } else resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getInfoUserFromId: getInfoUserFromId,
    updateInfoUserFromId: updateInfoUserFromId,
    deleteInfoUserFromId: deleteInfoUserFromId
}