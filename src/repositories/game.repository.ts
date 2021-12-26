import { Game } from '../models/Game'
import { GameManager } from '../models/gameManager';

const gameManager = new GameManager();

export const getGame = (id: number) => {
    return gameManager.getGame(id)
}

export const getAllGames = () => {
    return gameManager.getAllGames()
}

export const createGame = (playerOne: string) => {
    return gameManager.createGame(playerOne)
}

export const moveGame = (game: Game) => {
    return gameManager.moveGame(game)
}
