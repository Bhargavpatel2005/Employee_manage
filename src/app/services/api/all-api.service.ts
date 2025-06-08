import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, Login } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AllApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any> {
    return this.http.get(this.baseUrl + "post_job");
  }

  getJobById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + "post_job/"}${id}/`);
  }

  postJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl + "post_job/", job);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.baseUrl + "post_job/"}${id}/`, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl + "post_job/"}${id}/`);
  }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl + "login", login)
  }

  hr_depatment() {
    return this.http.get(this.baseUrl + "hr_department/");
  }
}
