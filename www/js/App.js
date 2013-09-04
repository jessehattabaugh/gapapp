function App(){
  
  this.inPhoneGap = !document.URL.match(/^(https?|file):/);
  
  if(this.inPhoneGap){ // Load phonegap.js only if we're in phonegap
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "phonegap.js";
    document.body.appendChild(script);
    
    document.addEventListener('deviceready', this.afterLoad);
    
  } else { // in a browser, do it the old fasioned way
    window.addEventListener('load', this.afterLoad);
  }

  this.afterLoad = function(){
    app.viewModel.loading(false);
  };
  
  
  /* Observable Extenders **********************************************/
  
  ko.extenders.calculable = function(target, field){
    // updates a field on the app's calculator model when the viewModel property is updated
    target.subscribe(function(newValue){
      app.calculator[field] = newValue;
    });
    return target;
  };
  
  
  /* Custom Bindings ***************************************************/
  
  ko.bindingHandlers.tap = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
      element.addEventListener('ontouchstart' in window? 'touchstart': 'mousedown', valueAccessor());
    }
  };
  
  
  /* ViewModel stuff ***************************************************/
  
  this.viewModel = new ViewModel();
  
  ko.applyBindings(this.viewModel);
  
  
  /* Calculator Stuff **************************************************/
  
  this.calculator = new Calculator();
  
  this.calculate = function (){
    this.viewModel.score(this.calculator.getScore());
    this.viewModel.meanDays(this.calculator.getMeanDays());
  };
}