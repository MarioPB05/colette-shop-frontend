import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {AuthResponse, LoginUserRequest} from '@models/auth.model';
import {Observable} from 'rxjs';
import {SkipAuth} from '@interceptors/auth.interceptor';

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

}
