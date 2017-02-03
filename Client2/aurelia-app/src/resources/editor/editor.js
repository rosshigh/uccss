import {inject, bindable, bindingMode} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";

@inject(Element, ObserverLocator)
export class Editor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable name;
  @bindable setvalue;
  @bindable editorid

    constructor(element, observerLocator) {
      this.element = element;
      this.subscriptions = [
        observerLocator
            .getObserver(this, 'setvalue')
            .subscribe(newValue => {
              if(this.editor) {
                if(newValue === 'CLEAR_EDITOR'){
                  this.editor.setData("");
                } else {
                  this.editor.setData(newValue);
                }
              }
            })
      ];
    }

    updateValue() {
      this.value = this.textArea.value;
    }

    bind() {
      this.textArea = this.element.getElementsByTagName('textarea')[0];
      this.editor = CKEDITOR.replace(this.textArea);
      this.editor.name=this.editorid;
      this.textArea.value = this.value;
      this.editor.on('change', (e) => {
        this.value = e.editor.getData();
      });
      // this.editor.on( 'instanceCreated', function ( event, data ) {
      //   var editor = event.editor,
      //   element = editor.element;
      //   editor.name = $(element).attr('name');
      // });
    }

    detached(){
           
      // try {
      //   CKEDITOR.instances[this.editorid].destroy(true);
      // } catch (e) { }
      // CKEDITOR.replace(this.editorid);
    }
  }