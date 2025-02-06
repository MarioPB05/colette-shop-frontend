import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {BoxShopResponse} from '@models/box.model';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  constructor(private http: HttpClient) {}

  getShopBoxes(): Observable<BoxShopResponse[]> {
    return this.http.get<BoxShopResponse[]>('/api/boxes/list');
  }

  getFreeDailyBoxes(): Observable<BoxShopResponse[]> {
    return this.http.get<BoxShopResponse[]>('/api/boxes/list-daily');
  }

  getBoxes(): Observable<any> {
    return forkJoin({
      shopBoxes: this.getShopBoxes(),
      freeDailyBoxes: this.getFreeDailyBoxes()
    });
  }
}
