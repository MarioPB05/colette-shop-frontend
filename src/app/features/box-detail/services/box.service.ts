import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {BoxDetailResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';
import {SkipLoading} from '@interceptors/loading.interceptor';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  constructor(private http: HttpClient) {}

  getBoxDetails(id: number): Observable<BoxDetailResponse> {
    return this.http.get<BoxDetailResponse>(`${environment.baseUrl}/boxes/${id}`, {
      context: new HttpContext().set(SkipLoading, true)
    })
  }
}
