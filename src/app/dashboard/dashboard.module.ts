import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BoardsService } from '../core/services/boards.service';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    BoardsService
  ]
})
export class DashboardModule { }
