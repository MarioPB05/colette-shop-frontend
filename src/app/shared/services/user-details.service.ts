import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '@shared/services/local-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserDetailsResponse} from '@models/user.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userDetailsSubject = new BehaviorSubject<UserDetailsResponse | null>(null);
  userDetails$ = this.userDetailsSubject.asObservable();
  requestMade = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const userDetails = this.localStorageService.getItem<UserDetailsResponse>('userDetails');
    let lastUpdate = this.localStorageService.getItem<Date>('userDetailsLastUpdate');

    if (userDetails && lastUpdate) {
      const currentDate = new Date();
      lastUpdate = new Date(lastUpdate);
      const hoursDiff = Math.abs(currentDate.getTime() - lastUpdate.getTime()) / 36e5;

      if (hoursDiff < 24) {
        this.userDetailsSubject.next(userDetails);
        return;
      }

      this.updateUserDetails();

      return;
    }

    this.updateUserDetails();
  }

  updateUserDetails(): void {
    if (this.requestMade) return;

    this.getUserDetails().subscribe(response => {
      this.userDetailsSubject.next(response);
      this.localStorageService.setItem('userDetails', response);
      this.localStorageService.setItem('userDetailsLastUpdate', new Date());
    });
  }

  getUserDetails(): Observable<UserDetailsResponse> {
    this.requestMade = true;

    return this.http.get<UserDetailsResponse>(`${environment.baseUrl}/user/details`);
  }

  emitNewUserDetails(userDetails: UserDetailsResponse): void {
    this.userDetailsSubject.next(userDetails);
    this.localStorageService.setItem('userDetails', userDetails);
    this.localStorageService.setItem('userDetailsLastUpdate', new Date());
  }

}
