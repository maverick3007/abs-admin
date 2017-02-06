import { Routes, RouterModule } from '@angular/router';

/*export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' }
];*/
export const routes: Routes = [
  { path: '', redirectTo: 'views', pathMatch: 'full' },
  { path: '**', redirectTo: 'views/dashboard' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
