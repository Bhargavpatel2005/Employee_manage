import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SuccessComponent } from '../../success/success.component';
import { AllApiService } from '../../services/api/all-api.service';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {

  message = HistoryComponent.successMessage;
  messagee=''
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: AllApiService,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    private dialog: MatDialog,
  ) { }

  confirmSubmit() {
    this.dialogRef.close('submit');
    this.dialog.open(SuccessComponent, {
      width: '400px',
      data: {
          message: this.message
        } 
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
