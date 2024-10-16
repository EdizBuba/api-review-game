import { GameDTO, AddEditDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { ReviewService } from "./review.service";
import { notFound } from "../error/NotFoundError";

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

  public async getGameReviewsById(id: number): Promise<Review[]> {
    const game = await this.getGameById(id);
    if (!game) {
      notFound(`Game with id : ${id}`);
    }
    return await Review.findAll({
      where: {
        game_id: id,
      },
    });
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
  
  public async updateGame(id: number, dto: AddEditDTO): Promise<GameDTO | null> {
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

  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);

    if (!game) {
      notFound(`Game with id ${id}`);
    }

    const reviews = await ReviewService.getReviewsByGameId(id);
    if (reviews.length > 0) {
        throw new Error("Cannot delete game with existing reviews.");
    } 

    await Game.destroy({ where: { id } });
  }
}

export const gameService = new GameService();
