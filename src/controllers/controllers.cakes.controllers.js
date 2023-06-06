import { postCakesDB } from "../repositories/cakes.repositories.js";

export async function postCakesController(req, res) {
    //const { name, price, description, image, flavourId } = req.body;
    try {
        await postCakesDB(req.body);
        //db.query(`INSERT INTO cakes (name, price, image, description, "flavourId")
        //             VALUES ($1, $2, $3, $4, $5)`, [name, price, description, image, flavourId])
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}