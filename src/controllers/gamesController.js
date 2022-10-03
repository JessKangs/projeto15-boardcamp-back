import connection from "../database/connection.js";
import joi from 'joi';

const insertGameSchema = joi.object({
    name: joi.string().required(),
    stockTotal: joi.string().min(1),
    pricePerDay: joi.string().min(1),
})

async function listGames (req, res) {
    try {
        const games = await connection.query('SELECT * FROM games;');
    
        console.log(games.rows);
    
        res.send(games.rows);
    } catch (error) {
        res.send(error)
    }
}

async function insertGame (req, res) {
    const { name ,image , stockTotal, categoryId, pricePerDay} = req.body;
    const validation = insertGameSchema.validate({name, stockTotal, pricePerDay}, {abortEarly:true})

    if (validation.error) {
        console.log(validation.error.details)
        res.status(400).send(validation.error)

        return
    }

    const idExists = await connection.query(`SELECT * FROM categories WHERE id = '${categoryId}';`)

    const gameExists = await connection.query(`SELECT * FROM games WHERE name = '${name}';`)

    if (idExists.rows.length === 0) {
        res.status(400).send("id de categoria inválido!")
        return
    } else {
        
    if (gameExists.rows.length !== 0) {
        res.status(409).send("game já existente!")
        return
    } else {

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay])

        res.send('ok');
        
    }

    }
}

export {listGames, insertGame}