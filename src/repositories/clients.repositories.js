import { db } from "../database/database.connection.js";

export async function getClientDB(phone) {
    try {
        const clientData = await db.query(`SELECT * FROM clients WHERE phone=$1`, [phone]);
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