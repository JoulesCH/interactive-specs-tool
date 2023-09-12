/*
 Copyright 2013-2017 The MathWorks, Inc.
*/
require(["dojo/parser","webview/interface","dojo/ready","webview/widgets/App"],function(a,b,c){c(function(){a.parse();top.slwebview=b})});


const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");

scope.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = event;

  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX}px`;

  contextMenu.classList.add("visible");
});

scope.addEventListener("click", (e) => {
    if (e.target.offsetParent != contextMenu) {
      contextMenu.classList.remove("visible");
    };
});

