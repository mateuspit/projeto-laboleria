import { db } from "../database/database.connection.js";

export async function postCakesDB({ name, price, description, image, flavourId }) {
    try {
        db.query(`INSERT INTO cakes (name, price, image, description, "flavourId")
                     VALUES ($1, $2, $3, $4, $5)`, [name, price, description, image, flavourId])
    }
    catch (err) {
        return res.status(500).send("err.message");
    }
}

export async function getCakeNameDB(cakeName) {
    try {
        const result = await db.query(`SELECT name FROM cakes WHERE name=$1`, [cakeName]);
        return result.rows;
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getFlavourDB(flavourName) {
    try {
        //console.log("getFlavourDB");
        const result = await db.query(`SELECT name FROM flavours WHERE id=$1`, [flavourName]);
        //SELECT id FROM flavours WHERE id=1
        //console.log("result.rows", result.rows);
        return result.rows;
    } catch (err) {
        throw err;
    }
}


