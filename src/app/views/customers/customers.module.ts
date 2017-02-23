import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CustomersComponent } from './customers.component';
import { CustomerDetailsComponent} from './customer-details/customer-details.component';
import { CustomerIdentityComponent} from './components/customer-identity/customer-identity.component';
import { CustomerDocumentCountersComponent} from './components/customer-document-counters/customer-document-counters.component';
import { CustomerTicketsComponent } from './components/customer-tickets/customer-tickets.component';
import { routing }       from './customers.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CustomersComponent,
    CustomerDetailsComponent,
    CustomerIdentityComponent,
    CustomerDocumentCountersComponent,
    CustomerTicketsComponent
  ],
  providers: [

  ]
})
export default class CustomersModule {}