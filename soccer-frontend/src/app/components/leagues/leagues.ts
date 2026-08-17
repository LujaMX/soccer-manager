import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { League } from '../../models/League';
import { LeagueService } from '../../services/league.services';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './leagues.html',
  styleUrl: './leagues.css'
})
export class Leagues implements OnInit {

  // Lista de ligas
  leagues: League[] = [];

  // Mostrar formulario
  showForm: boolean = false;

  // Indica si estamos editando
  editing: boolean = false;

  // Liga actual
  currentLeague: League = this.emptyLeague();


  constructor(
    private leagueService: LeagueService,
    private changeDetector: ChangeDetectorRef
  ) { }


  // =========================
  // INICIO
  // =========================

  ngOnInit(): void {

    this.loadLeagues();

  }


  // =========================
  // GET
  // =========================

  loadLeagues(): void {

    this.leagueService.getLeagues().subscribe({

      next: (data) => {

        console.log(
          '🔥 Ligas recibidas:',
          data
        );

        this.leagues = [...data];

        // Forzar actualización de la vista
        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          '❌ Error al obtener ligas:',
          error
        );

      }

    });

  }


  // =========================
  // NUEVA LIGA
  // =========================

  newLeague(): void {

    this.editing = false;

    this.currentLeague = this.emptyLeague();

    this.showForm = true;

  }


  // =========================
  // EDITAR LIGA
  // =========================

  editLeague(league: League): void {

    this.editing = true;

    // Crear copia para no modificar
    // directamente el registro original

    this.currentLeague = {
      ...league
    };

    this.showForm = true;

  }


  // =========================
  // CANCELAR
  // =========================

  cancelForm(): void {

    this.showForm = false;

    this.editing = false;

    this.currentLeague = this.emptyLeague();

  }


  // =========================
  // GUARDAR
  // POST / PUT
  // =========================

  saveLeague(): void {

    // =========================
    // VALIDACIÓN DE FECHAS
    // =========================

    const startDate = new Date(
      this.currentLeague.startDate
    );

    const endDate = new Date(
      this.currentLeague.endDate
    );


    if (startDate >= endDate) {

      alert(
        'La fecha de inicio debe ser anterior a la fecha de fin.'
      );

      return;

    }


    // =========================
    // UPDATE
    // =========================

    if (this.editing) {

      this.leagueService
        .updateLeague(this.currentLeague)
        .subscribe({

          next: (data) => {

            console.log(
              'Liga actualizada:',
              data
            );

            alert(
              'Liga actualizada correctamente.'
            );

            this.showForm = false;

            this.editing = false;

            this.currentLeague = this.emptyLeague();

            this.loadLeagues();

          },

          error: (error) => {

            console.error(
              'Error al actualizar:',
              error
            );

            alert(
              'No se pudo actualizar la liga.'
            );

          }

        });

      return;

    }


    // =========================
    // CREATE
    // =========================

    this.leagueService
      .createLeague(this.currentLeague)
      .subscribe({

        next: (data) => {

          console.log(
            'Liga creada:',
            data
          );

          alert(
            'Liga creada correctamente.'
          );

          this.showForm = false;

          this.currentLeague = this.emptyLeague();

          this.loadLeagues();

        },

        error: (error) => {

          console.error(
            'Error al crear:',
            error
          );

          alert(
            'No se pudo crear la liga.'
          );

        }

      });

  }


  // =========================
  // DELETE
  // =========================

  deleteLeague(id: number): void {

    const confirmDelete = confirm(
      '¿Seguro que deseas eliminar esta liga?'
    );


    if (!confirmDelete) {

      return;

    }


    this.leagueService
      .deleteLeague(id)
      .subscribe({

        next: () => {

          console.log(
            'Liga eliminada:',
            id
          );

          alert(
            'Liga eliminada correctamente.'
          );

          this.loadLeagues();

        },

        error: (error) => {

          console.error(
            'Error al eliminar:',
            error
          );

          alert(
            'No se pudo eliminar la liga.'
          );

        }

      });

  }


  // =========================
  // LIGA VACÍA
  // =========================

  emptyLeague(): League {

    return {

      id: 0,

      name: '',

      country: '',

      startDate: '',

      endDate: '',

      enabled: true

    };

  }

}
