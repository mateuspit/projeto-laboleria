import { getClientDB } from "../repositories/clients.repositories.js";

export default function validateClientInfo(schema) {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        try {
            const clientExists = await getClientDB(req.body.phone);
            if (clientExists.length) return res.status(409).send("Já existe um cliente com esse número");
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
        next();
    };
}