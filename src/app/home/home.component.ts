import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
