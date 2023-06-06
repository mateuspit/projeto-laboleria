import { postOrdersDB, getAllOrdersDataEdited } from "../repositories/orders.repositories.js";

export async function getOrdersController(req, res) {
    try {
        const allOrdersDataEdited = await getAllOrdersDataEdited();
        //console.log(allOrdersDataEdited);
        return res.status(200).send(allOrdersDataEdited);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postOrdersController(req, res) {
    try {
        await postOrdersDB(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}