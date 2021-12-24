import { Game } from "@/models/Game";
import { Request } from "express";

export interface ICustomRequest extends Request {
    game?: Game
}