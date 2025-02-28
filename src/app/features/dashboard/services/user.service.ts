import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShowUserResponse, TableUserResponse, UserChangeRequest} from '@core/models/user.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<TableUserResponse[]> {
    return this.http.get<TableUserResponse[]>(`${environment.baseUrl}/user/`);
  }

  disableUser(id: number): Observable<TableUserResponse> {
    return this.http.put<TableUserResponse>(`${environment.baseUrl}/user/disable/${id}`, {});
  }

  enableUser(id: number): Observable<TableUserResponse> {
    return this.http.put<TableUserResponse>(`${environment.baseUrl}/user/enable/${id}`, {});
  }

  showUser(brawlTag: string): Observable<ShowUserResponse> {
    return this.http.get<ShowUserResponse>(`${environment.baseUrl}/user/find/${brawlTag}`);
  }

  setUserChanges(user: UserChangeRequest): Observable<UserChangeRequest> {
    return this.http.put<UserChangeRequest>(`${environment.baseUrl}/user/details/user/change_details`, user);
  }

}
