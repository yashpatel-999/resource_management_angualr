import { Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutcompComponent } from './components/layoutcomp/layoutcomp.component';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutcompComponent,
        children: [
            {
                path: 'client',
                component: ClientComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'employee',
                component: EmployeeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'client-project',
                component: ClientProjectComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];
