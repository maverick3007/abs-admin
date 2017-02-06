import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'document-header',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./document-header.scss')],
    template: require('./document-header.html')
})

export class DocumentHeaderComponent implements OnChanges {
    subscription: Subscription;
    @Input() document: Object;
    constructor(private _auth: AuthenticationService, private _router: Router) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
         //   value => {
         //       this.getCustomer(value['Id']);
           // });
    }

    ngOnChanges() {

    }

    gotoCust(id){
        this._router.navigate(['/views/customers/customerdetails', id ]);
    }

}