import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { League } from '../models/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private apiUrl = 'https://localhost:7130/api/League';

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.apiUrl);
  }

  createLeague(league: League): Observable<League> {
    return this.http.post<League>(
      this.apiUrl,
      league
    );
  }

  updateLeague(league: League): Observable<League> {
    return this.http.put<League>(
      `${this.apiUrl}/${league.id}`,
      league
    );
  }
  deleteLeague(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}
