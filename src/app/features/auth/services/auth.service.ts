import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {AuthResponse, LoginUserRequest, RegisterUserRequest} from '@models/auth.model';
import {map, Observable} from 'rxjs';
import {SkipAuth} from '@interceptors/auth.interceptor';
import {SkipLoading} from '@interceptors/loading.interceptor';
import {APIResponse} from '@models/commons.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dto: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/login_check`, dto, {
      context: new HttpContext().set(SkipAuth, true)
    });
  }

  register(dto: RegisterUserRequest): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.baseUrl}/auth/register`, dto, {
      context: new HttpContext().set(SkipAuth, true)
    });
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<{exists: boolean}>(`${environment.baseUrl}/auth/verify-username/${username.trim()}`, {
      context: new HttpContext().set(SkipAuth, true).set(SkipLoading, true)
    }).pipe(
      map(response => response.exists)
    );
  }

  verifyEmail(token: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.baseUrl}/auth/verify-email?token=${token}`, {
      context: new HttpContext().set(SkipAuth, true)
    });
  }

}
