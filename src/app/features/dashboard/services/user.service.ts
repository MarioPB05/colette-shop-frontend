import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShowUserResponse, TableUserResponse} from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<TableUserResponse[]> {
    return this.http.get<TableUserResponse[]>(`${this.apiUrl}/`);
  }

  disableUser(id: number): Observable<TableUserResponse> {
    return this.http.put<TableUserResponse>(`${this.apiUrl}/disable/${id}`, {});
  }

  enableUser(id: number): Observable<TableUserResponse> {
    return this.http.put<TableUserResponse>(`${this.apiUrl}/enable/${id}`, {});
  }

  showUser(brawlTag: string): Observable<ShowUserResponse> {
    return this.http.get<ShowUserResponse>(`${this.apiUrl}/find/${brawlTag}`);
  }

}
