/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - panels.js */

function exit(){
  paused=true;
  $("#level_cleared").text("Level "+levelNo+" Cleared!")
  $("#level_complete_panel").panel("open");
  setTimeout(function(){
    if(cheese_rating>0){
      if(sound)
        cheese_1.play();
        $("#cheese1").fadeIn(1500,function(){
          if(cheese_rating>1){
            if(sound)
              cheese_2.play();
            $("#cheese2").fadeIn(1500,function(){
              if(cheese_rating>2){
                if(sound)
                  cheese_3.play();
                $("#cheese3").fadeIn(1500,function(){
                });
              }});
            }});
    }
    else{
      $("#no_cheese").fadeIn(2000);
    }
  },1000);
  score_display();
}

function score_display(){
  var seconds=Math.floor(time/60), cheeses=cheese_rating;
  if(cheese_rating==0){
    var timeout=2500;
    cheeses=0.5;
  }
  if(cheese_rating==1)
    var timeout=3000;
  if(cheese_rating==2)
    var timeout=4000;
  if(cheese_rating==3)
    var timeout=5000;
  setTimeout(function(){
    if(sound)
      chime.play();
    $("#level_bonus").text("Level Bonus : "+diff_lev+"x").fadeIn(1000, function(){
      if(sound)
        chime.play();
      $("#cheese_bonus").text("Cheese Bonus : "+cheese_collected+"x").fadeIn(1000, function(){
        if(sound)
          chime.play();
        $("#time_bonus").text("Time Bonus : "+seconds+"x").fadeIn(1000, function(){
          if(sound)
            chime.play();
            $("#lives_bonus").text("Lives Bonus : "+lives+"x").fadeIn(1000, function(){
              if(sound)
                lev_com.play();
              total_level_score=(10*diff_lev*cheeses*(seconds+0.5)*lives);
              score=score+total_level_score;
              $("#level_score").text("Level Score : "+total_level_score).fadeIn(1000, function(){
                $("#button_placeholder").append('<img id="continue" class="middle_buttons" src="files/graphics/continue.png" />');
              });
          });
        });
      });
    });
  },timeout);
}


function life_lost(reason){
  paused=true;
  if(lives>1&&reason=="trap"){
    lives-=1;
    if(cheese_rating>0)
      cheese_rating-=1;
    $("#reason_for_loss").text("You stepped on a trap!");
    $("#num_lives_left").text("Lives left : "+lives);
    if(sound)
      trap_snap.play();
    $.mobile.changePage("#life_lost",{
      transition: "flip"
    });
  }

  else if(lives>1&&reason=="time"){
    lives-=1;
    if(cheese_rating>0)
      cheese_rating-=1;
    $("#reason_for_loss").text("You ran out of time!");
    $("#num_lives_left").html("Lives left : "+lives);
    if(sound)
      gong.play();
    $.mobile.changePage("#life_lost",{
      transition: "flip"
    });
  }

  else if(lives==1&&reason=="trap"){
    alert("Nothing here yet...")
  }
  else if(lives==1&&reason=="time"){
    alert("Nothing here yet...")
  }
}

function end_game(reason){
  alert("Nothing here yet...")
}
