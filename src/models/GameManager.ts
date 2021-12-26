import { Game } from "./Game";

export class GameManager {
    games: Map<number, Game>,
    gamesHistory: Map<number, Game>

    constructor() {
        this.games = new Map();
        this.gamesHistory = new Map();

    }
    getGame = (id: number) => {
        const game = this.games.get(id)
        return game ?? null
    }
    getAllGames = () => {
        return this.games
    }

    createGame = (playerOne: string) => {
        const game = new Game(playerOne)
        this.games.set(game.id, game)
        return game
    }

    moveGame = (game: Game) => {
        this.gamesHistory.set(game.id, game)
        this.games.delete(game.id)
    }

}