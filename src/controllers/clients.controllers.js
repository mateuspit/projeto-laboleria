import { postClientsDB } from "../repositories/clients.repositories.js";

export async function postClientsController(req, res) {
    try {
        await postClientsDB(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}