import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CustomersComponent } from './customers.component';
import { CustomerSearchComponent} from './customer-search/customer-search.component';
import { CustomerDetailsComponent} from './customer-details/customer-details.component';
import { CustomerIdentityComponent} from './customer-identity/customer-identity.component';
import { CustomerDocumentsComponent} from './customer-documents/customer-documents.component';
import { CustomerDocumentCountersComponent} from './customer-document-counters/customer-document-counters.component';
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
    CustomerSearchComponent,
    CustomerIdentityComponent,
    CustomerDocumentsComponent,
    CustomerDocumentCountersComponent
  ],
  providers: [

  ]
})
export default class CustomersModule {}