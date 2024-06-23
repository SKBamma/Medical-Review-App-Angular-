import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { IPost_Review, IReview } from '../types/medications.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly #http = inject(HttpClient);
  $reviewState = signal<IReview[]>([]);


  addReview(med_id: string, review: IPost_Review) {
    return this.#http.post<{ success: boolean, data: string; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}/reviews`, review);
  }

  deleteReview(med_id: string, review_id: string) {
    return this.#http.delete<{ success: boolean, data: boolean; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}/reviews/${review_id}`);
  }

  updateReview(med_id: string, review_id: string, update_review: { review: string, rating: number; }) {
    return this.#http.put<{ success: boolean, data: boolean; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}/reviews/${review_id}`, update_review);
  }


  getReviews(med_id: string) {
    return this.#http.get<{ success: boolean, data: IReview[]; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}/reviews`);
  }


  getReviewById(med_id: string, review_id: string) {
    return this.#http.get
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}/reviews/${review_id}`);

  }

}
