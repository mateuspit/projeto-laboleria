import { db } from "../database/database.connection.js";

export async function postOrdersDB({ clientId, cakeId, quantity, totalPrice }) {
    try {
        await db.query(`INSERT INTO orders("clientId", "cakeId", quantity, "totalPrice", "createdAt")
               VALUES ($1, $2, $3, $4, NOW())`, [clientId, cakeId, quantity, totalPrice]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}