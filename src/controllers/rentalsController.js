import connection from '../database/connection.js'
import joi from 'joi';
import dayjs from 'dayjs';

const rentalSchema = joi.object({
    daysRented: joi.string().required().min(1)
})

async function listRentals (req, res) {
    try {
        const rentals = await connection.query('SELECT * FROM rentals;');

        console.log(rentals.rows);

        res.send(rentals.rows);
    } catch (error) {
        res.send(error)
    }

}

async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const validation = rentalSchema.validate({daysRented}, {abortEarly: true})

    if (validation.error) {
        console.log(validation.error.details)
        res.status(400).send(validation.error)

        return
    }

    if (daysRented <= 0) {
        res.send("Dias alugados inválido!")
        return
    }

    const idExists = (await connection.query('SELECT * FROM customers WHERE id = $1', [customerId])).rows

    const gameExists = (await connection.query('SELECT * FROM games WHERE id = $1', [gameId])).rows

    const isAvailable = (await connection.query('SELECT stockTotal FROM games ')).rows

    if (idExists.length === 0 && gameExists === 0 && isAvailable === 0) {
        res.status(400).send('erro')
    } else {
        const rentDate = dayjs().format("DD/MM/YYYY")
        const returnDate = null;
        const price = (await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1;', [gameId])).rows[0]
        const originalPrice = daysRented * price.pricePerDay;
        const delayFee = null;
    
        try {
            const response = await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
    
            res.status(201).send('ok')
        } catch (error) {
            res.status(400).send(error)
        }
    }

  

}

export {listRentals, insertRental, }