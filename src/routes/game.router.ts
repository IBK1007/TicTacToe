import { Router } from "express";
import { getBoardGame } from '../middlewares/boardGame'
import * as gameController from '@/controller/game';

const gameRouter = Router()

gameRouter.post(
    '/create',
    gameController.createGame
);

gameRouter.post(
    '/join',
    getBoardGame,
    gameController.joinGame
);

gameRouter.post(
    '/makeMove',
    getBoardGame,
    gameController.makeMove
);

gameRouter.get(
    '/gamesByType',
    gameController.getGames
);

gameRouter.get(
    '/gameById/:gameId',
    getBoardGame,
    gameController.getGameById
);

export default gameRouter