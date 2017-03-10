import {inject, computedFrom, bindable, bindingMode, containerless} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@containerless

@inject(Element, EventAggregator)
export class treeNode {
	@bindable data;
	@bindable level;
	@bindable ({attribute: 'selected-node', defaultBindingMode: bindingMode.twoWay}) selectedNode;
	@bindable ({attribute: 'visible', defaultBindingMode: bindingMode.twoWay}) visible = true;
	@bindable maxLevel = 2;
	@bindable callback;
	  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedFile;
	childrenVisible = false;

	constructor(element, EventAggregator) {
        this.element = element;
		this.ea = EventAggregator;
    }

	@computedFrom('data')
	get itemCount() {
		return this.countNodes(this.data);
	}

	bind(){
		console.log(this.data)
	}

	attached() {
		this.childrenVisible = this.level < this.maxLevel;
	}

	countNodes(node_item) {
		let count = 0;
		if(node_item){
			if(node_item.children !== undefined)
				node_item.children.forEach( (node_child) => count += this.countNodes(node_child) + 1);
		}
		return count;
	}

	visibleChanged(newValue) {
		if(newValue = false) {
			this.childrenVisible = false;
		}
	}

	toggleExpand() {
		this.childrenVisible = !this.childrenVisible;
	}

	clickMe(data){
		this.selectedNode = data;
	}

	deleteFile(data){
		if(data.file) this.selectedFile = data;
		this.callback(data);
		
	}

	deleteFile2(data){
		if(data.file) {
			this.ea.publish('delete-file', {file: data});
		}
		// this.callback(data);
	}

	fireEvent(element, type, data) {
		let changeEvent;

		if (window.CustomEvent) {
			changeEvent = new CustomEvent('click', {
				detail: {
					value: data
				},
				bubbles: true
			});
		} else {
			changeEvent = document.createEvent('CustomEvent');
			changeEvent.initCustomEvent('click', true, true, {
				detail: {
					value: data
				}
			});
		}
		this.element.dispatchEvent(changeEvent);
	}
}