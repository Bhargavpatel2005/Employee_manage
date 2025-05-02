import { routes } from './../app.routes';
import { hr_department } from './../interfaces/interfaces';
import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AllApiService } from '../services/api/all-api.service';
import { Job } from '../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { WarnigComponentComponent } from './warnig-component/warnig-component.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuillModule } from 'ngx-quill';
import { MatDialogModule } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-post-job',
  imports: [NgIf,FormsModule, SidebarComponent, QuillModule, MatDialogModule, MatDialogModule,RouterLink, RouterOutlet],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  jobs: any[] = [];
  // Hr_department: hr_department[] = [];
  // departmentTitles:any

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
    job_Responsibilities:'',
    job_location: '',
    job_min_salary: '',
    job_max_salary: '',
    job_status: '',
    Recruitment_start_Period: new Date,
    Recruitment_end_Period: new Date,
    job_created_at: '',
    job_updated_at: '',
  };

  constructor(
    private apiService: AllApiService,
    private router: ActivatedRoute,
    private routers:Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.hr_department();
    // this.getJobs();
    // Get the job ID from the route parameters
    const jobId = this.router.snapshot.paramMap.get('id');
    if (jobId) {
      this.getJobDetails(+jobId); // Fetch job details by ID
    }
  }

  postJob(form: any) {
    if(this.job.id===0){
      if (form.valid) {
        this.apiService.postJob(this.job).subscribe({
          next: () => {
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
            console.error(err);
          }
        });
      }
    }
     else {
      this.apiService.updateJob(this.job.id, this.job).subscribe((data)=>{
        if (data) {
          this.getJobDetails(this.job.id);
        }
      })
      this.markFormTouched(form);
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
        this.markFormTouched(form);
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

  private markFormTouched(form: any) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
      control.updateValueAndValidity?.();
    });
  }

//   onDepartmentChange(event: Event): void {
//   const selectedValue = (event.target as HTMLSelectElement).value;
//   if (selectedValue === 'HR') {
//     this.hr_department();
//   }
// }

  // hr_department() {
  //   this.apiService.hr_depatment().subscribe({
  //     next: (data: any) => {
  //       this.Hr_department = data;
  //       console.log(this.Hr_department);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching HR department data:', err);
  //     }
  //   });
  // }

  getJobDetails(id: number) {
    this.apiService.getJobById(id).subscribe((data: Job) => {
      console.log(data);
      this.job= data; // Populate the form with the fetched job details
    });
  }
}
