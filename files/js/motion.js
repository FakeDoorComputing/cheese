function get_orientation(event){

  if(orient){
    start_y=round(event.gamma/100,1)*10;
    start_z=round(event.beta/100,1)*10;
    orient=false;
  }

  var yv=event.gamma;
  var zv=event.beta;
  var x_dir, y_dir; /* direction */

  var y_value=round((start_y-yv)/100,1)*10; /* x value */
  var z_value=round((start_z-zv)/100,1)*10; /* y value */
  if(y_value<0){
    /* tilt to the right */
    x_dir=false;
  }
  if(y_value>=0){
    /* tilt to the left */
    x_dir=true;
  }
  if(z_value<0){
    /* tilt towards */
    y_dir=false;
  }
  if(z_value>=0){
    /* tilt backwards */
    y_dir=true;
  }

  if(!paused&&wall){
    sen_y=round(sen_y+=y_value,1);
    sen_z=round(sen_z+=z_value,1);
    wall=false;
  }

  if(!paused&&!trap_triggered){
    player[0]-=y_value;
    player[1]-=z_value;
    if(player[0]<0){player[0]=0}
    if(player[1]<0){player[1]=0}
    if((player[0]+player[2])>100){player[0]=(100-player[2])}
    if((player[1]+player[2])>100){player[1]=(100-player[2])}
  }

  check();


}

function round(number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

function get_keyboard(){
  console.log(key);
}
