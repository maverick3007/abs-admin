import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl }   from '@angular/forms';

import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';



@Component({
    selector: 'ticket-list',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./ticket-list.scss')],
    template: require('./ticket-list.html')
})

export class TicketListComponent {




    constructor(private _auth: AuthenticationService, private _state:GlobalState) {

    }
    


}


