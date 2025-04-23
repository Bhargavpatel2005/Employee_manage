import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AllApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/post_job/';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getJobById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  } 

  postJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, job);
  } 

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

}
