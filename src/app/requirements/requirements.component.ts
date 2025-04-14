import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-requirements',
  imports: [ SidebarComponent,RouterLink],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.css'
})
export class RequirementsComponent {

}
