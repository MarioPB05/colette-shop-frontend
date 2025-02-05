import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableBoxResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  private apiUrl = '/api/boxes';

  constructor(private http: HttpClient) {}

  getTableBoxes(): Observable<TableBoxResponse[]> {
    return this.http.get<TableBoxResponse[]>(`${this.apiUrl}/`)
  }

  removeBox(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
