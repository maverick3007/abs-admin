import { Routes, RouterModule }  from '@angular/router';

import { TicketsComponent } from './tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

//import { ArticleDetailsComponent} from './article-details/article-details.component'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      { path: 'ticketlist', component: TicketListComponent},
      { path: 'newticket', component: NewTicketComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);