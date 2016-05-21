var HITBYTORPEDO = -1;
var SHIP = 0;
var HITSHIP = 1;
var board=[];
var torpedoUse = 25;
var shipsHit = 0;
var gameOver = false;


//Fire Torpedo function
function fireTorpedo(location) {
  if(gameOver === false){
    var locationInt = parseInt(location);
    //when
    if(board[locationInt] != HITBYTORPEDO){

      if(board[locationInt]===SHIP){
        board[locationInt]=HITSHIP;
        $("#"+location).addClass("showShip");
        shipsHit++;
        $("#hitCounter").text(shipsHit);

        if(shipsHit===5){
          $("#gameOver").text(" You Won");
          gameOver = true;
        }
      }
      else{
        board[locationInt]=HITBYTORPEDO;
      }

      $("#"+location).addClass("hitByTorpedo");
      torpedoUse--;
      if(torpedoUse === 0){
        $("#gameOver").text("You are out of Torpedoes");
        gameOver=true;
      }
      $("#torpedoUse").text(torpedoUse);
    }
  }
}

function placeShip(length, isHorizontal){
  if(isHorizontal === true){
    do{
      var shipLocation=Math.floor(Math.random()*99);
    }
    while(board[shipLocation]===SHIP ||
          //condition right
          board[shipLocation+1]===SHIP ||
          //condition left
          board[shipLocation-1]===SHIP ||
          //condition up
          board[shipLocation-10]===SHIP ||
          //condition down
          board[shipLocation+10]===SHIP ||
          //if ship wraps
          (10-length)<(shipLocation%10) ||
          checkForShipHorizontal(length, shipLocation)
        );
    for(var i=0; i<length; i++){
      board[shipLocation+i]=SHIP;
    }
  }
  if(isHorizontal === false){
    do{
      var shipLocation=Math.floor(Math.random()*99);
    }
    while(board[shipLocation]===SHIP ||
          //condition right
          board[shipLocation+1]===SHIP ||
          //condition left
          board[shipLocation-1]===SHIP ||
          //condition up
          board[shipLocation-10]===SHIP ||
          //condition down
          board[shipLocation+10]===SHIP ||
          //if ship wraps
          (10-length)<(shipLocation%10) ||
          checkForShipVertical(length, shipLocation)

        );
    for(var i=0; i<length; i++){
      board[shipLocation+i*10]=SHIP;
    }
  }

}

function checkForShipHorizontal(length, location){
  for(var i=0; i<length; i++){
    if(board[location + i]===SHIP ||
          //condition right
          board[location + i+1]===SHIP ||
          //condition left
          board[location + i-1]===SHIP ||
          //condition up
          board[location + i-10]===SHIP ||
          //condition down
          board[location + i+10]===SHIP){
      return true;
    }
  }
  return false;
}

function checkForShipVertical(length, location){
  for(var i=0; i<length; i++){
    if(board[location + i]===SHIP ||
          //condition right
          board[location + (i+1)*10]===SHIP ||
          //condition left
          board[location + (i-1)*10]===SHIP ||
          //condition up
          board[location + (i-10)*10]===SHIP ||
          //condition down
          board[location + (i+10)*10]===SHIP){
      return true;
    }
  }
  return false;
}

function showShips(){
  for(var i=0; i<10; i++){
    if(board[i]===SHIP){
      $("#0"+i).addClass("showShip")
    }
  }
  for(var i=10; i<100; i++){
    if(board[i]===SHIP){
      $("#"+i).addClass("showShip")
    }
  }
}

$(document).ready(function(){

  for(var i=0; i<10; i++){
    var row=$("#boardBody").append("<tr></tr>")
    for (var j=0; j<10; j++){
      $(row).append('<td class="boardCell"' + "id=" + i + j+ ">" + i + j + "</td>")
    }
  }

  // listen for clicks on cells
  $("td").on("click", function(){
    fireTorpedo(
      $(this).attr("id")
    );
  })

  $("#torpedoUse").text(torpedoUse);


  //places ships
  placeShip(5, true);
  placeShip(4, false);
  placeShip(4, true);
  placeShip(3, false);
  placeShip(3, true);
  placeShip(2, false);
  placeShip(2, true);
  placeShip(1, true);











})
