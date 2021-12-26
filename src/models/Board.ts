import { MoveStatus } from "./States"
export class Board {
    grid: number[][]
    turn: number

    constructor() {
        this.grid = new Array(3).fill(0).map(() => new Array(3).fill(0))
        this.turn = 1
    }
    updateBoard = (x: number, y: number, playerIndex: number): MoveStatus => {

        if (x < 0 || x > 3 || y < 0 || y > 3)
            return MoveStatus.OutOfBound

        if (this.grid[x][y] !== 0)
            return MoveStatus.CaseBusy

        if (playerIndex !== this.turn)
            return MoveStatus.WrongTurn

        this.grid[x][y] = playerIndex
        this.turn = this.turn === 1 ? 2 : 1
        return MoveStatus.Success
    }
}