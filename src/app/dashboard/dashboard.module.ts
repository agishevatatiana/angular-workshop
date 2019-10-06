import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BoardsService } from '../core/services/boards.service';
import { BoardComponent } from '../board/board.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent,
    BoardComponent
  ],
  providers: [
    BoardsService
  ]
})
export class DashboardModule { }
