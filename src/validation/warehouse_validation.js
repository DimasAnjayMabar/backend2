import Joi from "joi";

const addProduct = Joi.object({
    productName : Joi.string().required(), 
    dateAdded : Joi.date().required(), 
    distributorId : Joi.number().required(), 
    productPrice : Joi.number().required(),
    percentProfit : Joi.number().required(), 
    productStock : Joi.number().required(), 
    categoryId : Joi.number().required()
})

export{
    addProduct
}