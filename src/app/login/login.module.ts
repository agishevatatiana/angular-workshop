import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [ AuthService ]
})
export class LoginModule { }
