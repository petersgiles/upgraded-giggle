import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core'

import * as Editor from 'tui-editor'
import 'raphael'
import 'tui-chart'
import 'tui-editor/dist/tui-editor-extChart'
import 'tui-editor/dist/tui-editor-extScrollSync'
import 'tui-editor/dist/tui-editor-extTable'
import 'tui-editor/dist/tui-editor-extUML'

export const EDITOR_TYPE = {
  MARKDOWN: 'markdown',
  WYSIWYG: 'wysiwyg'
}

@Component({
  selector: 'digital-first-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    './editor.component.scss'
  ],
})
export class EditorComponent implements OnInit {

  @ViewChild('tuieditor', { read: ElementRef })
  private child: ElementRef

  @Input()
  content

  @Input()
  editorType = EDITOR_TYPE.MARKDOWN

  @Output()
  onSaveHTMLData: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  onSaveMarkdownData: EventEmitter<string> = new EventEmitter<string>()

  private tuieditor = null

  private addInlineCode = null

  constructor() { }

  ngOnInit() {

    this.tuieditor = new Editor({
      el: this.child.nativeElement,
      initialValue: this.content,
      initialEditType: this.editorType,
      previewStyle: 'vertical',
      height: '800px',
      exts: [{
        name: 'chart',
        minWidth: 100,
        maxWidth: 600,
        minHeight: 100,
        maxHeight: 300
      }, 'table', 'uml', 'scrollSync' ],
      events: {
        // load: this.onLoad.bind(this),
        // change: this.onChange.bind(this),
        blur: () => {
          // implementation of actual saving
        },
        // paste: this.onPaste.bind(this),
        // drop: this.onPreventDrop.bind(this),
      }
    })
  }

}
