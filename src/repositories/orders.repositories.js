import { db } from "../database/database.connection.js";

export async function postTrueDeliveredStatus({ id }) {
    try {
        await db.query(`
            UPDATE orders SET "isDelivered" = true WHERE id = $1
        `, [id]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getDeliveredStatus({ id }) {
    try {
        const isDelivered = await db.query(`
            SELECT "isDelivered" FROM orders WHERE id=$1
        `, [id]);
        return isDelivered.rows[0].isDelivered;
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getAllOrdersDataEdited({ date, id }) {
    try {
        let getData = ([]);
        //console.log(date);
        //poderia trabalhar com string para montar a query e diminuir linha mas n vou fazer isso kkk
        if (date) {
            getData = await db.query(`SELECT
                clients.id AS "client.id",
                clients.name AS "client.name",
                clients.address AS "client.address",
                clients.phone AS "client.phone",
                cakes.id AS "cake.id",
                cakes.name AS "cake.name",
                cakes.price AS "cake.price",
                cakes.description AS "cake.description",
                cakes.image AS "cake.image",
                flavours.name AS "cake.flavour",
                orders.id AS "orderId",
                orders."createdAt" AS "createdAt",
                orders.quantity AS "quantity",
                orders."totalPrice" AS "totalPrice",
                orders."isDelivered" AS "isDelivered"
            FROM
                orders
            INNER JOIN
                clients ON orders."clientId" = clients.id
            INNER JOIN
                cakes ON orders."cakeId" = cakes.id
            INNER JOIN
                flavours ON cakes."flavourId" = flavours.id
            WHERE
                DATE_TRUNC('day', orders."createdAt") = TO_DATE($1, 'YYYY-DD-MM');
            `, [date])
        }
        else if (id) {

            getData = await db.query(`SELECT
                clients.id AS "client.id",
                clients.name AS "client.name",
                clients.address AS "client.address",
                clients.phone AS "client.phone",
                cakes.id AS "cake.id",
                cakes.name AS "cake.name",
                cakes.price AS "cake.price",
                cakes.description AS "cake.description",
                cakes.image AS "cake.image",
                flavours.name AS "cake.flavour",
                orders.id AS "orderId",
                orders."createdAt" AS "createdAt",
                orders.quantity AS "quantity",
                orders."totalPrice" AS "totalPrice",
                orders."isDelivered" AS "isDelivered"
            FROM
                orders
            INNER JOIN
                clients ON orders."clientId" = clients.id
            INNER JOIN
                cakes ON orders."cakeId" = cakes.id
            INNER JOIN
                flavours ON cakes."flavourId" = flavours.id
            WHERE
                orders.id=$1
            `, [id])
        }
        else {
            getData = await db.query(`SELECT
                clients.id AS "client.id",
                clients.name AS "client.name",
                clients.address AS "client.address",
                clients.phone AS "client.phone",
                cakes.id AS "cake.id",
                cakes.name AS "cake.name",
                cakes.price AS "cake.price",
                cakes.description AS "cake.description",
                cakes.image AS "cake.image",
                flavours.name AS "cake.flavour",
                orders.id AS "orderId",
                orders."createdAt" AS "createdAt",
                orders.quantity AS "quantity",
                orders."totalPrice" AS "totalPrice",
                orders."isDelivered" AS "isDelivered"
            FROM
                orders
            INNER JOIN
                clients ON orders."clientId" = clients.id
            INNER JOIN
                cakes ON orders."cakeId" = cakes.id
            INNER JOIN
                flavours ON cakes."flavourId" = flavours.id;
            `)
        }

        //console.log(getData.rows);

        //const transformedObj = getData.rows.map(gdr => ({
        //    client: {
        //        id: originalObj['client.id'],
        //        name: originalObj['client.name'],
        //        address: originalObj['client.address'],
        //        phone: originalObj['client.phone']
        //    },
        //    cake: {
        //        id: originalObj['cake.id'],
        //        name: originalObj['cake.name'],
        //        price: originalObj['cake.price'],
        //        description: originalObj['cake.description'],
        //        image: originalObj['cake.image'],
        //        flavour: originalObj['cake.flavour']
        //    },
        //    orderId: originalObj.orderId,
        //    createdAt: originalObj.createdAt,
        //    quantity: originalObj.quantity,
        //    totalPrice: originalObj.totalPrice
        //}));
        //console.log("transformedObj");
        //console.log(transformedObj);
        const transformedObjs = getData.rows.map(gdr => ({
            client: {
                id: gdr['client.id'],
                name: gdr['client.name'],
                address: gdr['client.address'],
                phone: gdr['client.phone']
            },
            cake: {
                id: gdr['cake.id'],
                name: gdr['cake.name'],
                price: gdr['cake.price'],
                description: gdr['cake.description'],
                image: gdr['cake.image'],
                flavour: gdr['cake.flavour']
            },
            orderId: gdr.orderId,
            createdAt: new Date(gdr.createdAt).toISOString().slice(0, 16).replace("T", " "),
            quantity: gdr.quantity,
            totalPrice: gdr.totalPrice,
            isDelivered: gdr.isDelivered
            //orders."isDelivered" AS "isDelivered"
        }));

        //console.log(transformedObjs);


        return transformedObjs;
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postOrdersDB({ clientId, cakeId, quantity, totalPrice }) {
    try {
        await db.query(`INSERT INTO orders("clientId", "cakeId", quantity, "totalPrice", "createdAt")
               VALUES ($1, $2, $3, $4, NOW())`, [clientId, cakeId, quantity, totalPrice]);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}