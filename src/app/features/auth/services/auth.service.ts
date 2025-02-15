import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {AuthResponse, LoginUserRequest} from '@models/auth.model';
import {map, Observable} from 'rxjs';
import {SkipAuth} from '@interceptors/auth.interceptor';
import {SkipLoading} from '@interceptors/loading.interceptor';
import {APIResponse} from '@models/commons.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dto: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login_check', dto, {
      context: new HttpContext().set(SkipAuth, true)
    });
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<{exists: boolean}>(`/api/auth/verify-username/${username}`, {
      context: new HttpContext().set(SkipAuth, true).set(SkipLoading, true)
    }).pipe(
      map(response => response.exists)
    );
  }

  verifyEmail(token: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`/api/auth/verify-email?token=${token}`, {
      context: new HttpContext().set(SkipAuth, true)
    });
  }

}
