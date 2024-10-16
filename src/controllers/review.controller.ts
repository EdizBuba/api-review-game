import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { ReviewDTO, AddReviewDTO, EditReviewDTO } from "../dto/review.dto";
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
        @Body() requestBody: AddReviewDTO
    ): Promise<ReviewDTO> {
        return reviewService.createReview(requestBody.game_id, requestBody.rating, requestBody.review_text);
    }
  
    @Delete("{id}")
    public async deleteReview(@Path() id: number): Promise<void> {
      await reviewService.deleteReview(id);
    }
  
    @Patch("{id}")
    public async updateReview(
        @Path() id: number,
        @Body() requestBody: EditReviewDTO
    ): Promise<ReviewDTO | null> {
        return reviewService.updateReview(id, requestBody.rating, requestBody.review_text);
    }
}