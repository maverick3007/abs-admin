import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../theme/nga.module';
import {DialogError} from './dialog-error/dialog-error.component';
import {DialogMessage} from './dialog-message/dialog-message.component';
import{ DialogCustomerSelect } from './dialog-customer-select/dialog-customer-select.component';
import{ DialogDocumentSelect } from './dialog-document-select/dialog-document-select.component';
import{ DialogDocumentOptSelect } from './dialog-document-opt-select/dialog-document-opt-select.component';
import{ DialogArticlecatSelect } from './dialog-articlecat-select/dialog-articlecat-select.component';
import{ DialogDocumentView } from './dialog-document-view/dialog-document-view.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DIA_COMPONENTS = [
DialogError, DialogMessage, DialogCustomerSelect, DialogDocumentView, DialogDocumentSelect, DialogDocumentOptSelect, DialogArticlecatSelect]

@NgModule({
  declarations: [
    ...DIA_COMPONENTS
  ],
  imports: [
    NgaModule ,
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...DIA_COMPONENTS
  ]
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: DialogModule,
      providers: [
        
      ],
    };
  }
}