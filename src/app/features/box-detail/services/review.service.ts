import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewResponse} from '@models/review.model';
import {SkipLoading} from '@interceptors/loading.interceptor';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewsFromBox(id: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${environment.baseUrl}/reviews/box/${id}`, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
