import { Console } from "../models/console.model";
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

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (console) {
      await console.destroy();
    } else {
      notFound(`Console with id ${id}`);
    }
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
