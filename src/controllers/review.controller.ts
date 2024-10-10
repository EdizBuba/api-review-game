import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
      return reviewService.getAllReviews();
    }
  
    @Get("{id}")
    public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
      return reviewService.getReviewById(id);
    }
  
    @Post("/")
    public async createReview(
      @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO> {
      const { game_id, rating } = requestBody;
      return reviewService.createReview(game_id, rating);
    }
  
    @Delete("{id}")
    public async deleteReview(@Path() id: number): Promise<void> {
      await reviewService.deleteReview(id);
    }
  
    // Met à jour une console par ID
    @Patch("{id}")
    public async updateReview(
      @Path() id: number,
      @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO | null> {
      const { game_id, rating } = requestBody;
      return reviewService.updateReview(id, game_id, rating);
    }
}