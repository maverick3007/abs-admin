import { Routes, RouterModule } from '@angular/router';
import { Views } from './views.component';

import {AuthGuardService} from '../services';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => System.import('./login/login.module')
    },
    {
        path: 'views',
        component: Views,
        canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
            { path: 'customers', loadChildren: () => System.import('./customers/customers.module') },
            { path: 'documents', loadChildren: () => System.import('./documents/documents.module') },
            { path: 'articles', loadChildren: () => System.import('./articles/articles.module') },
            { path: 'tickets', loadChildren: () => System.import('./tickets/tickets.module') },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
