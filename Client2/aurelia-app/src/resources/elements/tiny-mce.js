import {inject, bindable} from "aurelia-framework";
import {ObserverLocator} from "aurelia-binding";

@inject(ObserverLocator)
export class TinyMce {

	/*
	  bindable properties of tiny-mce custom element.
	  camelCase properties are presented as snake-case attributes on the view.
	 */
	@bindable value = "";
	@bindable height = 250;
	@bindable convertUrls = false;	// i.e. convert-urls.bind="true"
	@bindable menuBar = false;
	@bindable toolBar = "undo redo | styleselect | bold forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent"; // | link plugin_sample insert_image
	@bindable contextMenu = "copy paste | link image inserttable | cell row column deletetable";
	@bindable statusBar = false;
	@bindable language = 'ja';
	@bindable insertImageParams = {};

	editor_id = null;
	editor = null;

	constructor(observerLocator) {
		if(!this.value) this.value = "";
		this.editor_id = "tiny-mce-" + this.guid();
		this.subscriptions = [
			observerLocator
					.getObserver(this, 'value')
					.subscribe(newValue => this.editor && this.editor.setContent(newValue))
		];
	}

	attached() {
		var that = this;
		setTimeout(function(){
			var once = false;
			tinymce.init({
				selector: `#${that.editor_id}`,
				
				plugins: [
					"advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code fullscreen",
					"textcolor table contextmenu paste"
				],
				menubar: that.menuBar,
				statusbar: that.statusBar,
				toolbar: that.toolBar,
				contextmenu: that.contextMenu,
				height: that.height,
				convert_urls: that.convertUrls,
				setup: editor => {
					editor.on('init', e => {
						that.editor = editor;
						if(!that.value) that.value = "";
						editor.setContent(that.value);
					});
					editor.on('change redo undo mouseleave', e => {
						if(once) that.value = editor.getContent({format: 'raw'}); 
						once = true;
					});
				}
			});
		},100);
		window.tmce = this;
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

	detached() {
		this.editor.destroy();
	}

}