import { postClientsDB, getAllClientOrdersDB } from "../repositories/clients.repositories.js";

export async function getAllClientOrdersController(req, res) {
    try {
        const allClientOrders = await getAllClientOrdersDB(req.params);
        if (!allClientOrders.length) return res.status(404).send("Esse cliente não existe ou não tem pedidos");
        return res.status(200).send(allClientOrders);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postClientsController(req, res) {
    try {
        await postClientsDB(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}