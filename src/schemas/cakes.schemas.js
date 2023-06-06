import Joi from "joi";

export default cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().greater(0).precision(2).required(),
    image: Joi.string().min(1).required().dataUri(),
    description: Joi.string()
});