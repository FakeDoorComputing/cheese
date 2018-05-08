/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - screen_size.js */

// resize the canvases based on the size of the screen *************************
function screen_size(){
  wd=window.innerWidth, ht=window.innerHeight-50; // take 10 pixels off screen  height (prevents screen run-over)
  game_canvas.width=wd;
  game_canvas.height=ht;
  xPer=wd/100, yPer=ht/100; // divide the window sizes by 100
}
