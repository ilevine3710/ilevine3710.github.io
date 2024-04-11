// Main function
let gameTable = [ 
[1, 2, 3, 4],
[5, 6, 7, 8],
[9, 10, 11, 12],
[13, 14, 15, 0]];
let referenceTable = [ 
[1, 2, 3, 4],
[5, 6, 7, 8],
[9, 10, 11, 12],
[13, 14, 15, 0]];

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
// Event handler for reset button
button1.addEventListener("click",function(evt) { 
  const click = evt.target;
  if (!click) {
    return;
  } 
  gameTable = [ 
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]];;
  reset();
});
// Event handler for scramble button
button2.addEventListener("click",function(evt) {
  const click = evt.target;
  if (!click) {
    return;
  } 
  scramble();
});
generateTable();

// Other functions
function generateTable() {
  solved = checkSolved();
  const tbl = document.createElement("table"); // Creates table element
  const tblBody = document.createElement("tbody");
  for (let i = 0; i < 4; i++) {
    const row = document.createElement("tr");  // Creates table row element
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("td"); //  Creates table cell element
      cell.addEventListener("click",function(evt) { // Creates event handler for each cell of the table
        const click = evt.target;
        if (!click) {
         return;
        } changeCell(click.innerHTML)
      });
      const cellText = document.createTextNode(gameTable[i][j]); // Assigns the array value to the table cell
      // These if-else statements make sure the "0" cell remains empty, by matching the text and background colors
      if (gameTable[i][j] == 0 && !solved) {
        cell.style.color = " #acb9c9";
      }
      else if (gameTable[i][j] == 0) {
        cell.style.color = "#76ca95";
      }
      // If the puzzle is solved, change each cell background to green, else, change it to grey
      if (solved) {
        cell.style.backgroundColor = "#76ca95";
      } else {
        cell.style.backgroundColor = "#acb9c9";
      }
      cell.appendChild(cellText); // Add the cell text to the cell
      row.appendChild(cell); // Add the cell to the row
    } tblBody.appendChild(row); // Add the row to the table
  }
  tbl.appendChild(tblBody); // Add all rows to the table
  var container = document.getElementById("container");
  container.appendChild(tbl); // Put the table into the grid container
  tbl.setAttribute("border", "2");
  tbl.id = "gameTable";
}
function changeCell(num) {
    // Find coordinates
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (num == gameTable[i][j]) {
          x1 = i;
          y1 = j;
        } else if (gameTable[i][j] == 0) {
          x2 = i;
          y2 = j; 
        }
      }
    }
    // Checks if cell clicked is next to the empty or "0" cell
    if (((x1 - x2 == 1 | x2 - x1 == 1) && (y1 == y2)) ^ ((y1 - y2 == 1 | y2 - y1 == 1) && (x1 == x2))) { // Checks if cell clicked is next to empty cell
      swapCells(gameTable, x1, y1, x2, y2);
      reset();
    } 
}
// Removes old table, and generates new table
function reset() {
  var container = document.getElementById("container");
  var oldTable = document.getElementById("gameTable");
  container.removeChild(oldTable);
  generateTable();
}
// Checks if the current array matches the reference array, the reference array is always solved
function checkSolved() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameTable[i][j] != referenceTable[i][j]) {
        return false;
      }
    }
  } return true;
}
// Swaps the elements indicated by the two sets of coordinates
function swapCells(gameTable, x1, y1, x2, y2) { 
  let junk = gameTable [x1][y1];
  gameTable [x1][y1] = gameTable[x2][y2];
  gameTable[x2][y2] = junk;
}
// Shuffle the array, and resets the table
function scramble () {
  for (let i = 0; i < 500; i++) {
    let num = Math.floor(Math.random() * (4));
    let x1 = 0;
    let y1 = 0;
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        if (gameTable[j][k] == 0) {
          x1 = j;
          y1 = k;
        } 
      }
    }
    console.log(x1);
    console.log(y1);
    switch (num) {
      case 0:
        if (y1 != 0) {
          swapCells(gameTable, x1, y1, x1, y1 - 1);
        } else {
          swapCells(gameTable, x1, y1, x1, y1 + 1);
        }
        break;
      case 1:
        if (x1 != 3) {
          swapCells (gameTable, x1, y1, x1 + 1, y1);
        }
        break;
      case 2:
        if (y1 != 3) {
          swapCells (gameTable, x1, y1, x1, y1 + 1);
        } else {
          swapCells (gameTable, x1, y1, x1, y1 - 1);
        }
        break;
      case 3:
        if (x1 != 0) {
          swapCells (gameTable, x1, y1, x1 - 1, y1);
        } else {
          swapCells (gameTable, x1, y1, x1 + 1, y1);
        }
        break;
    }
  } reset();
}