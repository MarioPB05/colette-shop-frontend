import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SkipLoading} from '@interceptors/loading.interceptor';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  userHasReviewSameBoxBefore(id_box: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/reviews/box/${id_box}/user`);
  }

  addReview(id_box: number, rating: number, comment: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/reviews/box/${id_box}/user`, {rating, comment}, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
