import { Routes, RouterModule }  from '@angular/router';

import { DocumentsComponent } from './documents.component';

import { DocumentDetailsComponent} from './document-details/document-details.component'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    children: [
      //{ path: 'customersearch', component: CustomerSearchComponent},
      { path: 'documentdetails/:id', component: DocumentDetailsComponent}
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);