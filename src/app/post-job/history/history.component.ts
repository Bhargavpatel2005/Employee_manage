import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllApiService } from './../../services/api/all-api.service';
import { Job } from './../../interfaces/interfaces';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DeletemsgComponent } from '../../deletemsg/deletemsg.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessComponent } from '../../success/success.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent, NgIf, NgFor, FormsModule,CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  static successMessage = 'successfully completed';
  htmlContent: SafeHtml = '';

  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  protected Math = Math;

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
    job_Responsibilities: '',
    job_location: '',
    job_min_salary: '',
    job_max_salary: '',
    job_status: '',
    Recruitment_start_Period: new Date,
    Recruitment_end_Period: new Date,
    post_app: '',
    quota: '',
    job_created_at: '',
    job_updated_at: '',
  };

  constructor(
    private apiService: AllApiService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.apiService.getJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.jobs = Array.isArray(data) ? data : [data];
      this.totalItems = this.jobs.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }


  get filteredJobs(): Job[] {
    if (!this.searchTerm.trim()) return this.jobs;
    const lowerSearch = this.searchTerm.toLowerCase();
    return this.jobs.filter(job =>
      job.job_title.toLowerCase().includes(lowerSearch) ||
      job.job_department.toLowerCase().includes(lowerSearch) ||
      job.job_position.toLowerCase().includes(lowerSearch)
    );
  }

  get paginatedJobs(): Job[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.totalItems = this.filteredJobs.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  viewjob(job: Job): void {
    this.apiService.getJobById(job.id).subscribe((data: Job) => {
      this.selectedJob = data;
      console.log(data);
      // this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(data.job_description);
    });
  }

  editjob(job: Job): void {
    if (!job?.id) return;
    this.router.navigate(['requirements/post-job', job.id]);
  }

  deletejob(job: Job): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '600px',
      data: job
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'submit') {
        this.getJobs();
      }
    });

    dialogRef.afterClosed().subscribe((result: 'submit' | undefined) => {
      if (result === 'submit') {
        this.apiService.deleteJob(job.id).subscribe({
          next: () => {
            this.getJobs();
          },
          error: () => {


          }
        });
      }
    });
  }
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
}
