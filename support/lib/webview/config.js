var dojoConfig=function(){var a=window&&"file:"===window.location.protocol&&(0<navigator.userAgent.indexOf("MSIE")||0<navigator.userAgent.indexOf("Trident"))?{"native-xhr":0,activex:1}:{};a.production=1;return{async:!0,defaultDuration:1,tlmSiblingOfDojo:!1,isDebug:!1,has:a,baseUrl:"support/lib/",packages:[{name:"dojo",location:"dojo"},{name:"dijit",location:"dijit"},{name:"dgrid",location:"dgrid"},{name:"put-selector",location:"put-selector"},{name:"xstyle",location:"xstyle"},{name:"webview",location:"webview"},
{name:"MW",location:"MW"}]}}();


console.log('ola mundo')

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      alert("You've tried to open context menu"); //here you draw your own menu
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      alert("You've tried to open context menu");
      window.event.returnValue = false;
    });
  }