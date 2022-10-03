import connection from '../database/connection.js'
import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().required().min(11).max(11),
    phone: joi.string().required().min(10).max(11),
    birthday: joi.date()
})

async function listCustomers (req, res) {
    try {
        const customers = await connection.query('SELECT * FROM customers;');
    
        console.log(customers.rows);
    
        res.send(customers.rows);
    } catch (error) {
        res.send(error)
    }

}

async function getCustomersById (req, res) {
    const { id } = req.params;

    try {
        const customers = await connection.query('SELECT * FROM customers WHERE id = $1;', [id]);
    
        if (customers.rows.length === 0) {
            res.send(404)
        } else {
            res.send(customers.rows);
        }
    
    } catch (error) {
        res.send(error)
    }

}

async function createCustomer (req, res) {
    const { name, cpf, phone, birthday } = req.body;
    const validation = customerSchema.validate({name, cpf, phone, birthday}, {abortEarly: true})

    if (validation.error) {
        console.log(validation.error.details)
        res.status(400).send(validation.error)

        return
    }

    const cpfAlreadyExists = await connection.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`)

    if (cpfAlreadyExists.rows.length !== 0) {
        res.status(409).send("Cpf já existente!")
        return
    } else {
        try {
            await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday])
    
        res.send('ok')
    
        } catch (error) {
            res.status(422).send(error)
        }
    }
 
}

async function updateCustomer (req, res) {
    const { name, cpf, phone, birthday } = req.body;
    
    const validation = customerSchema.validate({name, cpf, phone, birthday}, {abortEarly: true})

    if (validation.error) {
        console.log(validation.error.details)
        res.status(400).send(validation.error)

        return
    }

    const cpfAlreadyExists = await connection.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`)

    if (cpfAlreadyExists.rows !== 0) {
        res.status(409).send("Cpf já existente!")
        return
    } else {
        try {
            await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday])
    
        res.send('ok')
    
        } catch (error) {
            res.status(422).send(error)
        }
    }
 
}

export {listCustomers, getCustomersById, createCustomer, updateCustomer}