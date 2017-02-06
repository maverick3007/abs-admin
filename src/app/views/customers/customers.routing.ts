import { Routes, RouterModule }  from '@angular/router';

import { CustomersComponent } from './customers.component';
//import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerDetailsComponent} from './customer-details/customer-details.component'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      //{ path: 'customersearch', component: CustomerSearchComponent},
      { path: 'customerdetails/:id', component: CustomerDetailsComponent}
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);