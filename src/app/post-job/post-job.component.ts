import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllApiService } from '../services/api/all-api.service';
import { Job } from '../interfaces/interfaces';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-post-job',
  imports:[NgIf,FormsModule,SidebarComponent, QuillModule,],
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
    job_salary: '',
    job_status: '',
    job_created_at: new Date()
  };

  constructor(private apiService: AllApiService, private router: Router) {}

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

          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/requirements']);
          }, 2000);

          form.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Error posting job';
          console.error(err);
        }
      });
    } else {
      // Mark all controls as touched to show errors
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
        control.updateValueAndValidity?.(); // optional
      });
    }
  }
  clearSuccessMessage() {
    this.successMessage = '';
  }


}
