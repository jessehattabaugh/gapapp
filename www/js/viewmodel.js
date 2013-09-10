function ViewModel(){
  
  var self = this;
  
  /* Observable Extenders ****************************************************/
  ko.extenders.corresponds = function(target, field){
    // updates a field on the app's calculator model when the viewModel property is updated
    target.subscribe(function(newValue){
      self.app.calculator[field] = newValue;
    });
    return target;
  };
  
  /* Custom Bindings *********************************************************/
  ko.bindingHandlers.tapably = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
      if('ontouchstart' in window){ // device has touch events
        element.addEventListener('touchstart', function (startEvent){
          
          var startX = startEvent.pageX,
              startY = startEvent.pageY,
              touchHasNotMoved = true;
          
          function whenMove(moveEvent){
            var moveX = moveEvent.pageX,
                moveY = moveEvent.pageY,
                threshold = 10;
            
            if (Math.abs(moveX - startX) > threshold ||
                Math.abs(moveY - startY) > threshold) {
              touchHasNotMoved = false;
            }
          }
          
          function whenEnd(endEvent){
            if(touchHasNotMoved){
              valueAccessor().call(this);
            }
            element.removeEventListener('touchmove', whenMove);
            element.removeEventListener('touchend', whenEnd);
          }
          
          element.addEventListener('touchmove', whenMove);  
          element.addEventListener('touchend', whenEnd);
        });
      } else { // device doesn't have touch events
        element.addEventListener('click', valueAccessor());
      }
    }
  };
  
  this.loading = ko.observable(true);
  this.calculating = ko.observable(false);
  this.optionsExpanded = ko.observable();
  this.valuesExpanded = ko.observable();
  this.calculating = ko.observable(false);
  this.score = ko.observable(0);
  this.meanDays = ko.observable(0);
  
  this.symptoms = [
    { name: 'anorexia',     label: 'Anorexia',      value: ko.observable().extend({ corresponds: 'anorexia' }) },
    { name: 'confusion',    label: 'Confusion',     value: ko.observable().extend({ corresponds: 'confusion' }) },
    { name: 'fatigue',      label: 'Fatigue',       value: ko.observable().extend({ corresponds: 'fatigue' }) },
    { name: 'headache',     label: 'Headache',      value: ko.observable().extend({ corresponds: 'headache' }) },
    { name: 'malaise',      label: 'Malaise',       value: ko.observable().extend({ corresponds: 'malaise' }) },
    { name: 'muscleCramps', label: 'Muscle cramps', value: ko.observable().extend({ corresponds: 'muscleCramps' }) },
    { name: 'nausea',       label: 'Nausea',        value: ko.observable().extend({ corresponds: 'nausea' }) },
    { name: 'unsteadiness', label: 'Unsteadiness',  value: ko.observable().extend({ corresponds: 'unsteadiness' }) },
    { name: 'vomiting',     label: 'Vomiting',      value: ko.observable().extend({ corresponds: 'vomiting' }) }
  ];
  
  this.considerations = [
    { name: 'adrenalInsufficiency',   label: 'Adrenal insufficiency',    value: ko.observable().extend({ corresponds: 'adrenalInsufficiency' }) },
    { name: 'cirrhosis',              label: 'Cirrhosis',                value: ko.observable().extend({ corresponds: 'cirrhosis' }) },
    { name: 'cnsImpairment',          label: 'CNS impairment',           value: ko.observable().extend({ corresponds: 'cnsImpairment' }) },
    { name: 'congestiveHeartFailure', label: 'Congestive heart failure', value: ko.observable().extend({ corresponds: 'congestiveHeartFailure' }) },
    { name: 'hypothyroidism',         label: 'Hypothyroidism',           value: ko.observable().extend({ corresponds: 'hypothyroidism' }) },
    { name: 'renalDysfunction',       label: 'Renal dysfunction',        value: ko.observable().extend({ corresponds: 'renalDysfunction' }) },
    { name: 'siadh',                  label: 'SIADH',                    value: ko.observable().extend({ corresponds: 'siadh' }) },
    { name: 'surgeryOrInjury',        label: 'Surgery or injury',        value: ko.observable().extend({ corresponds: 'surgeryOrInjury' }) },
    { name: 'veryYoungOrOldAge',      label: 'Very young/old age',       value: ko.observable().extend({ corresponds: 'veryYoungOrOldAge' }) }
  ];
  
  this.labTests = [
    { name: 'serumNa',  label: 'Serum [Na+]', value: ko.observable().extend({ corresponds: 'serumNa' }),  unit: 'mEq/l',  min: 20, max: 60, step: 10 },
    { name: 'serumK',   label: 'Serum [K+]',  value: ko.observable().extend({ corresponds: 'serumK' }),  unit: 'g',  min: 10, max: 200, step: 20 },
    { name: 'uricAcid', label: 'Uric acid',   value: ko.observable().extend({ corresponds: 'uricAcid' }),  unit: 'lbs',  min: 60, max: 92, step: 12 },
    { name: 'bun',      label: 'BUN',         value: ko.observable().extend({ corresponds: 'bun' }),  unit: 'sqft',  min: 430, max: 600, step: 60 },
    { name: 'serumCr',  label: 'Serum Cr',    value: ko.observable().extend({ corresponds: 'serumCr' }),  unit: 'nm',  min: 1, max: 10, step: 0.5 },
    { name: 'plasmaOsmolality', label: 'Plasma osmolality', value: ko.observable().extend({ corresponds: 'plasmaOsmolality' }),  unit: 'qts',  min: 20, max: 90, step: 4 },
    { name: 'urineOsmolality',  label: 'Urine osmolality',  value: ko.observable().extend({ corresponds: 'urineOsmolality' }),  unit: 'in',  min: 150, max: 250, step: 30},
    { name: 'urineSpecificGravity', label: 'Urine specific gravity',  value: ko.observable().extend({ corresponds: 'urineSpecificGravity' }),  unit: 'gal',  min: 700, max: 1980, step: 130 },
    { name: 'urineSodium',  label: 'Urine sodium',  value: ko.observable().extend({ corresponds: 'urineSodium' }),  unit: 'ml',  min: 120, max: 129, step: 1 },
    { name: 'urinePotassium', label: 'Urine potassium', value: ko.observable().extend({ corresponds: 'urinePotassium' }),  unit: 'ft',  min: 120, max: 129, step: 1 }
  ];
  
  /* Utility methods *********************************************************/
  this.toggle = function(prop, val){
    // prop - a ko.observable to toggle between true/false or val/false
    // val - the value to toggle from or to
    
    if(!val) val = true; // default to true
    if(prop() == val) prop(false);
    else prop(val);
  };
  
  this.valueArray = function(option){
    // used on labTests to get an array of values we can create a menu with
    var out = [];
    for(var v = option.min; v <= option.max; v += option.step){
      out.push(v);
    }
    return out;
  };
  
  ko.applyBindings(this);
}

// just preventing JSLint warnings
if(typeof ko == 'undefined') var ko = {};