/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - game.js */

//var ev, key, y_value=0, z_value=0, testflag=0; // NOTE: remove this when complete
//time=time_choice[1]; // NOTE remove this when finished
get_player();
total_levels=level.length-1;

// event triggers
$(document).on("pagecreate","#gameScreen",function(){

  window.addEventListener("deviceorientation", get_orientation, true);

  $("#pausePanel").css("background-size", wd);
  $("#pausePanel").on("panelbeforeopen", function(){
    paused=true;
  });
  $("#pausePanel").on("panelclose", function(){
    paused=false;
    speed=0;
    game_screen();
  });
  $("#continue_game_button").on("tap", function(){
    alert("continue game");
  });
  $("#sound_icon").on("tap", function(){
    if(sound){
      $("#sound_icon").attr("src","files/graphics/sound_off.png");
      sound=false;
    }
    else if(!sound){
      $("#sound_icon").attr("src","files/graphics/sound_on.png");
      sound=true;
    }
  });
  $("#menu_button").on("tap", function(){
    alert("menu");
  });
  $("#exit_button").on("tap", function(){
    alert("Exit");
  });
  $("#button_placeholder").on("tap",function(){
    load_next_level();
  });
  $("#continue_from_life").on("tap",function(){
    paused=false;
    get_player();
    speed=0;
    time=time_choice[diff_lev];
    $.mobile.changePage("#gameScreen",{
      transition: "flip"
    });

    // start game
    game_screen();
  });
})

// get keyboard input for developing
$(window).keypress(function(e) {
  var ev = e;
  var key = ev.keyCode;
  switch(key){
    case 119:
      player[1]-=1;
      break;
    case 115:
      player[1]+=1
      break;
    case 97:
      player[0]-=1;
      break;
    case 100:
      player[0]+=1;
      break;
  }
console.log("px: "+player[0]+" py: "+player[1])
})
  /*
  function move(dir){

    for(i=0;i<2;i++){
//  switch(key){
      switch(dir){
  //  case 119:

        case 1:
          direction=0;
          speed=set_speed;
          break;
//    case 115:
        case 2:
          direction=1;
          speed=set_speed;
          break;
//    case 97:
        case 3:
          direction=2;
          speed=set_speed;
          break;
//    case 100:
        case 4:
          direction=3;
          speed=set_speed;
          break;
        };
      };
};*/

function get_player(){
  player[0]=level[levelNo].playPos[0];
  player[1]=level[levelNo].playPos[1];
  player[2]=level[levelNo].playPos[2];
}

// game screen function
function game_screen(){

  if(!paused){

    time--;

    if(time<0){
      time=0;
      life_lost("time");
    }

    draw_maze();
  //  testflag=1; // NOTE: remove this when done
    draw_player();

    update_stats();

    requestAnimationFrame(game_screen);
  }
}

function draw_grid(){

  // draw grid
  cv1.strokeStyle="gray";
  cv1.setLineDash([5,3]);
  cv1.beginPath();
  for(i=1;i<10;i++){
    cv1.moveTo(i*(xPer*10),0);
    cv1.lineTo(i*(xPer*10),(yPer*100));
    cv1.stroke();
  }
  for(i=1;i<10;i++){
    cv1.moveTo(0,i*(yPer*10));
    cv1.lineTo((xPer*100),i*(yPer*10));
    cv1.stroke();
  }
}

function draw_maze(){

  cv1.clearRect(0,0,xPer*100,yPer*100);
  cv1.drawImage(game_background,0,0,wd,ht)
  cv1.fillStyle="#78AB46";
  cv1.fill();

  //draw_grid(); // NOTE remove for final game
  // draw walls
  for(i=0;i<level[levelNo].xStrt.length;i++){
    cv1.beginPath();
    xPos=xPer*level[levelNo].xStrt[i];
    yPos=yPer*level[levelNo].yStrt[i];
    xBox=xPer*level[levelNo].xSize[i];
    yBox=yPer*level[levelNo].ySize[i];
    if(testflag==0){console.log("x: "+xPos+" y: "+yPos+" xl: "+xBox+" yl: "+yBox)}
    cv1.rect(xPos,yPos,xBox,yBox);
    cv1.fillStyle="rgb(255,0,0)";
    cv1.fill();
  }

  // draw exit
  cv1.beginPath();
  var eX=xPer*level[levelNo].exit[0], eY=yPer*level[levelNo].exit[1], eSx=xPer*level[levelNo].exit[2], eSy=yPer*level[levelNo].exit[2];
  cv1.drawImage(doorSprite,eX,eY,eSx,eSy);

  // place traps on difficulties higher than easy
  if(diff_lev>1){
    for(i=0;i<trap[levelNo].x.length;i++){
      cv1.beginPath();
      var tX=xPer*trap[levelNo].x[i], tY=yPer*trap[levelNo].y[i], tSx=xPer*trap[levelNo].s[i], tSy=yPer*trap[levelNo].s[i];
      cv1.drawImage(trapSprite,tX,tY,tSx,tSy);
    }
  }

  // place cheese
  for(i=0;i<cheese_place[levelNo].x.length;i++){
    cv1.beginPath();
    var cX=xPer*cheese_place[levelNo].x[i], cY=yPer*cheese_place[levelNo].y[i], cSx=xPer*cheese_place[levelNo].s[i], cSy=yPer*cheese_place[levelNo].s[i];
    cv1.drawImage(cheeseSprite,cX,cY,cSx,cSy);
  }
}

