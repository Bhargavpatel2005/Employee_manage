import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { RequirementsComponent } from './requirements/requirements.component';
import { PageNFoundComponent } from './page-n-found/page-n-found.component';
import { PostJobComponent } from './post-job/post-job.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './post-job/history/history.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'requirements', component: RequirementsComponent},
    { path: 'requirements/post-job', component:PostJobComponent },
    { path: 'requirements/post-job/history', component:HistoryComponent },
    { path: 'requirements/post-job/:id', component:PostJobComponent },
    { path: 'success', component: SuccessComponent },
    { path: '**',component: PageNFoundComponent},

];
