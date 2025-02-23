import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailsResponse} from '@models/user.model';
import {GemsStats} from '@models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<UserDetailsResponse> {
    return this.http.get<UserDetailsResponse>(`${this.apiUrl}/details`);
  }
}
