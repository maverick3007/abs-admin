import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'customer-identity',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-identity.scss')],
    template: require('./customer-identity.html')
})

export class CustomerIdentityComponent implements OnChanges {
    subscription: Subscription;
    @Input() customer: Object;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
         //   value => {
         //       this.getCustomer(value['Id']);
           // });
    }

    ngOnChanges() {
        if (!!this.customer) {
        let Id = (this.customer['Id']);
        this.getCustomer(Id)}
    }

    getCustomer(id){
        this._auth.apiGet('customer/' + id).subscribe(result => this.customer = result);
    }


}