import connection from '../database/connection.js'
import joi from 'joi';

const postCategorySchema = joi.object({
    name: joi.string().required()
})

async function listCategories (req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;');
    
        console.log(categories.rows);
    
        res.send(categories.rows);
    } catch (error) {
        res.send(error)
    }

}

async function postCategory (req, res) {
    const { name } = req.body;
    const validation = postCategorySchema.validate({name}, {abortEarly: true})

    if (validation.error) {
        console.log(validation.error.details)
        res.status(400).send(validation.error)

        return
    }

    const alreadyExists = await connection.query(`SELECT name FROM categories WHERE name = '${name}';`)

    if (alreadyExists.rows !== 0) {
        res.status(422).send("Categoria já existente!")
        return
    } else {
        try {
            await connection.query('INSERT INTO categories (name) VALUES ($1);', [name])
    
        res.send('ok')
    
        } catch (error) {
            res.status(422).send(error)
        }
    }

    
}

export {listCategories, postCategory}