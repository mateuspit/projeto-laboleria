import { getCakeNameDB, getFlavourDB } from "../repositories/cakes.repositories.js";

export function validateCakeInfo(schema) {

    return async (req, res, next) => {
        //console.log(req.body);
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map((ed) => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);

        try {
            //const cakeExists = await db.query(`SELECT name FROM cakes WHERE name=$1`, [req.body.name]);
            //const flavourExists = await getFlavourDB(req.body.flavourId)
            const flavourExists = await getFlavourDB(req.body)
            if (!flavourExists.length) return res.status(404).send("Sabor não existe!");
            const cakeExists = await getCakeNameDB(req.body);
            if (cakeExists.length) return res.status(409).send("Bolo já existente");
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
        next();
    };
}

export function validateFlavourInfo(schema) {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send("Palavra muito pequena!");
        try {
            const flavourExists = await getFlavourDB(req.body)
            if (flavourExists.length) return res.status(409).send("Bolo já existente");
        }
        catch (err) {
            return res.status(500).send(err.message);
        }
        next();
    };
}