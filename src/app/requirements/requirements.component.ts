import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { AllApiService } from '../services/api/all-api.service';
import { NgFor } from '@angular/common';
import { Job } from '../interfaces/interfaces';
import Container from 'quill/blots/container';
@Component({
  selector: 'app-requirements',
  imports: [SidebarComponent, RouterLink, NgFor],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.css'
})
export class RequirementsComponent {
  jobs: Job[] = [];

  constructor(private apiService: AllApiService) { }

  ngOnInit() {
    this.getJobs();
  }
  getJobs() {
    this.apiService.getJobs().subscribe((data:any) => {
      console.log(data);
      this.jobs = data
    });
  }
}
