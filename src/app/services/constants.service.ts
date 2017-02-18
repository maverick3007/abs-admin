import { Injectable } from '@angular/core';


@Injectable()
export class ConstantsService {

  root_url: string = 'http://api-abs.azurewebsites.net/'; 
  //root_url: string = 'http://localhost:53628/';

  DocumentTypes: Array<Object> = []; 
  TicketFilter: TicketFilter = new TicketFilter;

  constructor() { 
      this.TicketFilter.filterOnPriority = false;
      this.TicketFilter.filterOnStatus = false;
      this.TicketFilter.filterOnUser = false;
      this.TicketFilter.filterOnId = false;
      this.TicketFilter.filterOnTitle = false;
      this.TicketFilter.nonClosedOnly = true;
      /*this.TicketFilter.assignedid = "10" ;   
      this.TicketFilter.priorid = "10" ;   
      this.TicketFilter.statusid = "10" ;     */
  }

}

class TicketFilter {
    filterOnPriority: boolean;
    filterOnStatus: boolean;
    filterOnUser: boolean;
    filterOnId: boolean;
    filterOnTitle: boolean;
    nonClosedOnly: boolean;
    customer: Object;
    searchString: string;
    priorid: string;
    statusid: string;
    userid: string;
    assignedid: string;
    ticketid: string;
    incClosed: boolean;
}
