function Calculator(){
  // an example of a Calculator Model object that exposes an interface for calculating a score based on inputs
  
  this.anorexia     = '';
  this.confusion    = '';
  this.fatigue      = '';
  this.headache     = '';
  this.malaise      = '';
  this.muscleCramps = '';
  this.nausea       = '';
  this.unsteadiness = '';
  this.vomiting     = '';
  
  this.adrenalInsufficiency   = '';
  this.cirrhosis              = '';
  this.cnsImpairment          = '';
  this.congestiveHeartFailure = '';
  this.hypothyroidism         = '';
  this.renalDysfunction       = '';
  this.siadh                  = '';
  this.surgeryOrInjury        = '';
  this.veryYoungOrOldAge      = '';
  
  this.serumNa              = '';
  this.serumK               = '';
  this.uricAcid             = '';
  this.bun                  = '';
  this.serumCr              = '';
  this.plasmaOsmolality     = '';
  this.urineOsmolality      = '';
  this.urineSpecificGravity = '';
  this.urineSodium          = '';
  this.urinePotassium       = '';
  
  this.getScore = function(){
    // do some fancy math
    return Math.floor(Math.random()*100);
  };
  
  this.getMeanDays = function(){
    // do some fancy math
    return Math.floor((Math.random()*10)*10)/10;
  };
}