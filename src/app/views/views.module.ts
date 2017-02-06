import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './views.routing';
import { NgaModule } from '../theme/nga.module';
import { DialogModule} from '../dialogs/dialog.module'

import { Views } from './views.component';




@NgModule({
  imports: [CommonModule, NgaModule, DialogModule, routing],
  declarations: [Views],
  providers: []
})
export class ViewsModule {
}
