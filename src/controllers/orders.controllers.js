import { postOrdersDB, getAllOrdersDataEdited } from "../repositories/orders.repositories.js";

export async function getOrdersByIdController(req, res) {
    try {
        const ordersDataByIdEdited = await getAllOrdersDataEdited(req.params);
        if (!ordersDataByIdEdited.length) return res.status(404).send(ordersDataByIdEdited);
        return res.status(200).send(ordersDataByIdEdited);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getOrdersController(req, res) {
    try {
        const allOrdersDataEdited = await getAllOrdersDataEdited(req.query);
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