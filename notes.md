# `moveTo` DATA ANALYSIS (using D3.js)

## moveToData at different timespans (in seconds)
```
// moveToData_3.length => 348
// moveToData_10.length => 896
// moveToData_20.length => 972
// moveToData_60.length => 6342
// moveToData_120.length => 14170
// moveToData_180.length => 14686
```

---

## moveToData_60: [min, max]
```
// x => [-105.31757865081968, 351.3031915802577
// y => [-108.32235287668527, 606.4999874203475]
```

---
## moveToData_180: 
### Index of Math.min(x), Math.max(y)
``` 
x[3141]
y[3140]
```

### Indices around the cut off point (lower left cut off)
```
const cutOffPointsIndices = [];

data['moveToData'].forEach(function(coord, index) {
  coord['moveX'] >= -50 && coord['moveX'] <= 0 &&
  coord['moveY'] >= 580 && coord['moveY'] <= 607 ? 
  cutOffPointsIndices.push(index) : false;
});

// log the values at cut off points 
const cutOffPoints = data['moveToData'].slice(cutOffPointsIndices[0], cutOffPointsIndices[cutOffPointsIndices.length-1]+1)
```

### Second cut off point (upper left cut off)
```
// 6282: {moveX: 0.00014414714559936808, moveY: -606.4999541165179}
```

--- 

# Helpers 

## Exporting the data as json 
```
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

exportToJsonFile(moveToData);

// https://www.codevoila.com/post/30/export-json-data-to-downloadable-file-using-javascript
```

## Grabbing the data to be exported as json 
```
var data = { 'pathData': [] };
var moveToData = { 'moveToData': [] };

// All Data 
data['pathData'].push({ 
  'moveX': moveX, 
  'moveY': moveY,
  'line1X': line1X,
  'line1Y': line1Y,
  'line2X': line2X,
  'line2Y': line2Y,
});

// moveTo Data Only 
moveToData['moveToData'].push({
  'moveX': moveX,
  'moveY': moveY
});
```