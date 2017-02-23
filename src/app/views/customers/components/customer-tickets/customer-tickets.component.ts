import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../../../services';
import { MessageService } from '../../../../services';

@Component({
    selector: 'customer-tickets',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-tickets.scss')],
    template: require('./customer-tickets.html')
})

export class CustomerTicketsComponent implements OnChanges {
    @Input() customer: Object;
    tickets: Array<Object>;
    loading: boolean = false;
    page: number;
    hasMoreEntries: boolean;
    constructor(private _auth: AuthenticationService, private _router: Router) {
        this.page = 0;
        this.tickets = [];
        this.hasMoreEntries = false;
        this.loading = false;
    }

    ngOnChanges() {
        if (!!this.customer) {
            this.getTickets();
        }
    }

    getTickets() {
        this.page++;
        this.loading = true;
        this._auth.apiGet('customer/' + this.customer['Id'] + '/tasktickets?pger=' + this.page).subscribe(ticks => this.extractTickets(ticks))
    }

    extractTickets(ticks){
        this.loading = false;
        this.page = ticks.Page;
        (ticks.Page == ticks.Pages) ? this.hasMoreEntries = false : this.hasMoreEntries = true;
        for (var i = 0; i < ticks.Results.length; i++) {
            this.tickets.push(ticks.Results[i]);
        }
    }
    selectTicket(val){
         this._router.navigate(['/views/tickets/ticketdetails' ,val.Id]);
    }

}