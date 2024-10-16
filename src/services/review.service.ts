import { ReviewDTO, AddReviewDTO, EditReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";
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
    review_text?: string 
  ): Promise<Review> {
    const game = await Game.findByPk(game_id);
    if (game) {
        return Review.create({ game_id: game_id, rating: rating, review_text: review_text });
    } else {
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
    rating: number,
    review_text?: string 
): Promise<Review | null> {
    const review = await Review.findByPk(id);
    if (review) {
        if (rating) review.rating = rating;
        if (review_text !== undefined) review.review_text = review_text;
        await review.save();
        return review;
    }
    notFound(`Review with id ${id}`);
}

    static async getReviewsByGameId(id: number) {
      return await Review.findAll({ where: { game_id: id } });
    }
  }
export const reviewService = new ReviewService();