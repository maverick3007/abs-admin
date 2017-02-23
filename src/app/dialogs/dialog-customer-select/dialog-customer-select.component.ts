import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services';
import {GlobalState} from '../../global.state';

@Component({
    selector: 'dialog-customer-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-customer-select.scss')],
    template: require('./dialog-customer-select.html'),
})

export class DialogCustomerSelect {
    @ViewChild('custselectModal') Modal: ModalDirective;
    title: String = 'titel';
    filters: Array<filter> = [{ id: 'name', name: 'naam' }, { id: 'street', name: 'adres' }]
    selectedFilter = 'name';
    customers = [];
    selectedCustomer;
    searchString = new FormControl('');
    constructor(private _auth: AuthenticationService, private _state:GlobalState) {
        this._state.subscribe('popup.customerselect', (value) =>{
                this.searchString.reset();
                this.selectedFilter = 'name';
                this.selectedCustomer = null;
                this.customers = [];
                this.showDialog();
                if(value != '')
                {
                    this.searchString.setValue(value);
                }
        });   

        this._state.subscribe('popup.error', (error) =>{
            this.Modal.hide();
        });
        this.searchString.valueChanges
            .debounceTime(700)
            .subscribe(searchString => this._auth.apiGet('customer?' + this.selectedFilter + '=' + searchString)
                .subscribe(customers => this.extractCustomers(customers)));

    }

    extractCustomers(custs) {
        this.customers = custs;

    }

    pickCustomer(cust) {
        this.selectedCustomer = cust
    }

    selectCustomer() {
        this.Modal.hide();
        this._state.notifyDataChanged('customer.details', this.selectedCustomer);
    }

    public showDialog(): void {
        this.Modal.show();
    }

    public closeWithoutSelection(){
        this.Modal.hide();
        this._state.notify('customer.noneselected', 'none');
    }
}

class filter {
    id: string;
    name: string;
}