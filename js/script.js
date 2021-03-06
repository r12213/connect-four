// get player name and assign it to variable
// assign color to a player
var player1 = prompt("Player One: Enter Your Name , you will be Yellow");
var player1Color = 'rgb(255, 255, 0)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(255, 0, 0)';

var game_on = true;
var table = $('table tr');

// win log - prints to the console details about winning move
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// function for changing color of a button
function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// function for returning color value
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// function for returning the lowest possible grey chip row
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

// check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

//function checks for horizontal wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// function checks for vertical wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// function checks for diagonal wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// game over
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Press the button to play again!").css("fontSize", "50px");
      $('#restart').removeClass('btn btn-primary btn-lg').addClass('btn btn-success btn-lg');
    }
  }
}

// start with player one
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// start with player one
$('h3').text(player1+": it is your turn, please pick a column to drop your yellow chip.");

$('.board button').on('click', function() {
  
  // recognize what column was chosen
  var col = $(this).closest("td").index();

  // get back bottom available row to change
  var bottomAvail = checkBottom(col);

  // drop the chip in that column at the bottomAvail row
  changeColor(bottomAvail,col,currentColor);

  // check for a win or a tie.
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  // if no win or tie, continue to next player
  currentPlayer = currentPlayer * -1 ;

  // re-check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your yellow chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }

})
