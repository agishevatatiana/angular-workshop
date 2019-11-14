import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BoardsService } from '../core/services/boards.service';
import { BoardComponent } from '../board/board.component';
import { ListComponent } from '../list/list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListService } from '../core/services/list.service';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent,
    BoardComponent,
    ListComponent
  ],
  providers: [
    BoardsService,
    ListService
  ]
})
export class DashboardModule { }
