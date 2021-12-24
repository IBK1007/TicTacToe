import * as DAL from '../DAL/index'
import { Request, Response } from 'express';
import { FinalStatus, GameStatus } from '../models/States'
import { MoveStatus } from '../models/States';
import { ICustomRequest } from './game.interfaces';
import { checkBoard } from '../utils/boardChecker'
import { Game } from '@/models/Game';

export const getGames = (req: Request, res: Response) => {
  const status = req.body.gameStatus
  const allGames = Object.values(DAL.getAllGames())

  if (status == 'ALL')
    return res.status(200).json(allGames)

  const filteredGames = allGames.filter(game => game.status == status)
  return res.status(200).json(filteredGames)
};

export const getGameById = (req: ICustomRequest, res: Response) => {
  const game = req.game
  return res.status(200).json(game)
}

export const createGame = (req: ICustomRequest, res: Response) => {
  const { playerName } = req.body
  const game = DAL.createGame(playerName)
  return res.status(200).json(game.id)
}

export const joinGame = (req: ICustomRequest, res: Response) => {
  const { playerName } = req.body
  const game = req.game

  if (game) {
    if (game.status === GameStatus.Waiting) {
      game.playerTwo = playerName
      game.status = GameStatus.Playing
      return res.status(200).send('Join successful')
    }
    return res.status(400).send('Cannot join this game')
  }
  return res.status(404).send('Game not found')
}

export const makeMove = (req: ICustomRequest, res: Response) => {
  const { playerName, x, y } = req.body;
  const game = req.game

  if (game?.status !== GameStatus.Playing)
    return res.status(400).send('Cannot play in this game')

  if (game) {
    const playerIndex = playerName == game.playerOne ? 1 : 2
    const updateStatus = game.board.updateBoard(x, y, playerIndex)

    if (updateStatus !== MoveStatus.Success) {
      return handleMoveStatusError(updateStatus, res)
    }

    const statusCheck = checkBoard(game)

    if (statusCheck !== FinalStatus.None) {
      game.winnerStatus = statusCheck
      game.status = GameStatus.Ended
      return res.status(200).json({ status: game.status, winner: game.winnerStatus })
    }

    return res.status(200).json({ status: game.status })
  }
}

const handleMoveStatusError = (moveStatus: MoveStatus, res: Response) => {
  switch (moveStatus) {
    case MoveStatus.CaseBusy:
      return res.status(400).send('Case already choosen')
    case MoveStatus.OutOfBound:
      return res.status(400).send('Place out of bounds')
    case MoveStatus.WrongTurn:
      return res.status(400).send('Not player turn')
    default:
      return res.status(404).send('Error in board update')
  }
}
