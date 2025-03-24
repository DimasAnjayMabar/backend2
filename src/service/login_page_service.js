import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response_error.js"
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/login_page_validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const registerUser = validate(registerUserValidation, request)

    const findExistingUser = await prismaClient.user.count({
        where : {
            username : registerUser.username
        }
    })

    if(findExistingUser === 1){
        throw new ResponseError(400, "username already exist")
    }

    registerUser.password = await bcrypt.hash(registerUser.password, 10)

    const result = await prismaClient.user.create({
        data : registerUser,
        select : {
            username : true
        }
    })

    return result
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            userId: true,
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Invalid username or password");
    }

    const passwordIsValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!passwordIsValid) {
        throw new ResponseError(401, "Invalid username or password");
    }

    // Generate new token
    const token = uuid();

    // Update user record with new token
    const updatedUser = await prismaClient.user.update({
        where: { userId: user.userId },
        data: { token: token },
        select: { token: true }
    });

    return updatedUser;
};

const get = async (token) => {
    token = validate(getUserValidation, token)

    const user = await prismaClient.user.findUnique({
        where : {
            token : token
        }, 
        select : {
            username : true, 
            name : true, 
            email : true, 
            phone : true, 
            profilePicture : true
        }
    })

    if(!user){
        throw new ResponseError(404, "user not found")
    }

    return user
}

const verify = async(headers) => {
    const token = headers.authorization

    if(!token){
        throw new ResponseError(401, "unauthorized")
    }

    const user = await prismaClient.user.findUnique({
        where : {token : token}, 
        select : {
            username : true, 
            name : true, 
            email : true, 
            phone : true,
            profilePicture : true
        }
    })

    if(!user){
        throw new ResponseError(401, "invalid token")
    }

    return user
}

const logout = async(headers) => {
    const token = headers.authorization

    if(!token){
        throw new ResponseError(401, "unauthorized")
    }

    return prismaClient.user.update({
        where: {
            token: token
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

export default { 
    register, login, get, logout, verify
}