function draw_player(){

  //calculate players movement
/*  switch(direction){
    case 0:
      player[1]-=speed;
      var checked=check();

      if(checked[0]=="wall"){
        player[1]+=speed;
        speed=0;
      }
      if(checked[0]=="trap"){
        speed=0;
        life_lost("trap");
      }
      if(checked[0]=="exit"){
        speed=0;
        exit();
      }
      if(checked[0]=="cheese"){
        cheese(checked[1]);
      }
      break;

    case 1:
      player[1]+=speed;
      var checked=check();

      if(checked[0]=="wall"){
        player[1]-=speed;
        speed=0;
      }
      if(checked[0]=="trap"){
        speed=0;
        life_lost("trap");
      }
      if(checked[0]=="exit"){
        speed=0;
        exit();
      }
      if(checked[0]=="cheese"){
        cheese(checked[1]);
      }
      break;

    case 2:
      player[0]-=speed;
      var checked=check();

      if(checked[0]=="wall"){
        player[0]+=speed;
        speed=0;
      }
      if(checked[0]=="trap"){
        speed=0;
        life_lost("trap");
      }
      if(checked[0]=="exit"){
        speed=0;
        exit();
      }
      if(checked[0]=="cheese"){
        cheese(checked[1]);
      }
      break;

    case 3:
      player[0]+=speed;
      var checked=check();

      if(checked[0]=="wall"){
        player[0]-=speed;
        speed=0;
      }
      if(checked[0]=="trap"){
        speed=0;
        life_lost("trap");
      }
      if(checked[0]=="exit"){
        speed=0;
        exit();
      }
      if(checked[0]=="cheese"){
        cheese(checked[1]);
      }
      break;
  };

  var checked=check();
  if(trap_triggered){
    life_lost("trap");
  }
  if(exit_level){
    exit();
  }
  if(checked[0]=="cheese"){
    cheese(checked[1]);
  }*/

  // draw player
  cv1.beginPath();
  if(sound){
    scratch.play();
  }
  var pX=xPer*player[0], pY=yPer*player[1], pSx=xPer*player[2], pSy=yPer*player[2];
  cv1.drawImage(playerSprite[direction],pX,pY,pSx,pSy);
}

function cheese(i){
  if(sound)
    lick.play();
  cheese_place[levelNo].x.splice(i,1);
  cheese_place[levelNo].y.splice(i,1);
  cheese_place[levelNo].s.splice(i,1);
  cheese_rating+=1;
  cheese_collected+=1;
}

function load_next_level(){
  levelNo++;
  if(levelNo<=total_levels){
    cheeses=0, lives=3, paused=false, time=time_choice[diff_lev], cheese_collected=0;
    cheese_rating=0, sen_y=level[levelNo].playPos[0], sen_z=level[levelNo].playPos[1];
    get_player();
    $("#level_complete_panel").panel("close");
    $(".score_area").hide();
    $(".cheese_image").hide();
    $("#continue").remove()
    game_screen();
  }
  else{
    end_game("complete");
  }
}

function update_stats(){
  $("#level_display_panel").html("&nbsp;&nbsp;&nbsp; Level :&nbsp;"+levelNo);
  $("#score_display_panel").html("&nbsp;&nbsp; Score :&nbsp;"+score);
  $("#lives_display_header").text(lives);
  if(time<720){
    $("#seconds_display").css({"color":"red","font-weight":"bold"}).text(Math.floor(time/60));
    if(sound&&time%60==0&&time>60)
      beep.play()
  }
  else{
    $("#seconds_display").css({"color":"#cdce00"}).text(Math.floor(time/60));
  }
}
