import instance from "@/apis";
import qs from "querystring";

async function userLogin(userData) {
    const params = {
        userId: userData.userId,
        userPassword: userData.userPassword
    }
    return await instance.post('/users/login', qs.stringify(params));
}

async function userJoin(userData) {
    const params = {
        userId: userData.userId,
        userPassword: userData.userPassword,
        userName: userData.userName,
        userPhone: userData.userPhone,
    }

    return await instance.post("/users", qs.stringify(params));
}

async function overlapUser(userId) {
    const params = {
        userId,
    }
    return await instance.post("/users/overlap", qs.stringify(params));
}

export {
    userLogin,
    userJoin,
    overlapUser,
}