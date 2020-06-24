import {transient} from 'aurelia-framework';

@transient()
export default class  {

    ruleGroupIndices = [];
    ruleGroupsArray = [];

    addGroup = function(indexOfGroup, context){
        this.context = context;
        this.ruleGroupIndices.push(indexOfGroup);
        this.ruleGroupsArray.push(new RuleGroup(indexOfGroup));
        return this.ruleGroupsArray[this.ruleGroupsArray.length - 1];
    }

}

class RuleGroup {
    constructor(ruleGroup){
        this.ruleGroup = ruleGroup;
        this.context = undefined;
        this.properties = [];
    }

    ensure = function(property){
        let propertyIndex = this.propertyExists(property);
        if( propertyIndex > -1){
            return this.properties[propertyIndex];
        } else {
            this.properties.push(new Property(property));
            return this.properties[this.properties.length - 1];
        }
    }
    
    on = function(obj){
        this.object = obj;
        return this;
    }

    propertyExists = function(property){
        this.properties.forEach((item, index) => {
            if(item.property === property) return index;
        });
        return -1;
    }
}

class Property {
    constructor(property, options){
        this.property = property;
        this.rules = [];
    }

   require(){
       this.rules.push(new Rule('require'));
       return this;
   }
}

class Rule {
    constructor(rule, options){
        this.rule = rule;
        if(options){
            this.context = options.context;
        }
    }

    validate(){
        return eval('this.' + this.rule);
    }

    required = function(){
        return !eval('this.context.' + rules.value) || eval('this.context.' + rules.value).length === 0
    }

}