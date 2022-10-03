import express from 'express';
import {listCustomers, getCustomersById, createCustomer, updateCustomer} from '../controllers/customersController.js';

const router = express.Router();

router.get('/customers', listCustomers);

router.get('/customers/:id', getCustomersById);

router.post('/customers', createCustomer)

router.put('/customers/:id', updateCustomer);


export default router;