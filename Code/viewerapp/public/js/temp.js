function triggerPanelUpdate() {
  jQuery.ajax({
    url: 'https://cs1100320005fe6c183.blob.core.windows.net/rpisensor/rpisensor/01/2020/06/16/14/37',
    datalype: 'json',
    success: function (temps) {
      var record = temps[0];
  
      _lastRecord = record.Temp;
  
      _panel.removeAllProperties();
      _panel.addProperty('temperature', 'humidity');
        
      addCharData(record);
        
      console.log(record);
  
      if (_panel.isVisible()) setTimeout(triggerPanelUpdate, 10 *1000);
    }
  });
}

function onMouseClick(event) {
  
  var screenPoint = {
    x: event.clientX,
    y: event.clientY
  };

  var n = normalizeCoords(screenPoint) ;
  
  var hitTest1 = viewer.impl.hitTest(screenPoint.x, screenPoint.y, true);
  
  //get hit point
  var hitTest = viewer.utilities.getHitPoint(
    screenPoint.x,
    screenPoint.y);
  
  if (hitTest1) {
    console.log(hitTest1.intersectPoint) ;
    drawPushpin({
      x: hitTestl.intersectPoint.x,
      y: hitTestl.intersectPoint.y,
      z: hitTestl.intersectPoint.z
    });
  }
}  