import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';


@Component({
    selector: 'new-ticket',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./new-ticket.scss')],
    template: require('./new-ticket.html')
})

export class NewTicketComponent {

    constructor() {

    }


}