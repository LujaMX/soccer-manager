import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TeamLeague } from '../models/TeamLeague';

@Injectable({
  providedIn: 'root'
})
export class TeamLeagueService {

  private apiUrl = 'https://localhost:7130/api/LeagueTeam';

  constructor(private http: HttpClient) { }


  // =========================
  // GET
  // =========================

  getTeamLeagues(): Observable<TeamLeague[]> {

    return this.http.get<TeamLeague[]>(
      this.apiUrl
    );

  }


  // =========================
  // POST
  // =========================

  createTeamLeague(
    teamLeague: TeamLeague
  ): Observable<TeamLeague> {

    return this.http.post<TeamLeague>(
      this.apiUrl,
      teamLeague
    );

  }

}
