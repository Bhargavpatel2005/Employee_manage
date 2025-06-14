import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AllApiService } from './api/all-api.service';
import { Login } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private allapiservices: AllApiService
  ) { }

  // login(email: string, password: string){
  //   this.allapiservices.login({email,password}).subscribe((data)=>{
  //     console.log(data);
  //   });
  // }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { email, password }).pipe(
      tap((res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('token', res.token);
          // console.log(res);
        }
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { email, password });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    window.location.href = '/login';
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!sessionStorage.getItem('token');
  }
}
