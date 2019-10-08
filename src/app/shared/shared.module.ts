import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { PasswordPipe } from './pipes/password.pipe';
import { CreateNewDataComponent } from './dialog/create-new-data/create-new-data.component';


@NgModule({
  declarations: [
    PasswordPipe,
    CreateNewDataComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [
    FormsModule,
    PasswordPipe,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    CreateNewDataComponent
  ],
  entryComponents: [CreateNewDataComponent]
})
export class SharedModule { }
