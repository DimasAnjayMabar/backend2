import Joi from 'joi'

const editNameValidation = Joi.string().required()

const editPhoneValidation = Joi.string().required()

const editEmailValidation = Joi.string().required()

export{
    editEmailValidation, editNameValidation, editPhoneValidation
}