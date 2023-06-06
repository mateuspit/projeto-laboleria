import { postOrdersDB, getAllOrdersDataEdited, getDeliveredStatus, postTrueDeliveredStatus } from "../repositories/orders.repositories.js";

export async function isDeliveredController(req, res) {
    try {
        if (isNaN(req.params.id)) return res.status(400).send("Formato invalido!")
        const ordersDataByIdEdited = await getAllOrdersDataEdited(req.params);
        if (!ordersDataByIdEdited.length) return res.status(404).send("Não existe essa ordem de compra");
        const isDelivered = await getDeliveredStatus(req.params);
        //console.log("isDelivered",isDelivered);
        //console.log("isDelivered",!!isDelivered);
        if (isDelivered) return res.status(409).send("Esta entrega já foi feita");

        postTrueDeliveredStatus(req.params)

        return res.status(204).send("Marcado como entrega feita!")
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

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