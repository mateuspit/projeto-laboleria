import { db } from "../database/database.connection.js";

export async function postFlavoursDB({ name }) {
    try {
        db.query(`
            INSERT INTO flavours (name) VALUES ($1);
        `, [name]);
        //db.query(`
        //    INSERT INTO flavours (name) VALUES $1;
        //`, [name]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postCakesDB({ name, price, description, image, flavourId }) {
    try {
        db.query(`INSERT INTO cakes (name, price, image, description, "flavourId")
                     VALUES ($1, $2, $3, $4, $5)`, [name, price, description, image, flavourId])
    }
    catch (err) {
        return res.status(500).send("err.message");
    }
}

export async function getCakeNameDB({ cakeId, name }) {
    try {
        let cakeData = ([]);
        if (name) {
            cakeData = await db.query(`SELECT * FROM cakes WHERE name=$1`, [name]);
        }
        else if (cakeId) {
            cakeData = await db.query(`SELECT * FROM cakes WHERE id=$1`, [cakeId]);
        }
        return cakeData.rows;
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getFlavourDB({ flavourId, name }) {
    try {
        let result = ([]);
        if (flavourId) {
            result = await db.query(`SELECT name FROM flavours WHERE id=$1`, [flavourId]);
        }
        else if (name) {
            result = await db.query(`SELECT name FROM flavours WHERE name=$1`, [name]);
        }
        return result.rows;
    } catch (err) {
        throw err;
    }
}


