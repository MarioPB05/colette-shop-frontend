import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {BrawlerCardResponse} from '@models/brawler.model';
import {SkipLoading} from '@interceptors/loading.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BrawlerService {
  constructor(private http: HttpClient) {}

  getUserCollection(): Observable<BrawlerCardResponse[]> {
    return this.http.get<BrawlerCardResponse[]>(`${environment.baseUrl}/brawlers/user/collection`);
  }

  setBrawlerFavorite(id: number, favorite: boolean): Observable<any> {
    return this.http.put(`${environment.baseUrl}/brawlers/${id}/favorite`, {'favorite': favorite}, {
      context: new HttpContext().set(SkipLoading, true)
    });
  }
}
