var viewer;

// @urn the model to show
// @viewablesId which viewables to show, applies to BIM 360 Plans folder
function launchViewer(urn, viewableId) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken,
    api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

  });

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer.loadDocumentNode(doc, viewables).then(i => {
      // documented loaded, any action?
      var ViewerInstance = new CustomEvent("viewerinstance", {detail: {viewer: viewer}});      
        document.dispatchEvent(ViewerInstance);
        // var LoadExtensionEvent = new CustomEvent("loadextension", {
        //   detail: {
        //     extension: "Extension1",
        //     viewer: viewer
        //   }
        // });      
        // document.dispatchEvent(LoadExtensionEvent);
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }

}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}

// function triggerPanelUpdate() {
//   jQuery.ajax({
//     url: 'https://cs1100320005fe6c183.blob.core.windows.net/rpisensor/rpisensor/01/2020/06/16/14/37',
//     datalype: 'json',
//     success: function (temps) {
//       var record = temps[0];
  
//       _lastRecord = record.Temp;
  
//       _panel.removeAllProperties();
//       _panel.addProperty('temperature', 'humidity');
        
//       addCharData(record);
        
//       console.log(record);
  
//       if (_panel.isVisible()) setTimeout(triggerPanelUpdate, 10 *1000);
//     }
//   });
// }

// function onMouseClick(event) {
  
//   var screenPoint = {
//     x: event.clientX,
//     y: event.clientY
//   };

//   var n = normalizeCoords(screenPoint) ;
  
//   var hitTest1 = viewer.impl.hitTest(screenPoint.x, screenPoint.y, true);
  
//   //get hit point
//   var hitTest = viewer.utilities.getHitPoint(
//     screenPoint.x,
//     screenPoint.y);
  
//   if (hitTest1) {
//     console.log(hitTest1.intersectPoint) ;
//     drawPushpin({
//       x: hitTestl.intersectPoint.x,
//       y: hitTestl.intersectPoint.y,
//       z: hitTestl.intersectPoint.z
//     });
//   }
// }  