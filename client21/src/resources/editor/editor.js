import {inject, bindable, bindingMode} from "aurelia-framework"
import {ObserverLocator} from "aurelia-binding"
import "summernote"

// import $ from 'jquery'

@inject(Element, ObserverLocator)
export class Editor {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
	@bindable height = 250;
	@bindable editorid =  "summernote-" + this.guid();
	@bindable toolbar = [
		['style', ['style']],
		['font', ['bold', 'italic', 'underline', 'clear']],
		['color', ['color']],
		['fontname', ['fontname']],
		['fontsize', ['fontsize']],
		['pata', ['ul', 'ol', 'paragraph']],
		['insert', ['picture', 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen']]
	];
	@bindable placeholder;

	editor = null;

	constructor(element, observerLocator) {
		this.element = element;
		this.subscriptions = [
			observerLocator
				.getObserver(this, 'value')
				.subscribe(newValue => {
					if (this.editor && newValue !== this.editor.summernote('code')) {
            this.editor.summernote('code', newValue);
					}
				})
		]
	}

	attached() {
		var that = this;
		this.editor = $(`#${this.editorid}`);
		this.editor.data('view-model', this);
		this.editor.summernote({
			placeholder: this.placeholder,
			height: this.height,
			toolbar: this.toolbar,
      callbacks: {
        onChange: function(contents) {
					that.value = contents;
					$("#" +  this.editorid).summernote('editor.saveRange');
				},
				onFocus: function(contents){
					console.log('');
				}
				// onPaste: function(e) {
				// 	var node = document.createElement('p');
				// 	// @param {Node} node
				// 	$('#summernote').summernote('insertNode', node);
				// 	console.log('Called event paste');
				// }
      }
		});
    this.editor.summernote('code', this.value);
	}

	detached() {
		this.editor.summernote('destroy'); 
	}

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}