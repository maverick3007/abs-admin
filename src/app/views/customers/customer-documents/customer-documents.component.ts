import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'customer-documents',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-documents.scss')],
    template: require('./customer-documents.html')
})

export class CustomerDocumentsComponent {
    subscription: Subscription;
    @Input() customer: Object;
    loading = false;
    documents: Array<Object> = [];
    selectedDocument: Object;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.customerAnnounced$.subscribe(
            value => {
                this.getCustomerDocuments(value['Id']);
            });
    }

    getCustomerDocuments(id){
        this.loading = true;
        this._auth.apiGet('customer/' + id + '/documents').subscribe(result => this.extractDocuments(result));
    }

    extractDocuments(res){
        this.loading = false;
        this.documents = res.Results;
    }

    pickDocument(doc){
        this.selectedDocument = doc
    }

    selectCustomer(){
        //this.messageService.announceDocView(this.selectedDocument['Id']);
    }

}