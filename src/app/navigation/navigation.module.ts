import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    NavigationComponent,
    SearchComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [ NavigationComponent ]
})
export class NavigationModule { }
