import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {AuthVerifyResponse} from '@models/auth.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'api_token';

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<AuthVerifyResponse>(`${environment.baseUrl}/auth/verify`).pipe(
      map((response) => response.valid),
      catchError(() => {
        this.removeToken();
        return [false];
      })
    );
  }

  isAdministrator(): Observable<boolean> {
    return this.http.get<AuthVerifyResponse>(`${environment.baseUrl}/auth/verify-admin`).pipe(
      map((response) => response.valid),
      catchError(() => {
        this.removeToken();
        return [false];
      })
    );
  }

  isUser(): Observable<boolean> {
    return this.http.get<AuthVerifyResponse>(`${environment.baseUrl}/api/auth/verify-user`).pipe(
      map((response) => response.valid),
      catchError(() => {
        this.removeToken();
        return [false];
      })
    );
  }
}
