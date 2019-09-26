import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule } from '@angular/material';

import { PasswordPipe } from './pipes/password.pipe';


@NgModule({
  declarations: [PasswordPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    PasswordPipe,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SharedModule { }
