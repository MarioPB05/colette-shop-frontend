import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewResponse} from '@models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = '/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsFromBox(id: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.apiUrl}/box/${id}`);
  }
}
