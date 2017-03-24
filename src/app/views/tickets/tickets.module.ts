import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { CKEditorModule } from 'ng2-ckeditor';

import {TicketsComponent} from './tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketFilterComponent } from './components/ticket-filter/ticket-filter.component';
import { TicketTableComponent } from './components/ticket-table/ticket-table.component';
import { TicketWorkbookingComponent} from './ticket-workbooking/ticket-workbooking.component';

import { routing }       from './tickets.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    CKEditorModule,
    routing
  ],
  declarations: [
    TicketsComponent, NewTicketComponent, TicketListComponent, TicketFilterComponent,TicketTableComponent, TicketDetailsComponent, TicketWorkbookingComponent
  ],
  providers: [

  ]
})
export default class TicketsModule {}