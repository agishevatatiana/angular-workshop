import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { SearchComponent } from '../search/search.component';
import { UserService } from '../core/services/user.service';

@NgModule({
  declarations: [
    NavigationComponent,
    SearchComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserService
  ],
  exports: [ NavigationComponent ]
})
export class NavigationModule { }
