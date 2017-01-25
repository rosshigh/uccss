import {inject, bindable, bindingMode} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";
// import './ckeditor';

@inject(Element, ObserverLocator)
export class Editor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable name;
  @bindable setvalue;

  constructor(element, observerLocator) {
    this.element = element;
    this.subscriptions = [
			observerLocator
					.getObserver(this, 'setvalue')
					.subscribe(newValue => {
            if(this.editor) {
              this.editor.setData(newValue);
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
    this.textArea.value = this.value;
    this.editor.on('change', (e) => {
      this.value = e.editor.getData();
    });
  }
}