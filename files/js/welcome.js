/* Cheese Hunt (C) 2016-2018
AUTHOR: Symon Hambrey
Game Files - welcome.js */


function splash_screen()
{
  splash.play(); // play the intro music
  $("#pic").animate({top: "100px"},{duration:3000,complete:function(){$("#tap_me").fadeIn(4000)}}); // animate in the rat picture
  $("#left").animate({top: "-400px"},4500); // animate in the left part of the text
  $("#right").animate({top: "-200px"},4500); // animate in the right part of the text
  $("#tap_me").on("tap", function(){
    return;
  })
}; // end of splash screen function --------------------------------------------

// the welcome screen function *************************************************

function welcome_screen()
{
  $(document).on("pagecreate","#welcomeScreen",function(){
    $("#welcomeText").fadeIn(2000,function(){
      $("#easy").fadeIn(1000,function(){
        $("#medium").fadeIn(1000,function(){
          $("#hard").fadeIn(1000);
        });
      });
    });
    $("#logo").fadeIn();
    $("#easy").on("tap",function(){
      diff_lev=1;
      splash.pause();
      knock.play();
      time=time_choice[diff_lev];
      return;
    });
    $("#medium").on("tap",function(){
      diff_lev=2;
      splash.pause();
      knock.play();
      time=time_choice[diff_lev];
      return;
    });
    $("#hard").on("tap",function(){
      diff_lev=3;
      splash.pause();
      knock.play();
      time=time_choice[diff_lev];
      return;
    });
  });
}; // end of welcome screen function -------------------------------------------
