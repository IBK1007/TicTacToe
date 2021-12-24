export enum GameStatus {
    Waiting = 'WAITING',
    Playing = 'PLAYING',
    Ended = 'ENDED'
}

export enum MoveStatus {
    OutOfBound,
    WrongTurn,
    CaseBusy,
    Success
}

export enum FinalStatus {
    None = 0,
    PlayerOneWin = 1,
    PlayerTwoWin = 2,
    Tie = 3
}