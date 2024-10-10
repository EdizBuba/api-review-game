import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { CreateGameDTO } from "../dto/creategame.dto";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    const games = await Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    
    return games.map(game => ({
      id: game.id,
      title: game.title,
      console: {
        id: game.console.id,
        name: game.console.name,
        manufacturer: game.console.manufacturer
      }
    }));
  }

  public async getGameById(id: number): Promise<GameDTO> {
    const game = await Game.findByPk(id, {
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });

    if (!game) {
      notFound(`Game with id ${id}`); 
    }
    

    return {
      id: game.id,
      title: game.title,
      console: {
        id: game.console.id,
        name: game.console.name,
        manufacturer: game.console.manufacturer,
      }
    };
  }

  public async createGame(
    title: string, 
    consoleId: number
  ): Promise<GameDTO> {
    const consoleExists = await Console.findByPk(consoleId);
    if (!consoleExists) {
      notFound(`Console with ${consoleId}`);
    }

    return Game.create({ title, console_id: consoleId });
  }
  
  public async updateGame(id: number, dto: CreateGameDTO): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (!game) {
      notFound(`Game with id ${id}`);
    }

    const consoleExists = await Console.findByPk(dto.consoleId);
    if (!consoleExists) {
      notFound(`Console with id ${dto.consoleId}`);
    }
    game.title = dto.title;
    game.console_id = dto.consoleId;
    await game.save();

    return game;
  }
}

export const gameService = new GameService();
