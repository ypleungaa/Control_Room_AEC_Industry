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
  
  // *******************************************
  // Custom Property Panel
  // *******************************************

  // function CustomPropertyPanel(viewer, options) {
  //   this.viewer = viewer;
  //   this.options = options;
  //   this.nodeId = -1; // dbId of the current element showing properties
  //   Autodesk.Viewing.Extensions.ViewerPropertyPanel.call(this, this.viewer);
  // }

  // CustomPropertyPanel.prototype = Object.create(Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype);
  // CustomPropertyPanel.prototype.constructor = CustomPropertyPanel;

  // CustomPropertyPanel.prototype.setProperties = function (properties, options) {
  //   Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype.setProperties.call(this, properties, options);

  //   // add your custom properties here
  //   // for example, let's show the dbId and externalId
  //   var _this = this;
  //   // dbId is right here as nodeId
  //   this.addProperty('dbId', this.propertyNodeId, 'Custom Properties');
  //   // externalId is under all properties, let's get it!
  //   this.viewer.getProperties(this.propertyNodeId, function (props) {
  //       _this.addProperty('externalId', props.externalId, 'Custom Properties');
  //   })
  // }

  // CustomPropertyPanel.prototype.setNodeProperties = function (nodeId) {
  //   Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype.setNodeProperties.call(this, nodeId);
  //   this.nodeId = nodeId; // store the dbId for later use
  // };

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer.loadDocumentNode(doc, viewables).then(i => {
      // any additional action here?
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