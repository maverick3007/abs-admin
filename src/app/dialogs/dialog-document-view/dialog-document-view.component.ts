import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dialog-document-view',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-view.scss')],
    template: require('./dialog-document-view.html'),
})

export class DialogDocumentView {
    @ViewChild('docviewModal') Modal: ModalDirective;
    subscription: Subscription;
    document;

    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        /*this.subscription = this.messageService.docViewAnnounced$.subscribe(
            docid => {
                this.showDialog();
                this.getDoc(docid);
            }
        );*/
    }
    public showDialog(): void {
        this.Modal.show();
    }
    getDoc(id) {
        this._auth.apiGet('document/' + id).subscribe(doc => {
            this.document = doc;
        })
    }
}