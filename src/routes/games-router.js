import express from 'express';
import { listGames, insertGame } from '../controllers/gamesController.js';

const router = express.Router();

router.get('/games', listGames);

router.post('/games', insertGame)


export default router;