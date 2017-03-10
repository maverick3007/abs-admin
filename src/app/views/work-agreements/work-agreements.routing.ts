import { Routes, RouterModule }  from '@angular/router';

import { WorkAgreementsComponent } from './work-agreements.component';
import { NewWaComponent } from './new-wa/new-wa.component';


const routes: Routes = [
  {
    path: '',
    component: WorkAgreementsComponent,
    children: [
      { path: 'newwa', component: NewWaComponent},
      { path: 'newwa/:id', component: NewWaComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);