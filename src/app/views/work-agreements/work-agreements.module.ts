import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { CKEditorModule } from 'ng2-ckeditor';

import {WorkAgreementsComponent} from './work-agreements.component';
import { NewWaComponent } from './new-wa/new-wa.component';


import { routing }       from './work-agreements.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    CKEditorModule,
    routing
  ],
  declarations: [
    WorkAgreementsComponent, NewWaComponent
  ],
  providers: [

  ]
})
export default class TicketsModule {}