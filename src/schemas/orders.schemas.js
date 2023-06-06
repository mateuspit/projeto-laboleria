import Joi from "joi";

const orderSchema = Joi.object({
    clientId: Joi.number().min(1).integer().required(),
    cakeId: Joi.number().min(1).integer().required(),
    quantity: Joi.number().greater(0).max(5).integer().required(),
    totalPrice: Joi.number().greater(0).required()
});

export default orderSchema;