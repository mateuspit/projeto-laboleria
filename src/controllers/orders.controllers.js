import { postOrdersDB, getAllOrdersDataEdited } from "../repositories/orders.repositories.js";

export async function getOrdersController(req, res) {
    try {
        const allOrdersDataEdited = await getAllOrdersDataEdited(req.query.date);
        //console.log(allOrdersDataEdited);
        if (!allOrdersDataEdited.length) return res.status(404).send(allOrdersDataEdited)
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