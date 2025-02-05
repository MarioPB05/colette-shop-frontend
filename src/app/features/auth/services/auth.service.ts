import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUserRequest} from '@models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(dto: LoginUserRequest): Observable<any> {
    return this.http.post('/api/login_check', dto);
  }

}
