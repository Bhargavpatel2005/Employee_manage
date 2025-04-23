import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../services/api/all-api.service';
import { Job } from '../../interfaces/interfaces';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-content',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {
  successMessage = 'posted';
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: AllApiService,
    private dialogRef: MatDialogRef<DialogContentComponent>
  ) {}

  confirmSubmit() {
    this.dialogRef.close('submit');
    this.successMessage
  }

  cancel() {
    this.dialogRef.close();
  }
}