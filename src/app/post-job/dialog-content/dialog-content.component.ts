import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { AllApiService } from '../../services/api/all-api.service';
import { Job } from '../../interfaces/interfaces';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatDialog } from '@angular/material/dialog';

  @Component({
    selector: 'app-dialog-content',
    imports: [MatDialogModule,MatButtonModule],
    templateUrl: './dialog-content.component.html',
    styleUrl: './dialog-content.component.css'
  })
  export class DialogContentComponent {
    successMessage ='posted';
    errorMessage: string = '';

    job: Job = {
      id:0,
      job_title: '',
      job_department: '',
      job_position: '',
      job_experience: '',
      job_type: '',
      job_education: '',
      job_skills: '',
      job_description: '',
      job_location: '',
      job_min_salary: 0,  
      job_max_salary: 0,
      job_status: '',
      job_created_at: new Date()
    };
    
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private apiService: AllApiService,
      private dialogRef: MatDialogRef<DialogContentComponent>
    ) {}

    confirmSubmit() {
      this.dialogRef.close('submit');
    }

    cancel() {
      this.dialogRef.close();
    }

    postJob(form: any) {
      if (form.valid) {
        this.apiService.postJob(this.job).subscribe({
          next: () => {
            this.successMessage = 'Job posted successfully!';
            const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
            activities.unshift({
              type: 'Job',
              action: 'Posted',
              timestamp: new Date()
            });
            localStorage.setItem('recentActivities', JSON.stringify(activities.slice(0, 10)));
            form.resetForm();
          },
          error: (err) => {
            this.errorMessage = 'Error posting job';
            console.error(err);
          }
        });
      } else {
        Object.values(form.controls).forEach((control: any) => {
          control.markAsTouched();
          control.updateValueAndValidity?.();
        });
      }
    } 
}