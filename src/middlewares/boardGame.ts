import { Request, Response, NextFunction, Router } from 'express';
import * as DAL from '../DAL/index'
import { Game } from '@/models/Game';

interface CustomRequest extends Request {
    game?: Game
}

export const getBoardGame = (req: CustomRequest, res: Response, next: NextFunction) => {
    req.game = DAL.getGame(req.body.gameId);
    if (!req.game)
        return res.status(404).send("Game not Found")
    next()
}