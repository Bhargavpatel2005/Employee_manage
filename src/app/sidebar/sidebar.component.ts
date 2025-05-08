import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  authenticated = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      window.location.replace('/login');
    }
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout/', {}, { withCredentials: true }).subscribe({
      next: () => {
        this.logoutmessage();
        this.clearStorageAndRedirect();
        window.location.replace('/login');
      },
      error: (err: any) => {
        console.error('Logout error:', err);
        this.clearStorageAndRedirect();
      }
    });
  }
  logoutmessage() {

  }

  private clearStorageAndRedirect() {
    sessionStorage.clear();
    localStorage.clear();
    this.authenticated = false;
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    window.location.replace('/login');
  }
}
