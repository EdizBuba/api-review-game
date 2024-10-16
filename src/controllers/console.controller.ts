import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO, AddEditConsoleDTO } from "../dto/console.dto";
import { Game } from "../models/game.model";
import { GameDTO } from "../dto/game.dto";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {
  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    return consoleService.getConsoleById(id);
  }

  @Get("{id}/games")
  public async getConsoleGames(@Path() id: number): Promise<GameDTO[] | null> {
    const games: Game[] = await consoleService.getConsoleGamesById(id);
    return games
  }

  @Post("/")
  public async createConsole(
    @Body() requestBody: AddEditConsoleDTO
  ): Promise<ConsoleDTO> {
    return consoleService.createConsole(requestBody.name, requestBody.manufacturer);
  }


  // Supprime une console par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await consoleService.deleteConsole(id);
  }

  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: AddEditConsoleDTO
  ): Promise<ConsoleDTO | null> {
    return consoleService.updateConsole(id, requestBody.name, requestBody.manufacturer);
  }
}