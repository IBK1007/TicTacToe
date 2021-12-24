import { Game } from '../models/Game'
import { GameStatus } from '../models/States'

const gameDict: { [id: number]: Game; } = {};
const endedGameDict: { [id: number]: Game; } = {};
var gameCount = 0 //temporary

export const getGame = (id: number) => {
    const game = gameDict[id]
    return game ?? null
}
export const getAllGames = () => {
    return gameDict
}

export const createGame = (playerOne: string) => {
    const game = new Game(playerOne, gameCount)
    gameDict[gameCount++] = game
    return game
}

export const moveGame = (game: Game) => {
    endedGameDict[game.id] = game
    delete gameDict[game.id]
}
