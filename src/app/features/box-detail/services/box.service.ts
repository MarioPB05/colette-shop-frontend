import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {BoxDetailResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';
import {SkipLoading} from '@interceptors/loading.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private apiUrl = '/api/boxes';

  constructor(private http: HttpClient) {}

  getBoxDetails(id: number): Observable<BoxDetailResponse> {
    return this.http.get<BoxDetailResponse>(`${this.apiUrl}/${id}`, {
      context: new HttpContext().set(SkipLoading, true)
    })
  }
}
