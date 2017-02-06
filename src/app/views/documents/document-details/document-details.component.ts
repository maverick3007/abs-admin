import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services';
import { AuthenticationService } from '../../../services';
import {GlobalState} from '../../../global.state';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'document-details',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./document-details.scss')],
  template: require('./document-details.html')
})

export class DocumentDetailsComponent {
    document;
    constructor(private route: ActivatedRoute, private messageService: MessageService, private auth: AuthenticationService, private _state:GlobalState){
                this.route.params
        .map(params => params['id'])
        .switchMap(id => this.auth.apiGet('document/' + id ))
        .subscribe(document => {
            this.document = document;
            let link = new ComLink;
            link.title = "Document - " + document.Id;
            this._state.notifyDataChanged('menu.activeLink', link);
        });
    }

}
class ComLink {
  title: string;
}