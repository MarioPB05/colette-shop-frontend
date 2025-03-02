import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {BrawlerCardResponse} from '@models/brawler.model';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {
  constructor(private http: HttpClient) {}

  getUserCollection(): Observable<BrawlerCardResponse[]> {
    return this.http.get<BrawlerCardResponse[]>(`${environment.baseUrl}/brawlers/user/collection`);
  }

}
