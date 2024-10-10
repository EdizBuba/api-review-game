import { GameDTO } from "../dto/game.dto";
import { ReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
export class ReviewService {
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return Review.findAll({
      include: [
        {
          model: Game,
          as: "game",
        },
      ],
    });
  }
  public async getReviewById(id: number): Promise<Review | null> {
    const review = await Review.findByPk(id);
    if(review){
      return review;
    }else{
      notFound(`Review with id ${id}`);
    }
  }
  public async createReview(
    game_id: number,
    rating: number,
  ): Promise<Review> {
    const game = await Game.findByPk(game_id);
    if(game){
      return Review.create({game_id: game_id, rating: rating });
    }else{
      notFound(`Game with id ${game_id}`);
    }
  }
  public async deleteReview(id: number): Promise<void> {
    const review = await Review.findByPk(id);
    if (review) {
        review.destroy();
    }else{
        notFound(`Review with id ${id}`);
    }
  }

  public async updateReview(
    id: number,
    game_id: number,
    rating: number
  ): Promise<Review | null> {
    const review = await Review.findByPk(id);
    const game = await Game.findByPk(game_id)
    if (review) {
      if(game){
        if (rating) review.rating = rating;
        if (game_id) review.game_id = game_id;
        await review.save();
        return review;
      }else{
        notFound(`Game with id ${game_id}`)
      }
    }
    notFound(`Review with id ${id}`);
  }
}
export const reviewService = new ReviewService();