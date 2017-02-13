import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import {TicketsComponent} from './tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

import { routing }       from './tickets.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    TicketsComponent, NewTicketComponent, TicketListComponent
  ],
  providers: [

  ]
})
export default class TicketsModule {}