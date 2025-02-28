import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BrawlerUserDetailsResponse, UserBrawler, UserChangeRequest, UserDetailsResponse} from '@models/user.model';
import {OrderUserDetailsResponse} from '@models/order.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<UserDetailsResponse> {
    return this.http.get<UserDetailsResponse>(`${this.apiUrl}/details`);
  }

  getBrawlersOfUser(): Observable<UserBrawler[]> {
    return this.http.get<UserBrawler[]>(`${this.apiUrl}/details/brawlers`);
  }

  getOrderOfUser(): Observable<OrderUserDetailsResponse[]> {
    return this.http.get<any>(`${this.apiUrl}/details/orders`);
  }

  setBrawlerImage(id: number): Observable<any> {
    console.log(id);
    return this.http.post(`${environment}/details/user_avatar/${id}`, {});
  }

  setUserChanges(user: UserChangeRequest): Observable<UserChangeRequest> {
    return this.http.put<UserChangeRequest>(`${environment.baseUrl}/user/details/user/change_details`, user);
  }
}
