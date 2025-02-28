import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();
  count = 0;

  loadingOn() {
    this.count++;
    this.loadingSubject.next(true);
  }

  loadingOff() {
    if (this.count > 1) {
      this.count--;
      return;
    }

    this.count = 0;
    this.loadingSubject.next(false);
  }
}
