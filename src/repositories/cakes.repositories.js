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

export async function getCakeNameDB({ cakeId, name }) {
    try {
        let cakeData = ([]);
        //console.log("cakeId", cakeId);
        //console.log("cakeId", !!cakeId);
        //console.log("name", name);
        //console.log("name", !!name);
        if (name) {
            cakeData = await db.query(`SELECT * FROM cakes WHERE name=$1`, [name]);
        }
        else if (cakeId) {
            cakeData = await db.query(`SELECT * FROM cakes WHERE id=$1`, [cakeId]);
        }
        //console.log(cakeData.rows);
        return cakeData.rows;
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


