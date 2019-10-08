import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-new-data',
  templateUrl: './create-new-data.component.html',
  styleUrls: ['./create-new-data.component.scss']
})
export class CreateNewDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string}
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
