import express from 'express';
import categoriesRouter from './routes/categories-router.js'
import gamesRouter from './routes/games-router.js'
import customersRouter from './routes/customers-routes.js'
import rentalsRouter from './routes/rentals-router.js'

const server = express();
server.use(express.json());
server.use(categoriesRouter);
server.use(gamesRouter);
server.use(customersRouter);
server.use(rentalsRouter)


server.listen(4001, () => {
    console.log('Magic happens on 4000')
});
