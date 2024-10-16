import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (!console) {
      notFound(`Console with id ${id}`);
    }
    return console;
  }

  public async getConsoleGamesById(id: number): Promise<Game[]> {
    const console = await this.getConsoleById(id);
    if (!console) {
      notFound(`Console with id : ${id}`);
    }
    return await Game.findAll({
      where: {
        console_id: id,
      },
    });
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (!console) {
      notFound(`Console with id ${id}`);
    }

    const games = await Game.findAll({ where: { console_id: id } });
    if (games.length === 0) {
      await console.destroy();
      return;
    }

    const gameIds = games.map(game => game.id);
    const reviews = await Review.findAll({
      where: {
        game_id: gameIds,
      }
    });

    if (reviews.length > 0) {
      throw new Error("This console cannot be deleted because one or more games associated with it have reviews.");
    }

    await console.destroy();
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (!console) {
      notFound(`Console with id ${id}`);
    }
    if (name) console.name = name;
    if (manufacturer) console.manufacturer = manufacturer;
    await console.save();
    return console;
  }
}

export const consoleService = new ConsoleService();
