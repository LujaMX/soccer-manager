import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'https://localhost:7130/api/Team';

  constructor(private http: HttpClient) { }


  // =========================
  // GET - Obtener todos
  // =========================

  getTeams(): Observable<Team[]> {

    return this.http.get<Team[]>(this.apiUrl);

  }


  // =========================
  // POST - Crear
  // =========================

  createTeam(team: Team): Observable<Team> {

    return this.http.post<Team>(
      this.apiUrl,
      team
    );

  }


  // =========================
  // PUT - Actualizar
  // =========================

  updateTeam(team: Team): Observable<Team> {

    return this.http.put<Team>(
      `${this.apiUrl}/${team.id}`,
      team
    );

  }


  // =========================
  // DELETE - Eliminar
  // =========================

  deleteTeam(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
