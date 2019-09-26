import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class RegisterModule { }
