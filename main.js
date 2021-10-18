// a simple sync prompt module for node
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field
    // the upper left corner is the starting point
    this.y = 0
    this.x = 0
  }
  // print the field to the console
  print() {    
    for (let i = 0; i < this._field.length; i++) {
      // concatenate and print the elements in an array
      console.log(this._field[i].join(''));
    }
  }
  // follow the player's movements
  move() {
    let direction = prompt('Where do you want to move? (u = up, d = down, l = left, r = right)')
    // wipe the old pathCharacter
    this._field[this.y][this.x] = fieldCharacter;
    switch(direction) {
      // up
      case 'u':
        this.y -= 1;
        break;
      // down
      case 'd':
        this.y += 1;
        break;
      // left
      case 'l':
        this.x -= 1;
        break;
      // right
      case 'r':
        this.x += 1;
    }
  }
  // the main game logic
  play() {
    let continueGame = true
    // continue the game until it's over
    while (continueGame === true) {
      switch(this._field[this.y][this.x]) {
        case fieldCharacter:
          // set the pathCharacter
          this._field[this.y][this.x] = pathCharacter;
          // print the field to the console
          this.print(this._field);
          // ask the user where to move next
          this.move()
          break;
        case hole:
          console.log('Oh no, you fell into a hole!');
          continueGame = false;
          break;
        case hat:
          console.log('Awesome, you found your hat!');
          continueGame = false;
          break;
        case undefined:
          console.log('It\'s over, you fell from the edge of the world!')
          continueGame = false;
      }
    }
  }
  static generateField(height, width) {
    let newField = [];
    // specify the height and width of the field
    for (let i = 0; i < height; i++) {
      newField.push([])
      for (let j = 0; j < width; j++) {
        newField[i].push(fieldCharacter)
      }
    }
    // make a hole in every row of the field (except for the very first)
    for (let k = 1; k < height; k++) {
      let makeHole = Math.floor(Math.random() * width);
      newField[k][makeHole] = hole;
    }
    // put the hat on the last row of the field
    let makeHat = Math.floor(Math.random() * width)
    newField[width-1][makeHat] = hat;

    return newField;
  }
}

const randomField = Field.generateField(10,10)

const myField = new Field(randomField)

myField.play()
