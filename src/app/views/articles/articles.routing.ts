import { Routes, RouterModule }  from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { ArticleCatalogComponent} from './article-catalog/article-catalog.component'

//import { ArticleDetailsComponent} from './article-details/article-details.component'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      { path: 'articlecatalog', component: ArticleCatalogComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);