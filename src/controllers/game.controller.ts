import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { CreateGameDTO } from "../dto/creategame.dto";
import { gameService } from "../services/game.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO> {
    return gameService.getGameById(id);
  }

  @Post("/")
  public async createGame(@Body() requestBody: CreateGameDTO): Promise<GameDTO> {
    const { title, consoleId } = requestBody;

    if (!consoleId || typeof consoleId !== 'number') {
      throw new Error("Console ID is required and must be a number");
    }
    return gameService.createGame(title, consoleId); 
  }

  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: CreateGameDTO
  ): Promise<GameDTO | null> {
    return gameService.updateGame(id, requestBody);
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
}