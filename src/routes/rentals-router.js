import express from 'express';
import {listRentals, insertRental} from '../controllers/rentalsController.js';

const router = express.Router();

router.get('/rentals', listRentals);

router.get('/customers/:id', );

router.post('/rentals', insertRental)

router.put('/customers/:id', );


export default router;