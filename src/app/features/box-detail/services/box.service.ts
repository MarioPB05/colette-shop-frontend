import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoxDetailResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private apiUrl = '/api/boxes';

  constructor(private http: HttpClient) {}

  getBoxDetails(id: number): Observable<BoxDetailResponse> {
    return this.http.get<BoxDetailResponse>(`${this.apiUrl}/${id}`)
  }
}
