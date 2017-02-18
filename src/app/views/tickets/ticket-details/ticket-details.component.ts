import {Component, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { GlobalState } from '../../../global.state';
import {Location} from '@angular/common';

@Component({
  selector: 'ticket-details',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./ticket-details.scss')],
  template: require('./ticket-details.html')
})

export class TicketDetailsComponent  {
    ticket: Object = null;
    events: Array<Object> = [];
    constructor(private route: ActivatedRoute, private _location: Location,private auth: AuthenticationService, private _state: GlobalState){
                
                this.route.params
        .map(params => params['id'])
        .switchMap(id => this.auth.apiGet('taskticket/' + id ))
        .subscribe(ticket => {
            this.ticket = ticket;
            this.events = ticket.Events;
            this._state.notifyDataChanged('menu.activeLink', {title:'Ticket ' + ticket.Id});
        });
    }

    navBack(){
        this._location.back();
    }



}