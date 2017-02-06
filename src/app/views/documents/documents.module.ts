import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DocumentsComponent } from './documents.component';
import { DocumentDetailsComponent} from './document-details/document-details.component';

import { DocumentHeaderComponent } from './components/document-header/document-header.component'; 
import { DocumentLinesComponent } from './components/document-lines/document-lines.component';
import { DocumentTotalsComponent } from './components/document-totals/document-totals.component';  

import { routing }       from './documents.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    DocumentsComponent,
    DocumentDetailsComponent,
    DocumentHeaderComponent,
    DocumentLinesComponent,
    DocumentTotalsComponent
  ],
  providers: [

  ]
})
export default class DocumentsModule {}