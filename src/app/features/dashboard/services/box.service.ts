import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableBoxResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) {}

  getTableBoxes(): Observable<TableBoxResponse[]> {
    return this.http.get<TableBoxResponse[]>(`${environment.baseUrl}/boxes/`)
  }

  removeBox(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/boxes/${id}`)
  }

}
