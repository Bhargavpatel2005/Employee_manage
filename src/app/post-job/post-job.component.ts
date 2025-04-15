import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AllApiService } from '../services/api/all-api.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Job } from '../interfaces/interfaces';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-post-job',

  imports: [SidebarComponent, FormsModule, CommonModule,
    ReactiveFormsModule,QuillModule
  ],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',

})
export class PostJobComponent implements OnInit {
  job: Job = {
    id: 0,
    job_title: '',
    job_department: '',
    job_position: '',
    job_experience: 0,
    job_type: '',
    job_education: '',
    job_skills: '',
    job_description: '',
    job_location: '',
    job_salary: 0,
    job_status: '',
    job_created_at: new Date()
  };
  constructor(private apiService: AllApiService) { }

  ngOnInit() {
    // Initialize any required setup
  }

  postJob() {
    this.apiService.postJob(this.job).subscribe({
      next: (response) => {
        console.log('Job posted successfully:', response);
        // Reset form
        this.job = {
          id: 0,
          job_title: '',
          job_department: '',
          job_position: '',
          job_experience: 0,
          job_type: '',
          job_education: '',
          job_skills: '',
          job_description: '',
          job_location: '',
          job_salary: 0,
          job_status: '',
          job_created_at: new Date()
        };
      },
      error: (error) => {
        console.error('Error posting job:', error);
      }
    });
  }
  confirm() {
    
 }
}