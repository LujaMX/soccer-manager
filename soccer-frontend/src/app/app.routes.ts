import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Teams } from './components/teams/teams';
import { Leagues } from './components/leagues/leagues';
import { TeamLeagues } from './components/team-leagues/team-leagues';

export const routes: Routes = [

  // Página principal
  {
    path: '',
    component: Home
  },

  // Equipos
  {
    path: 'teams',
    component: Teams
  },

  // Ligas
  {
    path: 'leagues',
    component: Leagues
  },

  // Relaciones LeagueTeam
  {
    path: 'team-leagues',
    component: TeamLeagues
  }

];
