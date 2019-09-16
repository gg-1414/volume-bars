var rafID;
var data = {
  'moveTo': []
};

window.onload = function() {
  var canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var centerX = canvas.width / 2,
      centerY = canvas.height / 2; 

  var context = canvas.getContext("2d");

  // canvas dimensions resized when window is resized
  addEventListener("resize", () => { // window.addEventListner 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  var time = 0.0;
  
  function mainLoop() {
      requestAnimationFrame(mainLoop);
      time += 0.01;
      
      //--->
      context.clearRect(0,0,canvas.width,canvas.height);
      context.save(); // save the state of everything called before 
      
      context.translate(centerX, centerY); // move context to center of canvas
      
      for(var i = 0; i < 11; i+=10) { // i represents each line drawn

        // angle * (Math.PI / 180) => angle in radians
        
        // var angle_1 = ((45 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        var angle_1 = ((90 + i) + 180 * Math.sin(time)) * (Math.PI / 180); 
        // var angle_2 = ((90 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        var angle_2 = ((180 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        // var angle_3 = ((135 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        var angle_3 = ((270 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        // var angle_4 = ((180 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        // var angle_5 = ((225 + i) + 180 * Math.sin(time)) * (Math.PI / 180);
        
        let moveX = -Math.cos(angle_1) * (centerX * Math.sin(time)),
            moveY = -Math.sin(angle_1) * (centerX * Math.sin(time));

        let line1X = Math.cos(angle_2) * canvas.width / (7.5 * Math.cos(time) + 2.5 * Math.sin(time)),
            line1Y = Math.sin(angle_2) * canvas.width / (7.5 * Math.cos(time) + 2.5 * Math.sin(time));

        let line2X = Math.cos(angle_3) * canvas.width / 1,
            line2Y = Math.sin(angle_3) * canvas.width / 1;

        // let line3X = Math.cos(angle_4) * canvas.width / 1,
        //     line3Y = Math.sin(angle_4) * canvas.width / 1;

        // let line4X = Math.cos(angle_5) * canvas.width / 1,
        //     line4Y = Math.sin(angle_5) * canvas.width / 1;
        
        context.beginPath();
        context.strokeStyle = `hsl(${i *2}, 100%, 60%)`
        // context.strokeStyle = `hsl(${i * 10 }, ${i*1}, 100%)`
        context.moveTo(moveX, moveY);
        context.lineTo(line1X, line1Y);
        // context.lineTo(line2X, line2Y);
        // context.lineTo(line3X, line3Y);
        // context.lineTo(line4X, line4Y);


        // if (i <= 10) {
          // if (!data[i]) {
          //   data[i] = {}
          // } else {
            // data[i]['angle1'] ? data[i]['angle1'].push(angle_1) : data[i]['angle1'] = [angle_1]
            // data[i]['angle2'] ? data[i]['angle2'].push(angle_2) : data[i]['angle2'] = [angle_2]
            // data[i]['angle3'] ? data[i]['angle3'].push(angle_3) : data[i]['angle3'] = [angle_3]

            // data[i]['moveTo'] ? data[i]['moveTo'].push([moveX, moveY]) : data[i]['moveTo'] = [[moveX, moveY]]
            // data[i]['lineTo1'] ? data[i]['lineTo1'].push([line1X, line1Y]) : data[i]['lineTo1'] = [[line1X, line1Y]]
            // data[i]['lineTo2'] ? data[i]['lineTo2'].push([line2X, line2Y]) : data[i]['lineTo2'] = [[line2X, line2Y]]
          // }
        // }

        data['moveTo'].push({ 'x': moveX, 'y': moveY });
        
        // context.closePath();
        context.stroke();
      }    
      
      context.restore(); // draw the saved state 
      //<---
  }

  rafID = requestAnimationFrame(mainLoop);

  setTimeout(function() {

    // let output = Object.values(data).reduce(function(obj, angleData, index) {
    //   obj[index + 1] = angleData.slice(0,50);
    //   return obj;
    // }, {})

    // console.log(JSON.stringify(output))
    // console.log(output)
    console.log(data)

    // exportToJsonFile(data);
    
  }, 1000)

  // function exportToJsonFile(jsonData) {
  //   let dataStr = JSON.stringify(jsonData);
  //   let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  //   let exportFileDefaultName = 'data.json';

  //   let linkElement = document.createElement('a');
  //   linkElement.setAttribute('href', dataUri);
  //   linkElement.setAttribute('download', exportFileDefaultName);
  //   linkElement.click();
  // }

}