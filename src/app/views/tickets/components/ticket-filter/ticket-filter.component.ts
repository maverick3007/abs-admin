import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormControl }   from '@angular/forms';

import { GlobalState } from '../../../../global.state';
import { AuthenticationService } from '../../../../services';
import { ConstantsService } from '../../../../services';
import { InitService } from '../../../../services';


@Component({
    selector: 'ticket-filter',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-filter.scss')],
    template: require('./ticket-filter.html')
})

export class TicketFilterComponent implements AfterViewInit {
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

    constructor(private _auth: AuthenticationService, private _state:GlobalState, private _store: ConstantsService, private _init: InitService)  {
        this.statuses = [];
        this.priorities = [];      
        this.customerSearchString = '';
        this.clearCustomer();
        this._state.subscribe('customer.details', (value) => {
            this.filter.customer = value;
        });
    }


    ngAfterViewInit(){
        this.filter = this._store.TicketFilter;
        this.priorities = this._init.taskTicketpriorities;
        this.statuses = this._init.taskTicketStatuses;
        this.users = this._init.taskTicketusers;
    }

    clearCustomer(){
        this.filter.customer = null;
    }


    searchCustomer(){
        this._state.notify('popup.customerselect', this.customerSearchString);
    }

    toggleNonClosedOnly(){
        this.filter.nonClosedOnly = !this.filter.nonClosedOnly;
    }

    toggleFilterOnStatus(){
        this.filter.filterOnStatus = !this.filter.filterOnStatus;
    }

    toggleFilterOnPriority(){
        this.filter.filterOnPriority = !this.filter.filterOnPriority;
    }

    toggleFilterOnUser(){
        this.filter.filterOnUser = !this.filter.filterOnUser;
    }

    toggleFilterOnId(){
        this.filter.filterOnId = !this.filter.filterOnId;
    }

    toggleFilterOnTitle(){
        this.filter.filterOnTitle = !this.filter.filterOnTitle;
    }



    clearFilter(){
        this.filter.filterOnPriority = false;
        this.filter.filterOnStatus = false;
        this.filter.filterOnUser = false;
        this.filter.filterOnId = false;
        this.filter.filterOnTitle = false;
        this.filter.nonClosedOnly = true;
        this.clearCustomer();
        this.filterNow();
    }

    filterNow(){
        this._store.TicketFilter = this.filter;
        var filterString = '';
        if(this.filter.filterOnStatus){filterString = filterString + "&statusids=" + this.filter.statusid ;}
        if(this.filter.filterOnPriority){filterString = filterString + "&priorids=" + this.filter.priorid;}
        if(this.filter.filterOnUser){filterString = filterString + "&assignid=" + this.filter.assignedid;}
        if(this.filter.filterOnTitle){filterString = filterString + "&keywrds=" + this.filter.searchString;}
        if(this.filter.filterOnId){filterString = filterString + "&tickid=" + this.filter.ticketid;}
        if(this.filter.customer != null){filterString = filterString + "&custid=" + this.filter.customer['Id'] ;}
        if(!this.filter.nonClosedOnly){filterString = filterString + "&incclosed=Y";}

        this._state.notify('ticketfilter.filtersent', filterString);
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