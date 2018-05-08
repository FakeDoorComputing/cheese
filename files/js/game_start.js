/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - game_start.js */

// load when page created
$(document).on("pagecreate", "#titleScreen", function(){
//$(document).on("pagecreate","#gameScreen",function(){

  // put canvas into variables
  game_canvas=document.getElementById("gameArea");
  cv1=game_canvas.getContext("2d");

  // get the screen size and lock orientation to portrait
  screen_size();

  // start game with the splash screen
  splash_screen();

  // then load welcome screen
  welcome_screen();

  // game screens
  game_screen();

});
