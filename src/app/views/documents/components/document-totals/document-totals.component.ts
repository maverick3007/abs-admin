import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'document-totals',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./document-totals.scss')],
    template: require('./document-totals.html')
})

export class DocumentTotalsComponent implements OnChanges {
    subscription: Subscription;
    @Input() document: Object;
    incVat = 0;
    excVat = 0;
    Vat = 0;
    constructor(private _auth: AuthenticationService) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
        //   value => {
        //       this.getCustomer(value['Id']);
        // });
    }

    ngOnChanges() {
        if (!!this.document) {
            this.incVat = 0;
            this.excVat = 0;
            this.Vat = 0;
            let docLines = this.document['Doclines'];
            for (var i = 0; i < docLines.length; i++) {
                this.excVat = this.excVat + (docLines[i].Qty * docLines[i].UnitPrice);
                if (!!docLines[i].Vat) {
                    this.Vat = this.Vat + (docLines[i].Qty * docLines[i].UnitPrice * docLines[i].Vat.Percentage * 0.01)
                }
            }
            this.incVat = this.excVat + this.Vat;
        }

    }



}