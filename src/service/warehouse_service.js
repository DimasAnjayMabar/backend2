import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response_error.js"
import { addDistributor } from "../validation/distributor_validation.js"

const newProduct = async (req) => {
    if(!req.user){
        throw new ResponseError(403, "Forbidden")
    }

    const productData = validate(addDistributor, req.body)

    return await prismaClient.warehouse.create({
        data: productData
    })
}

const deleteProduct = async (req) => {
    if(!req.user){
        throw new ResponseError(403, "Forbidden")
    }

    const {productId} = req.params

    const id = Number(productId)

    if (isNaN(id)) {
        throw new ResponseError(400, "Invalid distributor ID");
    }

    try{
        
    }catch(e){
        throw new ResponseError(404, "Distributor not found");
    }
}
