import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import {GlobalState} from '../../../../global.state';


@Component({
    selector: 'ticket-table',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-table.scss')],
    template: require('./ticket-table.html')
})

export class TicketTableComponent implements OnInit{
    tickets: Array<Object>= [];;
    filterString: string;
    page: number;
    hasMoreEntries:boolean;
    loading:boolean;

    constructor(private _auth: AuthenticationService, private _state:GlobalState ) {
        this.filterString = '';
        this.tickets = [];
        this.hasMoreEntries = false;
        this.loading = false;
        this._state.subscribe('ticketfilter.filtersent', (value) =>{
            this.filterString = value;
            this.page = 0;
            this.tickets = [];
            this.getTickets();
        });
    }

    ngOnInit(){
        this.page=0;
        this.getTickets();
    }

    getTickets(){
        this.page++;
        this.loading = true;
        this._auth.apiGet('taskticket?pger=' + this.page + this.filterString).subscribe(ticks => this.extractTickets(ticks))
    }

    extractTickets(ticks){
        this.loading = false;
        this.page = ticks.Page;
        (ticks.Page == ticks.Pages) ? this.hasMoreEntries = false : this.hasMoreEntries = true;
        for (var i = 0; i < ticks.Results.length; i++) {
            this.tickets.push(ticks.Results[i]);
        }
    }

}