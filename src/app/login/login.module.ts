import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { RegisterComponent } from '../register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
