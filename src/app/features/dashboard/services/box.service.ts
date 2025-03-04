import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {CreateBoxRequest, CreateDailyBoxRequest, TableBoxResponse} from '@core/models/box.model';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {SkipLoading} from '@interceptors/loading.interceptor';

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

  createBox(data: CreateBoxRequest): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/boxes/`, data, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }

  createDailyBox(data: CreateDailyBoxRequest): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/boxes/daily`, data, {
      context: new HttpContext().set(SkipLoading, true)
    })
  }

  getBox(id: number): Observable<CreateBoxRequest|CreateDailyBoxRequest> {
    return this.http.get<CreateBoxRequest|CreateDailyBoxRequest>(`${environment.baseUrl}/boxes/get/${id}`)
  }
}
