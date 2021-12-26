import { StringNullableChain } from "lodash";
import { Board } from './Board'
import { FinalStatus, GameStatus } from './States'

export class Game {
    id: number
    playerOne: string;
    playerTwo: string;
    board: Board;
    status: GameStatus;
    winnerStatus: FinalStatus

    static creatorIndex = 0
    constructor(creatorPlayerName: string) {
        this.id = Game.creatorIndex++
        this.playerOne = creatorPlayerName;
        this.playerTwo = "";
        this.board = new Board()
        this.status = GameStatus.Waiting
        this.winnerStatus = FinalStatus.None
    }
}