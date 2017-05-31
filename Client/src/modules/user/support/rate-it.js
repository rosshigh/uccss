import {customElement, inject, bindable, bindingMode} from 'aurelia-framework';
import $ from 'jquery';

@inject(Element)
export class RateIt{
	@bindable rating;
	@bindable raters
	@bindable thiselement
	ratedIt = false;

	constructor(element) {
        this.element = element;
	
	}

	attached(){
		this.id = this.element.getAttribute("id");

		this.rates = [
				{ value: "5", title: 'Awesome - 5 stars', class: 'full', checked: false, id: "5" + this.id, name: this.id},
				{ value: "4.5", title: 'Pretty good - 4.5 stars', class: 'half', checked: false, id: "4.5" + this.id, name: this.id },
				{ value: "4", title: 'Pretty good - 4 stars', class: 'full', checked: false, id: "4" + this.id, name: this.id },
				{ value: "3.5", title: 'Meh - 3.5 stars', class: 'half', checked: false, id: "3.5" + this.id, name: this.id },
				{ value: "3", title: 'Meh - 3 stars', class: 'full', checked: false, id: "3" + this.id, name: this.id },
				{ value: "2.5", title: 'Kinda bad - 2.5 stars', class: 'half', checked: false, id: "2.5" + this.id, name: this.id },
				{ value: "2", title: 'Kinda bad - 2 stars', class: 'full', checked: false, id: "2" + this.id, name: this.id },
				{ value: "1.5", title: 'Meh - 1.5 stars', class: 'half', checked: false, id: "1.5" + this.id, name: this.id },
				{ value: "1", title: 'Sucks big time - 1 star', class: 'full', checked: false, id: "1" + this.id, name: this.id },
				{ value: ".5", title: 'Sucks big time - 0.5 stars', class: 'half', checked: false, id: ".5" + this.id, name: this.id }
			];
	}

	rateIt(value, index){
		if(!this.ratedIt){
			this.ratedIt = true;
			let foo = this.rating * (this.raters > 0 ? this.raters : 1);
			this.raters += 1;
			this.rating = (foo + Number(value)) / (this.raters);
			document.getElementById(this.rates[index].id).checked="true";
			let changeEvent;

                if (window.CustomEvent) {
                    changeEvent = new CustomEvent('change', {
                        detail: {
                            rating: this.rating,
							raters: this.raters,
							id: this.id
                        },
                        bubbles: true
                    });
                } else {
                    changeEvent = document.createEvent('CustomEvent');
                    changeEvent.initCustomEvent('change', true, true, {
                        detail: {
                            rating: this.rating,
							raters: this.raters,
							id: this.id
                        }
                    });
                }
                this.element.dispatchEvent(changeEvent);
		}
	}

}