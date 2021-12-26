import { Game } from "@/models/Game";
import { Request } from "express";

export interface IGameRequest extends Request {
    game?: Game
}