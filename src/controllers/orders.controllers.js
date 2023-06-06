import { postOrdersDB } from "../repositories/orders.repositories.js";

export async function postOrdersController(req, res) {
    try {
        await postOrdersDB(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}