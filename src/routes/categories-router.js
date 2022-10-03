import express from 'express';
import {listCategories, postCategory} from "../controllers/categoriesController.js"

const router = express.Router();

router.get('/categories', listCategories);

router.post('/categories', postCategory)


export default router;