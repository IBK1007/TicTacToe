import * as DAL from '../repositories/game.repository'
import { Request, Response } from 'express';
import { FinalStatus, GameStatus } from '../models/States'
import { MoveStatus } from '../models/States';
import { IGameRequest } from './game.interface';
import { checkBoard } from '../utils/boardChecker'

export const getGames = (req: Request, res: Response) => {
  const status = req.body.gameStatus
  const allGames = Object.values(DAL.getAllGames())

  if (status == 'ALL')
    return res.status(200).json(allGames)

  const filteredGames = allGames.filter(game => game.status == status)
  return res.status(200).json(filteredGames)
};

export const getGameById = (req: IGameRequest, res: Response) => {
  const game = req.game
  return res.status(200).json(game)
}

export const createGame = (req: IGameRequest, res: Response) => {
  const { playerName } = req.body
  const game = DAL.createGame(playerName)
  return res.status(200).json(game.id)
}

export const joinGame = (req: IGameRequest, res: Response) => {
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

export const makeMove = (req: IGameRequest, res: Response) => {
  const { playerName, x, y } = req.body;
  const game = req.game

  if (game?.status !== GameStatus.Playing)
    return res.status(400).send('Cannot play in this game')

  if (game) {
    const playerIndex = playerName == game.playerOne ? 1 : 2
    const updateStatus = game.board.updateBoard(x, y, playerIndex)

    if (updateStatus !== MoveStatus.Success) {
      const { status, message } = handleMoveStatusError(updateStatus)
      return res.status(status).send(message)
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

const handleMoveStatusError = (moveStatus: MoveStatus) => {
  switch (moveStatus) {
    case MoveStatus.CaseBusy:
      return { status: 400, message: 'Case already choosen' }
    case MoveStatus.OutOfBound:
      return { status: 400, message: 'Place out of bounds' }
    case MoveStatus.WrongTurn:
      return { status: 400, message: 'Not player turn' }
    default:
      return { status: 404, message: 'Error in board update' }
  }
}
