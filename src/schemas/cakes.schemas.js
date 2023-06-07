import Joi from "joi";

export const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().greater(0).precision(2).required(),
    image: Joi.string().min(1).required().uriuri({
        scheme: ['http', 'https'],
    }),
    description: Joi.string().min(0),
    flavourId: Joi.number().min(1)
});

export const flavourSchema = Joi.object({
    name: Joi.string().min(2).required()
});