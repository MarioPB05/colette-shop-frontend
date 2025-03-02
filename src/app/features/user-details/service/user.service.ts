import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBrawler, UserChangeRequest, UserDetailsResponse} from '@models/user.model';
import {OrderUserDetailsResponse} from '@models/order.model';
import {environment} from '@environments/environment';
import {SkipLoading} from '@interceptors/loading.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<UserDetailsResponse> {
    return this.http.get<UserDetailsResponse>(`${environment.baseUrl}/user/details`);
  }

  getBrawlersOfUser(): Observable<UserBrawler[]> {
    return this.http.get<UserBrawler[]>(`${environment.baseUrl}/user/details/brawlers`);
  }

  getOrderOfUser(): Observable<OrderUserDetailsResponse[]> {
    return this.http.get<any>(`${environment.baseUrl}/user/details/orders`);
  }

  setBrawlerImage(id: number): Observable<any> {
    console.log(id);
    return this.http.post(`${environment.baseUrl}/user/details/brawler_image/${id}`, {}, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }

  setUserChanges(user: UserChangeRequest): Observable<UserChangeRequest> {
    return this.http.put<UserChangeRequest>(`${environment.baseUrl}/user/details/change_details`, user, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
