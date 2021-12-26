import { Response, NextFunction } from 'express';
import * as DAL from '../repositories/game.repository'
import { IGameRequest } from '../controller/game.interface';

export const getBoardGame = (req: IGameRequest, res: Response, next: NextFunction) => {
    req.game = DAL.getGame(req.params.gameId || req.body.gameId);

    if (!req.game)
        return res.status(404).send("Game not Found")

    next()
}