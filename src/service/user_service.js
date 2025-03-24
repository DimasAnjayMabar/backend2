import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response_error.js"

const editName = async(req) => {
    const token = req.headers.authorization
    const newName = req.body.name

    if(!token){
        throw new ResponseError(401, "unauthorized")
    }

    const updatedUser = await prismaClient.user.update({
        where: {token : token}, 
        data: {name: newName},
        select: {userId: true}
    })

    const userHistory = await prismaClient.userHistory.create({
        data: {
            userId: updatedUser.userId, 
            description: `updated name to ${newName}`
        }
    })
    
    return {
        updatedUser, 
        userHistory
    }
}

const editPhone = async(req) => {
    const token = req.headers.authorization
    const newPhone = req.body.phone

    if(!token){
        throw new ResponseError(401, "unauthorized")
    }

   const updatedUser = await prismaClient.user.update({
        where: {token: token}, 
        data: {phone: newPhone}, 
        select: {userId: true}
   })

   const userHistory = await prismaClient.userHistory.create({
        data: {
            userId: updatedUser.userId, 
            description: `updated phone to ${newPhone}`
        }
   })

   return {
        updatedUser, 
        userHistory
   }
}

const editEmail = async(req) => {
    const token = req.headers.authorization
    const newEmail = req.body.email

    if(!token){
        throw new ResponseError(401, "unauthorized")
    }

    const updatedUser = await prismaClient.user.update({
        where: {token: token},
        data: {email: newEmail}, 
        select: {userId: true}
    })

    const userHistory = await prismaClient.userHistory.create({
        data: {
            userId: updatedUser.userId, 
            description: `updated email to ${newEmail}`
        }
    })
}

export default {
    editName, editPhone, editEmail
}