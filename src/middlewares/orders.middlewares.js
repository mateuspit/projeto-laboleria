import { getCakeNameDB } from "../repositories/cakes.repositories.js";
import { getClientDB } from "../repositories/clients.repositories.js";

export default function validateOrderInfo(schema) {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        try {
            const clientData = await getClientDB(req.body);
            if (!clientData.length) return res.status(404).send("Cliente não existe!");
            const cakeData = await getCakeNameDB(req.body);
            if (!cakeData.length) return res.status(404).send("Bolo não existe!");
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
        next();
    }
}