import { Component, ViewEncapsulation } from '@angular/core';

import './rich-editor.loader.ts';

@Component({
  selector: 'rich-editor',
  encapsulation: ViewEncapsulation.None,
  template: require('./rich-editor.html'),
  styles: [require('./rich-editor.scss')]
})

export class RichEditorComponent {
  public ckeditorContent:string = '<p>Test</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '300'
  };

  constructor() {
  }
}
