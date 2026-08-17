import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TeamLeague } from '../../models/TeamLeague';
import { Team } from '../../models/Team';
import { League } from '../../models/League';

import { TeamLeagueService } from '../../services/team-league.services';
import { TeamService } from '../../services/team.services';
import { LeagueService } from '../../services/league.services';


@Component({
  selector: 'app-team-leagues',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './team-leagues.html',
  styleUrl: './team-leagues.css'
})
export class TeamLeagues implements OnInit {


  // =================================
  // LISTAS
  // =================================

  teams: Team[] = [];

  leagues: League[] = [];

  teamLeagues: TeamLeague[] = [];


  // =================================
  // RELACIÓN ACTUAL
  // =================================

  currentTeamLeague: TeamLeague = {

    leagueId: 0,

    teamId: 0

  };


  constructor(
    private teamLeagueService: TeamLeagueService,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private changeDetector: ChangeDetectorRef
  ) { }


  // =================================
  // INICIO
  // =================================

  ngOnInit(): void {

    this.loadTeams();

    this.loadLeagues();

    this.loadTeamLeagues();

  }


  // =================================
  // CARGAR TEAMS
  // =================================

  loadTeams(): void {

    this.teamService.getTeams().subscribe({

      next: (data) => {

        console.log(
          '🔥 Teams:',
          data
        );

        this.teams = [...data];

        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          '❌ Error al obtener Teams:',
          error
        );

      }

    });

  }


  // =================================
  // CARGAR LEAGUES
  // =================================

  loadLeagues(): void {

    this.leagueService.getLeagues().subscribe({

      next: (data) => {

        console.log(
          '🔥 Leagues:',
          data
        );

        this.leagues = [...data];

        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          '❌ Error al obtener Leagues:',
          error
        );

      }

    });

  }


  // =================================
  // CARGAR RELACIONES
  // =================================

  loadTeamLeagues(): void {

    this.teamLeagueService
      .getTeamLeagues()
      .subscribe({

        next: (data) => {

          console.log(
            '🔥 Relaciones TeamLeague:',
            data
          );

          this.teamLeagues = [...data];

          this.changeDetector.detectChanges();

        },

        error: (error) => {

          console.error(
            '❌ Error al obtener relaciones:',
            error
          );

        }

      });

  }


  // =================================
  // INSCRIBIR TEAM
  // =================================

  createTeamLeague(): void {


    // -------------------------------
    // Validar League
    // -------------------------------

    if (
      this.currentTeamLeague.leagueId === 0
    ) {

      alert(
        'Selecciona una liga.'
      );

      return;

    }


    // -------------------------------
    // Validar Team
    // -------------------------------

    if (
      this.currentTeamLeague.teamId === 0
    ) {

      alert(
        'Selecciona un equipo.'
      );

      return;

    }


    // -------------------------------
    // Evitar duplicados
    // -------------------------------

    const exists =
      this.teamLeagues.some(
        relationship =>
          relationship.leagueId ===
          this.currentTeamLeague.leagueId
          &&
          relationship.teamId ===
          this.currentTeamLeague.teamId
      );


    if (exists) {

      alert(
        'Este equipo ya está inscrito en esta liga.'
      );

      return;

    }


    // -------------------------------
    // POST
    // -------------------------------

    this.teamLeagueService
      .createTeamLeague(
        this.currentTeamLeague
      )
      .subscribe({

        next: (data) => {

          console.log(
            '✅ Relación creada:',
            data
          );

          alert(
            'Equipo inscrito correctamente.'
          );


          // Limpiar selección

          this.currentTeamLeague = {

            leagueId: 0,

            teamId: 0

          };


          // Recargar relaciones

          this.loadTeamLeagues();

        },


        error: (error) => {

          console.error(
            '❌ Error al crear relación:',
            error
          );

          alert(
            'No se pudo inscribir el equipo.'
          );

        }

      });

  }


  // =================================
  // OBTENER NOMBRE DE LEAGUE
  // =================================

  getLeagueName(
    leagueId: number
  ): string {

    const league =
      this.leagues.find(
        league =>
          league.id === leagueId
      );


    if (!league) {

      return 'Liga desconocida';

    }


    return league.name;

  }


  // =================================
  // OBTENER NOMBRE DE TEAM
  // =================================

  getTeamName(
    teamId: number
  ): string {

    const team =
      this.teams.find(
        team =>
          team.id === teamId
      );


    if (!team) {

      return 'Equipo desconocido';

    }


    return team.name;

  }

}
