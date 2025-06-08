import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-warnig-component',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './warnig-component.component.html',
  styleUrl: './warnig-component.component.css'
})
export class WarnigComponentComponent {
  constructor(private dialogRef: MatDialogRef<WarnigComponentComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
