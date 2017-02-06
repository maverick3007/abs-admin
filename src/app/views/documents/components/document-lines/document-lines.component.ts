import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'document-lines',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./document-lines.scss')],
    template: require('./document-lines.html')
})

export class DocumentLinesComponent implements OnChanges {
    subscription: Subscription;
    @Input() document: Object;
    docLines:Array<Object> = [];
    constructor(private _auth: AuthenticationService) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
         //   value => {
         //       this.getCustomer(value['Id']);
           // });
    }

    ngOnChanges() {
        if (!!this.document){
            this.docLines = this.document['Doclines'];
        }

    }



}