import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ArticlesComponent } from './articles.component';
import { ArticleCatalogComponent} from './article-catalog/article-catalog.component'
import { ArticleSearchComponent} from './components/article-search/article-search.component'
import { ArticleListComponent} from './components/article-list/article-list.component'

import { routing }       from './articles.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    ArticlesComponent, ArticleCatalogComponent, ArticleSearchComponent, ArticleListComponent
  ],
  providers: [

  ]
})
export default class ArticlesModule {}