import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { RequirementsComponent } from './requirements/requirements.component';
import { PageNFoundComponent } from './page-n-found/page-n-found.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'requirements',
        component:RequirementsComponent
    },
    {
        path:'**',
        component:PageNFoundComponent
    }
];
