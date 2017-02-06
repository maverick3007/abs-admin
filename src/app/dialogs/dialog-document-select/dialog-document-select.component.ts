import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services';
import {GlobalState} from '../../global.state';

@Component({
    selector: 'dialog-document-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-select.scss')],
    template: require('./dialog-document-select.html'),
})

export class DialogDocumentSelect {
    @ViewChild('docselectModal') Modal: ModalDirective;
    hasMoreEntries = false;
    loading = false;
    pageNr;
    searchString;
    documents: Array<Object> = [];
    selectedDocument;
    constructor(private _auth: AuthenticationService, private _state:GlobalState) {
        this._state.subscribe('popup.documentselect', (value) =>{
                this.selectedDocument = null;
                this.documents = [];
                this.showDialog();
                this.searchString='document?' + value
                this.loading = true;
                this._auth.apiGet(this.searchString)
                    .subscribe(docs => this.extractDocuments(docs))
        }) ;   
        this._state.subscribe('popup.error', (error) =>{
            this.Modal.hide();
        });
    }

    extractDocuments(docs) {
        this.loading = false;
        this.pageNr = docs.Page;
        (docs.Page == docs.Pages)?this.hasMoreEntries = false:this.hasMoreEntries = true;
        for (var i = 0; i < docs.Results.length; i++){
            this.documents.push(docs.Results[i]);
        }
    }

    loadMore(){
        this.pageNr++;
        this._auth.apiGet(this.searchString + '&pger=' + this.pageNr)
                    .subscribe(docs => this.extractDocuments(docs))        
    }

    pickDocument(doc) {
        this.selectedDocument = doc
    }

    selectDocument() {
        this.Modal.hide();
        this._state.notifyDataChanged('document.details', this.selectedDocument);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

