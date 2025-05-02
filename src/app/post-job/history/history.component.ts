import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllApiService } from './../../services/api/all-api.service';
import { Job } from './../../interfaces/interfaces';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent, NgIf, NgFor, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  htmlContent: SafeHtml = '';

  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  protected Math = Math;

  constructor(
    private apiService: AllApiService,
    private router: Router,private sanitizer: DomSanitizer
  ) {}

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
    if (this.currentPage > 1){
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  viewjob(job: Job): void {
    this.apiService.getJobById(job.id).subscribe((data: Job) => {
      this.selectedJob = data;
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(data.job_description);
    });
  }

  editjob(job: Job): void {
    if (!job?.id) return;
    this.router.navigate(['requirements/post-job', job.id]);
  }
}
