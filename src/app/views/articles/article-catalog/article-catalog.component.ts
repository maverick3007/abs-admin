import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../services';


@Component({
    selector: 'article-catalog',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./article-catalog.scss')],
    template: require('./article-catalog.html')
})

export class ArticleCatalogComponent {

    constructor() {

    }


}