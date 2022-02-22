var missedImage = document.createElement("img");
missedImage.src = "./missed.png";
missedImage.className = "missed-image";
var hitImage = document.createElement("img");
hitImage.src = "./ship.png";
hitImage.className = "hit-image";
// const b = document.getElementById("box-2");
// b.appendChild(hitImage);
//count = model.boardsize.columns * model.boardsize.rows;
// var table = document.getElementById("table");
// for (let i = 0; i <21 ; i++) {
//   table.innerHTML += `<div class="box" id="box-${i}"></div>`;
// }
// let box = document.getElementsByClassName("box");
//  console.log(box);
//  console.log(table)
//  for (let i=0 ; i<=box.length;i++){
//    box[i].innerHTML = box[i].id.slice(4)
//  }

const display = {
  createScreen: function (count) {
    count = model.boardsize.columns*model.boardsize.rows
    var table = document.getElementById("table");
    for (let i = 0; i <count ; i++) {
      table.innerHTML += `<div class="box" id="box-${i}"></div>`;
    }
    let box = document.getElementsByClassName("box");
     console.log(box);
     for (let i=0 ; i<=box.length;i++){
      // box[i].innerHTML = box[i].id.slice(4);
     }
  
  },
  informHit: function () {
    const output = document.getElementById("output");
    output.innerHTML =
      "operation successfull , you a goddamn topgunner sergeant";
  },
  informmiss: function () {
    const output = document.getElementById("output");
    output.innerHTML =
      "operation failed sergeant take the next one more accurately";
  },
  hit: function (loc) {
    loc.innerHTML = "";
    loc.appendChild(hitImage);
    this.informHit();
  },
  miss: function (loc) {
    loc.innerHTML = "";
    loc.appendChild(missedImage);
    this.informmiss();
  },
  fire: function (guess, loc) {
    if (loc < 0) {
      this.miss(model.translateGuessToLoc(guess));
    } else if (loc >= 0) {
      this.hit(model.translateGuessToLoc(guess));
      console.log("loc>=0");
    }
  },
};
const model = {
  numShips: 3,
  shipLengths: 4,
  boardsize: {
    rows: 6,
    columns: 4,
  },

  shipObject: function () {
    let locations = [];
    for (let i = 0; i <= model.shipLengths - 1; i++) {
      locations.push("");
    }
    this.locations = locations;
  },
  generateShipLocations: function () {
    let ships = [];
    //Generates equivlant number of ships based on numships and store them in const ships array.
    for (let i = 0; i <= this.numShips - 1; i++) {
      ships.push(new model.shipObject());
    }
    // generate locations for each ship
    ships.forEach((ship) => {
      ship.locations[0] = Math.floor(
        Math.random() *
          (this.boardsize.columns * this.boardsize.rows -
            (this.shipLengths - 1))
      );
      for (let i = 1; i <= model.shipLengths - 1; i++) {
        ship.locations[i] = ship.locations[i - 1] + 1;
      }
    });
    // logging the ships. it always logs . no problem here .
    console.log("ships", ships);
    //check locations if they overlap ;
    if (this.collision(ships) == true) {
      console.log("collision is true");
      return this.generateShipLocations();
    } else {
      console.log("collision is false");
      return ships;
    }
  },
  collision: function (shipObject) {
    for (let i = 0; i <= shipObject.length - 2; i++) {
      for (let j = i + 1; j <= shipObject.length - 1; j++) {
        if (
          Math.abs(shipObject[i].locations[0] - shipObject[j].locations[0]) <
          this.shipLengths
        ) {
          console.log("collision", i, j);
          return true;
        }
      }
    }
    return false;
  },
  translateGuessToLoc: function (guess) {
    let x = ("box-" + guess).toString();
    let loc = document.getElementById(x);
    return loc;
  },
  fire: function () {
    const parent = document.querySelector("#table");
    const ships = this.generateShipLocations();
    console.log(ships);
    let nestedLoc = [];
    ships.forEach((Object) => {
      nestedLoc.push(Object.locations);
    });
    let loctest = nestedLoc.flat();
    console.log(loctest);
    parent.addEventListener("click", handler, false);
    function handler(e) {
      if (e.target !== e.currentTarget) {
        let id = e.target.id;
        console.log(id);
        let guess = parseInt(id.slice(4));
        console.log(guess);
        let loc = nestedLoc.flat().indexOf(guess);
        console.log("nestedloc", nestedLoc, "guess", guess, "loc", loc);
        display.fire(guess, loc);
      }
      e.stopPropagation();
    }
  },
};
display.createScreen();
model.fire();

