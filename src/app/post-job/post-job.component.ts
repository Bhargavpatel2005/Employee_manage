import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllApiService } from '../services/api/all-api.service';
import { Job } from '../interfaces/interfaces';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuillModule } from 'ngx-quill';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { WarnigComponentComponent } from './warnig-component/warnig-component.component';

@Component({
  selector: 'app-post-job',
  imports:[NgIf,FormsModule,SidebarComponent, QuillModule,MatDialogModule, MatDialogModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
  successMessage: string = '';
  errorMessage: string = '';

  job: Job = {
    id: 0,
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

  constructor(private apiService: AllApiService, private router: Router,
    public dialog: MatDialog) { }

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

  openDialog(form: any) {
    if (form.valid) {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        width: '600px',
        data: this.job
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'submit') {
          this.postJob(form);
        }
      });
    } else {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
        control.updateValueAndValidity?.();
      });
      this.openWarningDialog();
    }
  }


  openWarningDialog() {
    const dialogRef = this.dialog.open(WarnigComponentComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Warning dialog closed');
    });
  }
}
