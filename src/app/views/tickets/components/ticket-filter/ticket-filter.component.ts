import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl }   from '@angular/forms';

import { GlobalState } from '../../../../global.state';
import { AuthenticationService } from '../../../../services';



@Component({
    selector: 'ticket-filter',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-filter.scss')],
    template: require('./ticket-filter.html')
})

export class TicketFilterComponent {
    priorities: Array<Object>;
    statuses: Array<Object>;
    users: Array<Object>;
    tickets: Array<Object>;
    filterOnStatus:boolean;
    selectedStatus:string;
    nonClosedOnly: boolean;
    filterOnPriority:boolean;
    filterOnUser:boolean;
    filterOnId:boolean;
    filterOnTitle:boolean;
    filterCustomer:Object;
    filterSearchString: string;
    filterId:string;
    filter: TicketFilter= new TicketFilter;
    customerSearchString : string;



    public checkboxPrioritiesMapping = {
        model: 'checked',
        value: 'name',
        label: 'name',
        baCheckboxClass: 'class'
    };

    constructor(private _auth: AuthenticationService, private _state:GlobalState) {
        this.statuses = [];
        this.priorities = [];
        this.filterOnPriority = false;
        this.filterOnStatus = false;
        this.filterOnUser = false;
        this.filterOnId = false;
        this.filterOnTitle = false;
        this.nonClosedOnly = true;
        this.filter = new TicketFilter;
        this._auth.apiGet('taskticket/statuses').subscribe(vals => this.extractStatuses(vals));
        this._auth.apiGet('taskticket/priorities').subscribe(vals => this.extractPriorities(vals));
        this._auth.apiGet('taskticket/users').subscribe(vals => this.extractUsers(vals));
        this.customerSearchString = '';
        this._state.subscribe('customer.details', (value) => {
            this.filter.customer = value;
        });
    }
    

    clearCustomer(){
        this.filter.customer = null;
    }


    searchCustomer(){
        this._state.notify('popup.customerselect', this.customerSearchString);
    }

    toggleNonClosedOnly(){
        this.nonClosedOnly = !this.nonClosedOnly;
    }

    toggleFilterOnStatus(){
        this.filterOnStatus = !this.filterOnStatus;
    }

    toggleFilterOnPriority(){
        this.filterOnPriority = !this.filterOnPriority;
    }

    toggleFilterOnUser(){
        this.filterOnUser = !this.filterOnUser;
    }

    toggleFilterOnId(){
        this.filterOnId = !this.filterOnId;
    }

    toggleFilterOnTitle(){
        this.filterOnTitle = !this.filterOnTitle;
    }

    extractStatuses(vals) {
        this.statuses = vals;
        this.filter.statusid = vals[0].Id;
    }

    extractPriorities(vals) {
        this.priorities = vals;
        this.filter.priorid = vals[0].Id;
    }

    extractUsers(vals) {
        this.users = vals;
        this.filter.assignedid = vals[0].Id;
    }

    clearFilter(){
        this.filterOnPriority = false;
        this.filterOnStatus = false;
        this.filterOnUser = false;
        this.filterOnId = false;
        this.filterOnTitle = false;
        this.nonClosedOnly = true;
        this.clearCustomer();
        this.filterNow();
    }

    filterNow(){
        var filterString = '';
        if(this.filterOnStatus){filterString = filterString + "&statusids=" + this.filter.statusid ;}
        if(this.filterOnPriority){filterString = filterString + "&priorids=" + this.filter.priorid;}
        if(this.filterOnUser){filterString = filterString + "&assignid=" + this.filter.assignedid;}
        if(this.filterOnTitle){filterString = filterString + "&keywrds=" + this.filter.searchString;}
        if(this.filterOnId){filterString = filterString + "&tickid=" + this.filter.ticketid;}
        if(this.filter.customer != null){filterString = filterString + "&custid=" + this.filter.customer['Id'] ;}
        if(!this.nonClosedOnly){filterString = filterString + "&incclosed=Y";}

        this._state.notify('ticketfilter.filtersent', filterString);
    }

}



class TicketFilter {
    customer: Object;
    searchString: string;
    priorid: string;
    statusid: string;
    userid: string;
    assignedid: string;
    ticketid: string;
    incClosed: boolean;
}