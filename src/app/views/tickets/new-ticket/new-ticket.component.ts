import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';
import { InitService } from '../../../services';
import '../../../components/rich-editor/rich-editor.loader.ts';

@Component({
    selector: 'new-ticket',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./new-ticket.scss')],
    template: require('./new-ticket.html')
})

export class NewTicketComponent {

    ticket: Ticket = new Ticket;
    priorities: Array<Object>;
    statuses: Array<Object>;
    users: Array<Object>;
    constructor(private route: ActivatedRoute, private _router: Router, private _location: Location, private auth: AuthenticationService, private _state: GlobalState, private _init: InitService) {     
        this.route.params
            .map(params => params['id'])
            .switchMap(id => this.auth.apiGet('customer/' + id))
            .subscribe(cust => {
                if (cust.Id == null) {
                    this._state.notify('popup.customerselect', '');
                } else {
                    this.ticket.Customer = cust;
                }
            });
        this._state.subscribe('customer.details', (value) => {
            this.ticket.Customer = value;
        });
        this._state.subscribe('customer.noneselected', (value) => {
            this._location.back();
        });
        this.priorities = this._init.taskTicketpriorities;
        this.statuses = this._init.taskTicketStatuses;
        this.users = this._init.taskTicketusers;
        this.ticket.StatusId = "10";
        this.ticket.PriorityId = "20";
        this.ticket.WorkUnits = 0;
        this.auth.apiGet('user/me').subscribe(me => this.ticket.AssignedToId = me['Id'])
    }

    ngAfterContentChecked(){
        this._state.notifyDataChanged('menu.activeLink', { title: 'Nieuw Ticket '  });
    }

    ngOnDestroy() {
        this._state.unsublast('customer.details');
        this._state.unsublast('customer.noneselected');
    }

    navToCustomer() {
        this._state.notify('popup.customerselect', '');
    }

    createTicket() {
        this.auth.apiPost('taskticket', this.ticket).subscribe(newticket => {
            this._router.navigate(['/views/tickets/ticketdetails', newticket['Id']])
        })
    }
}



class Ticket {
    Description: string;
    PriorityId: string;
    StatusId: string;
    AssignedToId: string;
    WorkUnits: number;
    Customer: Object;
}