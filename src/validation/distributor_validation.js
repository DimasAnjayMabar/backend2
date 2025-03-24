import Joi from 'joi'

const addDistributor = Joi.object({
    distributorName : Joi.string().required(),
    distributorPhone : Joi.string().required(),
    distributorEmail : Joi.string().allow(null, ""),
    distributorProfilePicture : Joi.string().allow(null, ""), 
    distributorEcommerceLink : Joi.string().allow(null, "")
})

export {
    addDistributor
}