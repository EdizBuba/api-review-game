import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    game_id: number;
    rating: number;
    review_text?: string;
}

export interface AddReviewDTO {
    game_id: number;
    rating: number;
    review_text?: string;
}

export interface EditReviewDTO {
    rating: number;
    review_text?: string;
}