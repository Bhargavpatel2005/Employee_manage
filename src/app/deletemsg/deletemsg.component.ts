import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AllApiService } from '../services/api/all-api.service';
import { Job } from '../interfaces/interfaces';

@Component({
  selector: 'app-deletemsg',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './deletemsg.component.html',
  styleUrl: './deletemsg.component.css'
})
export class DeletemsgComponent {

  successMessage = 'delete';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Job,
    private apiservices: AllApiService,
    private dialogRef: MatDialogRef<DeletemsgComponent>,
    private dialog: MatDialog,) { }

  // get message(): string {
  // this.deleteJob(job.id)
  // return this.data?.message || 'Operation completed.';
  // }
  // deleteJob(id: number): void {
  //   this.apiservices.deleteJob(id).subscribe({
  //     next: (response) => {
  //       console.log('Job deleted successfully', response);
  //     },
  //     error: (error) => {
  //       console.error('Error deleting job', error);
  //     }
  //   });
  // }
  confirmSubmit() {
    this.dialogRef.close('submit');
    this.dialog.open(DeletemsgComponent, {
      // data: { message: this.successMessage },
      width: '400px'
    });
  }
}
