import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordPipe } from './pipes/password.pipe'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PasswordPipe],
  imports: [
    CommonModule
  ], 
  exports: [
    FormsModule,
    PasswordPipe,
    HttpClientModule
  ]
})
export class SharedModule { }
