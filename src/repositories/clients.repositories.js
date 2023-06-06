import { db } from "../database/database.connection.js";

export async function getAllClientOrdersDB({ id }) {
    try {
        const clientOrdersData = await db.query(`
            SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", cakes.name AS "cakeName"
            FROM orders
            INNER JOIN clients ON orders."clientId" = clients.id
            INNER JOIN cakes ON orders."cakeId" = cakes.id
            WHERE clients.id = $1;
        `, [id]);
        return clientOrdersData.rows;
    }
    catch (err) {
        return res.status(500).res(err.message);
    }
}

export async function getClientDB({ phone, clientId }) {
    try {
        let clientData = ([]);
        //console.log("phone", phone);
        //console.log("clientId", clientId);
        if (phone) {
            clientData = await db.query(`SELECT * FROM clients WHERE phone=$1`, [phone]);
        }
        else if (clientId) {
            clientData = await db.query(`SELECT * FROM clients WHERE id=$1`, [clientId]);
        }
        //console.log(clientData.rows);
        return clientData.rows;
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postClientsDB({ name, address, phone }) {
    try {
        await db.query(`INSERT INTO clients(name, address, phone) 
                            VALUES ($1, $2, $3);`, [name, address, phone]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}