import { Router } from 'express';
import gameRouter from './gameRouter'

const router = Router();

router.use('/game', gameRouter)

export default router;
