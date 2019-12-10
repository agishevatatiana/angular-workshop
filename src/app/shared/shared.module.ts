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
  MatDialogModule,
  MatExpansionModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { CreateNewDataComponent } from './dialog/create-new-data/create-new-data.component';
import { SearchPipe } from './pipes/search.pipe';
import { ShowDataComponent } from './dialog/show-data/show-data.component';


@NgModule({
  declarations: [
    SearchPipe,
    CreateNewDataComponent,
    ShowDataComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    CreateNewDataComponent,
    SearchPipe
  ],
  entryComponents: [
    CreateNewDataComponent,
    ShowDataComponent
  ]
})
export class SharedModule { }
