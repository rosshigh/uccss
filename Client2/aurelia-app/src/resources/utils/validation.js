/**
 * Created by Ross on 11/30/2015.
 */
 import {transient} from 'aurelia-framework';

 @transient()
export default class {
    ruleGroups = [];
    rules = [];

    initialize(context){
      this.context = context;
    }

  /**
   *
   * @param ruleGroup - A group of rules
   * @param field - Field the rule applies to
   * @param rule - Rule is an object - rule: name of the rule, val: Value defining limit, valFunction: custom validation function
     */
    addRule = function(ruleGroup, field, rule, blur){

      if(blur){
        var that = this;
        $("#" + field).blur(function() {
           that.validateRule(rule, field);
        });
      }

      var index = -1;
      //See if rule group exists already
      for(var k = 0; k < this.rules.length; k++){
        if(this.rules[k].ruleGroup === ruleGroup){
          index = k;
          break;
        }
      }

      var fieldArray = [];
      var ruleArray = []; //The rules that apply to a field
      if( index === -1){ //This is a new rule group
        this.rules.push({ruleGroup: ruleGroup, fields: fieldArray});
        this.rules[this.rules.length-1].fields[0] = {field:field, rules:ruleArray};
        this.rules[this.rules.length-1].fields[0].rules[0] =  rule;

      } else { //Existing rule group
        var found = false;
        for(var i = 0; i<this.rules[index].fields.length; i++){
          if(this.rules[index].fields[i].field === field){
            this.rules[index].fields[i].rules.push(rule);
            found = true;
            break;
          }

        }
        if(!found){
          this.rules[index].fields.push({field:field, rules:ruleArray});
          this.rules[index].fields[this.rules[index].fields.length-1].rules[0] =  rule;
        }
      }
    };

    validate = function(ruleGroup){
      var index = -1;
      for(var k = 0; k < this.rules.length; k++){
        if(this.rules[k].ruleGroup == ruleGroup){
          index = k;
          break;
        }
      }

      if(index === -1){
        return true;
      } else {
        var valid = true;
        for(var i = 0; i < this.rules[index].fields.length; i++){
          var fields = this.rules[index].fields[i];
          var thisValid = true;
          for(var k = 0; k < fields.rules.length; k++){
            thisValid = true;
            var rules = fields.rules[k];
            thisValid =  this.validateRule(rules, fields.field);
            if(!thisValid) valid = false;
          }
        }
      }
      return valid;

    };

    validateRule(rules, field){
        var thisValid = true;
        switch (rules.rule) {
          case "custom":
            thisValid = rules.valFunction(this.context);
            break;
          case "required":
            if (!eval('this.context.' + rules.value) || eval('this.context.' + rules.value).length === 0) {
              thisValid = false;
            }
            break;
          case "min":
            if (eval('this.context.' + rules.value) < rules.value) {
              thisValid = false;
            }
            break;
          case "max":
            if (eval('this.context.' + rules.value) > rules.value) {
              thisValid = false;
            }
            break;
        }
        if(thisValid) {
          if(thisValid) this.makeValid($("#" + field));
        } else {
          this._inValidate(field, rules);
        }
        return thisValid;
    }

    _inValidate = function(field, rule ){
      var el = $("#" + field);
      if(el.next().is("span.help-block")){
        el.next().html(rule.message);
      } else {
        var msg = "<span class='help-block'>{message}</span>".replace("{message}", rule.message);
      }
      
      if(el.is(':visible')){
        el.parent().addClass("has-error");
        if(!el.next().is("span.help-block")){
          el.after(msg);
        }
      }
    };

    makeValid = function(field){
      field.parent().removeClass("has-error");
      if(field.next().is("span.help-block")){
        field.next().html("");
      }
    }

}
