import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from '../board/board.component';
import { AuthGuard } from '../auth.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board/:boardId',
    component: BoardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)]
})
export class DashboardRoutingModule { }
