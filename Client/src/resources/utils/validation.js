/**
 * Created by Ross on 11/30/2015.
 */
 import {transient} from 'aurelia-framework';

 @transient()
export default class {
    ruleGroups = [];
    rules = [];

  /**
   *
   * @param ruleGroup - A group of rules
   * @param field - Field the rule applies to
   * @param rule - Rule is an object - rule: name of the rule, val: Value defining limit, valFunction: custom validation function
     */
    addRule = function(ruleGroup, field, rule){
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

      } else { //Exist rule group
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

    validate = function(ruleGroup, context){
      var valid = true;
      var index = -1;
      for(var k = 0; k < this.rules.length; k++){
        if(this.rules[k].ruleGroup == ruleGroup){
          index = k;
          break;
        }
      }

      if(index === -1){
        return valid;
      } else {
        for(var i = 0; i < this.rules[index].fields.length; i++){
          var fields = this.rules[index].fields[i];
          var thisValid = true;
          for(var k = 0; k < fields.rules.length; k++){
            thisValid = true;
            if( fields.rules[k].valFunction !== undefined){
              if(!fields.rules[k].valFunction(context)){
                this._inValidate(fields.field, fields.rules[k]);
                valid = false;
                thisValid = false;
              }
            } else {
              var rule = fields.rules[k].rule;
              switch (rule) {
                case "required":
                  if (!eval('context.' + fields.rules[k].value) || eval('context.' + fields.rules[k].value).length === 0) {
                    this._inValidate(fields.field, fields.rules[k]);
                    valid = false;
                    thisValid = false;
                  }
                  break;
                case "min":
                  if (eval('context.' + fields.rules[k].value) < fields.rules[k].value) {
                    this._inValidate(fields.field, fields.rules[k]);
                    valid = false;
                    thisValid = false;
                  }
                  break;
                case "max":
                  if (eval('context.' + fields.rules[k].value) > fields.rules[k].value) {
                    this._inValidate(fields.field, fields.rules[k]);
                    valid = false;
                    thisValid = false;
                  }
                  break;
              }
              if(thisValid) this.makeValid($("#" + fields.field));
            }
          }

        }
        return valid;
      }

    };

    _inValidate = function(field, rule ){
      var msg = "<span class='help-block'>{message}</span>".replace("{message}", rule.message);

      //switch(rule.rule){
      //  case "required":
      //    var msg = "<span class='help-block'>{message}</span>".replace("{message}", "This field is required");
      //    break;
      //  case "min":
      //  var msg = "<span class='help-block'>{message}</span>".replace("{message}", "The minimum value is" + rule.value);
      //  break;
      //  case "max":
      //    var msg = "<span class='help-block'>{message}</span>".replace("{message}", "The maximum value is" + rule.value);
      //    break;
      //}
      var el = $("#" + field);
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
