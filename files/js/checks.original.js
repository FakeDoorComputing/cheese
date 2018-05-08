/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - checks.js */

function check(){

  // put player into shorter variable name and calculate by screen size
  var pX=round(xPer*player[0],0), pY=round(yPer*player[1],0), pSx=round(xPer*player[2],0), pSy=round(yPer*player[2],0);

//  console.log("pX: "+pX+" pY: "+pY+" pSx: "+pSx+" pSy: "+pSy)

  // check for walls
  for(i=0;i<level[levelNo].xStrt.length;i++){
    xPos=xPer*level[levelNo].xStrt[i];
    yPos=yPer*level[levelNo].yStrt[i];
    xBox=xPer*level[levelNo].xSize[i];
    yBox=yPer*level[levelNo].ySize[i];
    if(xPos<pX+pSx&&xPos+xBox>pX&&yPos<pY+pSy&&yPos+yBox>pY){
      wall=true;
      return ["wall",9];
    }
  }

  // check for trap
  if(diff_lev>1){
    for(i=0;i<trap[levelNo].x.length;i++){
      var tX=xPer*trap[levelNo].x[i], tY=yPer*trap[levelNo].y[i], tSx=xPer*trap[levelNo].s[i], tSy=yPer*trap[levelNo].s[i];
      var pX=xPer*player[0], pY=yPer*player[1], pSx=xPer*player[2], pSy=yPer*player[2];
      if(tX<pX+pSx&&tX+tSx>pX&&tY<pY+pSy&&tY+tSy>pY){
        trap_triggered=true;
        return ["trap",9];
      }
    }
  }

  //check for exit
  for(i=0;i<4;i++){
    xPos=xPer*level[levelNo].exit[0];
    yPos=yPer*level[levelNo].exit[1];
    xBox=xPer*level[levelNo].exit[2];
    yBox=yPer*level[levelNo].exit[2];
    if(xPos<pX+pSx&&xPos+xBox>pX&&yPos<pY+pSy&&yPos+yBox>pY){
      exit_level=true;
      return ["exit",9];
    }
  }

  // check for cheese
  for(i=0;i<cheese_place[levelNo].x.length;i++){
    var cX=xPer*cheese_place[levelNo].x[i], cY=yPer*cheese_place[levelNo].y[i], cSx=xPer*cheese_place[levelNo].s[i], cSy=yPer*cheese_place[levelNo].s[i];
    if(cX<pX+pSx&&cX+cSx>pX&&cY<pY+pSy&&cY+cSy>pY){
      return ["cheese",i];
    }
  }

  return ["",9];

}
