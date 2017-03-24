import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { GlobalState } from '../../../global.state';

@Component({
    selector: 'ticket-workbooking',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-workbooking.scss')],
    template: require('./ticket-workbooking.html')
})

export class TicketWorkbookingComponent{
    ticket: Object = null;
    was: Array<Object> = [];
    events: Array<Object> = [];

    constructor(private route: ActivatedRoute, private _router: Router, private auth: AuthenticationService, private _state: GlobalState){
            this.route.params
            .map(params => params['id'])
            .switchMap(id => this.auth.apiGet('taskticket/' + id))
            .subscribe(ticket => {
                this.ticket = ticket;
                this.events = ticket['Events'];
                this.auth.apiGet('customer/' +ticket['CustomerId']+ '/workagreements').subscribe(wa => this.was.push(wa))
            });
    }

        ngAfterContentChecked(){
        this._state.notifyDataChanged('menu.activeLink', { title: 'Boeken Werkunits'  });
    }
}