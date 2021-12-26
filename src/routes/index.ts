import { Router } from 'express';
import gameRouter from './game.router'

const router = Router();

router.use('/game', gameRouter)

export default router;
