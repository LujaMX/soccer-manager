import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Team } from '../../models/Team';
import { TeamService } from '../../services/team.services';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class Teams implements OnInit {

  teams: Team[] = [];

  showForm: boolean = false;

  editing: boolean = false;

  currentTeam: Team = this.emptyTeam();


  constructor(
    private teamService: TeamService,
    private changeDetector: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    this.loadTeams();

  }


  // =========================
  // GET
  // =========================

  loadTeams(): void {

    this.teamService.getTeams().subscribe({

      next: (data) => {

        console.log('🔥 Equipos recibidos:', data);

        this.teams = [...data];

        // Forzar actualización de la vista
        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          '❌ Error al obtener equipos:',
          error
        );

      }

    });

  }


  // =========================
  // NUEVO
  // =========================

  newTeam(): void {

    this.editing = false;

    this.currentTeam = this.emptyTeam();

    this.showForm = true;

  }


  // =========================
  // EDITAR
  // =========================

  editTeam(team: Team): void {

    this.editing = true;

    this.currentTeam = {
      ...team
    };

    this.showForm = true;

  }


  // =========================
  // CANCELAR
  // =========================

  cancelForm(): void {

    this.showForm = false;

    this.editing = false;

    this.currentTeam = this.emptyTeam();

  }


  // =========================
  // GUARDAR
  // =========================

  saveTeam(): void {

    if (
      this.currentTeam.playersQuantity < 11 ||
      this.currentTeam.playersQuantity > 22
    ) {

      alert(
        'La cantidad de jugadores debe estar entre 11 y 22.'
      );

      return;

    }


    // =========================
    // UPDATE
    // =========================

    if (this.editing) {

      this.teamService
        .updateTeam(this.currentTeam)
        .subscribe({

          next: (data) => {

            console.log(
              'Equipo actualizado:',
              data
            );

            alert(
              'Equipo actualizado correctamente.'
            );

            this.showForm = false;

            this.editing = false;

            this.currentTeam = this.emptyTeam();

            this.loadTeams();

          },

          error: (error) => {

            console.error(
              'Error al actualizar:',
              error
            );

            alert(
              'No se pudo actualizar el equipo.'
            );

          }

        });

      return;
    }


    // =========================
    // CREATE
    // =========================

    this.teamService
      .createTeam(this.currentTeam)
      .subscribe({

        next: (data) => {

          console.log(
            'Equipo creado:',
            data
          );

          alert(
            'Equipo creado correctamente.'
          );

          this.showForm = false;

          this.currentTeam = this.emptyTeam();

          this.loadTeams();

        },

        error: (error) => {

          console.error(
            'Error al crear:',
            error
          );

          alert(
            'No se pudo crear el equipo.'
          );

        }

      });

  }


  // =========================
  // DELETE
  // =========================

  deleteTeam(id: number): void {

    const confirmDelete = confirm(
      '¿Seguro que deseas eliminar este equipo?'
    );

    if (!confirmDelete) {

      return;

    }


    this.teamService
      .deleteTeam(id)
      .subscribe({

        next: () => {

          console.log(
            'Equipo eliminado:',
            id
          );

          alert(
            'Equipo eliminado correctamente.'
          );

          this.loadTeams();

        },

        error: (error) => {

          console.error(
            'Error al eliminar:',
            error
          );

          alert(
            'No se pudo eliminar el equipo.'
          );

        }

      });

  }


  // =========================
  // TEAM VACÍO
  // =========================

  emptyTeam(): Team {

    return {

      id: 0,

      name: '',

      country: '',

      playersQuantity: 11,

      enabled: true

    };

  }

}
