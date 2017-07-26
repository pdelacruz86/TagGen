  /* eslint-disable */
  module.exports = (function() {

    function processTag(oCeltraTag, ssFallbackImageURL, ssFallbackExit){
      debugger;
        // hack: disable js on Celtra tag by replacing the onerror attribute for onerrorx. This is to avoid this event to be fired when we dump it in the processor.
        var oCeltraNoJS = oCeltraTag.replace('onerror', 'onerrorx')

    // dump the Celtra tag without js into the processor (this is an html node. The idea is to manipulate the tag as DOM data, cause it's easier)
    var processor = document.createElement('div')
    processor.innerHTML = oCeltraNoJS;

    // find img element on celtra tag...
    var oCeltraTagImg = processor.querySelector('img');

    // ...and add src for the special sauce (fallback image)
    oCeltraTagImg.src = ssFallbackImageURL;

     //safe frame
      //get environmental data
   var  higher_accessible_framed_window = (function() {
      var w = window;
      while( w.parent != top_window ) w = w.parent;
      return w;
    })(); // the first runner up window

    var safeframe = ( higher_accessible_framed_window.frameElement ) ? false : true; // is this on a safeframe?

    //si no es mobile
    var nomobile = ((typeof window.orientation !== 'undefined')||(navigator.userAgent.indexOf('IEMobile') !== -1));

    if(!safeframe && !nomobile){
      //creamos el celtra tag
      
    }
    else{
      //create an image with a click event
    }

    // ... and add the onload event for the special sauce...
    oCeltraTagImg.setAttribute("onload", "((typeof window.orientation !== 'undefined')||(navigator.userAgent.indexOf('IEMobile') !== -1) || (function(){ var w = window; })() )?this.src='':this.style.display='block'; ")

    // ..and the onclick event for the special sauce.
    oCeltraTagImg.setAttribute( "onclick", "window.open('" + (ssFallbackExit) + "', '_blank')" );

    // get the processor innerHTML
    var processorContent = processor.innerHTML;

    // reverse the onerrorx hack
    processorContent =  processorContent.replace( 'onerrorx', 'onerror' );

    return processorContent;
  }
  return {
    ssCeltraTag: function(oCeltraTag, ssFallbackImageURL, ssFallbackExit){
      return processTag(oCeltraTag, ssFallbackImageURL, ssFallbackExit)
    }
  }

})()
