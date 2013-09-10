function App(viewModel, calculator){
  
  viewModel.app = this;
  calculator.app = this;
  this.viewModel = viewModel;
  this.calculator = calculator;
  
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
    this.viewModel.loading(false);
  };
  
  this.calculate = function (){
    this.viewModel.score(this.calculator.getScore());
    this.viewModel.meanDays(this.calculator.getMeanDays());
  };
}