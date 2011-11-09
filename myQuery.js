
// myQuery
// Light-weight DOM library for learning purposes
// Copyright Addy Osmani, 2011.
// Released under an MIT license

/*
	Methods
	myQuery.ready()
	myQuery.css()
	myQuery.attr()
	myQuery.bind()
*/
var myQuery = function( selector ){

  // As per jQuery, handle myQuery('')
  // myQuery(null) or myQuery(undefined)
  // by returning the instance if no 
  // valid selectors are provided
  if(!selector){
    return this;
  }


  // Handle selections (ID, Class, all others)
	if(selector.slice(0,1) === '#'){
		//ID selector: only grab the portion after # if using getElementById (faster than qSA)
	    this.selection = document.getElementById(selector.slice(1, selector.length))
	}else{
		if(selector.slice(0,1) === '.'){
			//Class selector
			this.selection = document.getElementsByClassName(selector.slice(1, selector.length));
		}else{
			//All others
			this.selection = document.querySelectorAll(selector);
		}
	}


// Set the length of myQuery to the selection length
  this.length = this.selection.length || 0;

	//document ready
	this.ready  = function(callback){
		//this.bind('load', callback);
			if ( document.addEventListener ) {
				//Supported by Opera/Webkit and some other modern browsers
				//document.addEventListener( "DOMContentLoaded", callback, false );
				window.addEventListener( "load", callback, false );

			// If IE event model is used
			} else if ( document.attachEvent ) {
				// safe also for iframes
				//document.attachEvent( "onreadystatechange", callback );
				window.attachEvent( "onload", callback );
			}
			
	}

  // Set attribute values 
  // e.g.: el.attr(prop, val);
  this.attr = function(prop, val){
	if(prop && prop!== undefined && this.length <1){
		if(val === undefined){
			//attribute getter
			return this.access('attr', this.selection, prop);
		}else{
			//attribute setter
			
			this.access('attr', this.selection, prop, val);
		}
	}
    
    return this;
  }


  // Set CSS property values
  // e.g.: el.css(prop, val);
  this.css = function( prop, val ){
		
	if(prop && prop!==undefined){
	//user intent: property getter
		if(val === undefined){
			return this.access('css', this.selection, prop);
		
		}else{
			//check if setter arguments valid
			//if(prop && prop!==undefined){
				if(this.length && this.length >0){
				
				  //handle multiple elements
			      for(i=0; i<this.length; i++){
			        this.access('css',this.selection[i].style, prop, val);
			      }				
		
				}else{
				
					//handle single elements without the need to iterate
					this.access('css', this.selection.style, prop, val);
				
				}
				return this;
		}
	}

  }

  // A generic property setter and getter
  this.access = function( mode, context, prop, val){
    if(context && prop && val!==undefined && prop!==undefined){
      context[prop] = val;
    }else{
	//console.log('getter', context, prop, this.selection, selector);
      //return context[prop];
///
	if(mode==='css'){
		var y = "";
		if (context.currentStyle){
			y = context.currentStyle[prop];
		}
		else{
			if (window.getComputedStyle){
				y = document.defaultView.getComputedStyle(context,null).getPropertyValue(prop);
			}
		}
		return y;
	}else if(mode==='attr'){
		//isnt playing as well with HTML5 data attributes
		//return context[prop];
		return context.getAttribute(prop);
	}


///
    }
  }



  // Bind an eventType to a handler
  // el.bind(eventName, handler)
  this.bind = function(eventName, handler, context) {
	
	//avoid duplication in .ready() by supporting document
	//usage here.(todo)

    var element = this.selection;
      if (element.addEventListener) {
        element.addEventListener(eventName, handler, false);
      }
      else if (element.attachEvent) {
        element.attachEvent('on' + eventName, handler);
      }
      else {
        element['on' + eventName] = handler;
      }


/*
  if (context.addEventListener) {
    context.addEventListener(eventName, handler, false);
  }
  else if (context.attachEvent) {
    context.attachEvent('on' + eventName, handler);
  }
  else {
    context['on' + eventName] = handler;
  }*/


      return this;
  };


  this.log = function(){
    console.log(this.selection);
  };


  if(this instanceof myQuery){
    return this.myQuery;
  }else{
    return new myQuery(selector);
  }

}


