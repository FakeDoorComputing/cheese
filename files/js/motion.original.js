function get_orientation(event){

  if(orient){
    start_y=round(event.gamma/100,1)*10;
    start_z=round(event.beta/100,1)*10;
    orient=false;
/*    console.log("st-y: "+start_y+" st-z: "+start_z) */
  }

  var yv=event.gamma;
  var zv=event.beta;

  var y_value=round((start_y-yv)/100,1)*10;
  var z_value=round((start_z-zv)/100,1)*10;

//  console.log("y_v: "+y_value+" z_v: "+z_value+" s_y: "+sen_y+" s_z: "+sen_z+" p0: "+player[0]+" p1: "+player[1]+" wall: "+wall+" paused: "+paused+" trap: "+trap_triggered)

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
/*    console.log("p0: "+player[0]+" p2: "+player[2]+" p0+p2: "+(player[0]+player[2]));
    console.log("p1: "+player[1]+" p2: "+player[2]+" p1+p2: "+(player[1]+player[2]));
    console.log("wd: "+wd+" ht; "+ht);*/
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
