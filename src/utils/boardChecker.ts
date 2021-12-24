import { Game } from "@/models/Game"
import { FinalStatus } from "@/models/States"
import { findSourceMap } from "module"

export const checkBoard = (game: Game) => {
    const board = game.board.grid
    for (let i = 0; i < 3; i++) {
        const row = checkRow(board[i])
        if (row !== 0)
            return getEnumRes(row)

        const col = checkCol(board, i)
        if (col !== 0)
            return getEnumRes(col)
    }
    const diags = checkDiags(board)

    if (diags !== 0)
        return getEnumRes(diags)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0)
                return FinalStatus.None
        }
    }

    return FinalStatus.Tie
}
const checkRow = (row: Array<number>): number => {
    if (row[0] === row[1]
        && row[0] === row[2]
        && row[0] !== 0
    )
        return row[0]
    return 0
}
const checkCol = (mat: Array<Array<number>>, colIndex: number) => {
    if (mat[0][colIndex] === mat[1][colIndex]
        && mat[0][colIndex] === mat[2][colIndex]
        && mat[0][colIndex] !== 0
    )
        return mat[0][colIndex]
    return 0
}

const checkDiags = (mat: Array<Array<number>>) => {
    if (mat[0][0] === mat[1][1] && mat[0][0] === mat[2][2] && mat[0][0] !== 0)
        return mat[0][0]

    if (mat[0][2] === mat[1][1] && mat[0][2] === mat[2][0] && mat[0][2] !== 0)
        return mat[0][2]

    return 0
}

const getEnumRes = (result: number) => {
    return result === 1 ? FinalStatus.PlayerOneWin : FinalStatus.PlayerTwoWin
}