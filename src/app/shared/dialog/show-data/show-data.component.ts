import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {type: 'user', title: string, info: string, handleConfirm: any}
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  handleConfirm(id: string) {
    this.data.handleConfirm(id);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
