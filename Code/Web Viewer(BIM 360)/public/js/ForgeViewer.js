/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var viewer;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });



}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // Add Extension
    var ViewerInstance = new CustomEvent("viewerinstance", {detail: {viewer: viewer}});      
      document.dispatchEvent(ViewerInstance);
  });

  // add command here!! 

  NOP_VIEWER.container.onclick = function(event) { 

    var screenPoint = {
      x: event.clientX,
      y: event.clientY
    }; 

    let viewer_pos = NOP_VIEWER.container.getBoundingClientRect();
    var hitTest = NOP_VIEWER.impl.hitTest(screenPoint.x - viewer_pos.x,
                                                            screenPoint.y - viewer_pos.y,true); 

    var hitTest = NOP_VIEWER.impl.hitTest(screenPoint.x,screenPoint.y,true); 

    if (hitTest) {
        console.log(hitTest.intersectPoint);
        alert(hitTest.intersectPoint.x + ' ' + ' ' + hitTest.intersectPoint.y + ' ' + hitTest.intersectPoint.z);
        drawPushpin({
          x: hitTest.intersectPoint.x,
          y: hitTest.intersectPoint.y,
          z: hitTest.intersectPoint.z
        });
    }
      
  }

}



function drawPushpin(pushpinModelPt){  

  //convert 3D position to 2D screen coordination
  var screenpoint = NOP_VIEWER.worldToClient(
                    new THREE.Vector3(pushpinModelPt.x,
                                      pushpinModelPt.y,
                                      pushpinModelPt.z,));

    //build the div container
    var randomId = makeid();
    var htmlMarker = '<div id="mymk' + randomId + '"></div>';
    var parent = NOP_VIEWER.container
    $(parent).append(htmlMarker);
    $('#mymk'+randomId ).css({
        'pointer-events': 'none',
        'width': '20px',
        'height': '20px',
        'position': 'absolute',
        'overflow': 'visible' 
        });
      
    //build the svg element and draw a circle
      $('#mymk'+randomId).append('<svg id="mysvg'+randomId+ '"></svg>')
      var snap = Snap($('#mysvg'+randomId)[0]);
      var rad = 12;
      var circle = snap.paper.circle(14, 14, rad);
      circle.attr({
          fill: "#FF8888",
          fillOpacity: 0.6,
          stroke: "#FF0000",
          strokeWidth: 3
      }); 

      //set the position of the SVG
      //adjust to make the circle center is the position of the click point
      var $container = $('#mymk'+randomId); 
      $container.css({
          'left': screenpoint.x - rad*2,
          'top': screenpoint.y - rad
      }); 
      
      //store 3D point data to the DOM
      var div = $('#mymk'+randomId);
      //add radius info with the 3D data
      pushpinModelPt.radius = rad;
      var storeData = JSON.stringify(pushpinModelPt);
      div.data('3DData', storeData);
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for( var i=0; i < 5; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  return text;
}


function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}

