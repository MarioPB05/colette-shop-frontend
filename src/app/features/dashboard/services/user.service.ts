import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableBrawlerResponse} from '@core/models/brawler.model';
import {TableUserResponse} from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<TableUserResponse[]> {
    return this.http.get<TableUserResponse[]>(`${this.apiUrl}/`);
  }

}
