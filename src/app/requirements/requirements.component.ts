import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-requirements',
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.css'
})
export class RequirementsComponent {

}
