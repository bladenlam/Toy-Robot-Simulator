"use strict";
//World Variables
let WorldMinX = 0;
let WorldMinY = 0;
let WorldMaxX = 4;
let WorldMaxY = 4;
//Array Containing the cardinal directions
const Directions = ["NORTH", "EAST", "SOUTH", "WEST"];
//Toy Object
let Toy = {
    PosX: 0,
    PosY: 0,
    Orientation: 0,
    Placed: false
};
//Input File Ref
let Input = document.querySelector('input');
//Command Text Area Ref
let TextArea = document.querySelector('textarea');
//Output "Console" Area Ref
let OutputArea = document.querySelector('#OutputArea');
//Event Listner, when new file is inputted it will load the text into the editable TextArea and save it to CommandArray
Input.addEventListener('change', () => {
    //console.log("Input Event: Start");
    let Files = Input.files;
    if (Files.length == 0)
        return;
    const File = Files[0];
    let Reader = new FileReader();
    Reader.onload = (TextElement) => {
        const File = TextElement.target.result;
        const Array = File.split(/\r\n|\n/);
        TextArea.value = Array.join('\n');
    };
    //In case an error occurs, it logs error name
    Reader.onerror = (e) => alert(e.target.error.name);
    Reader.readAsText(File);
});
//PLACE
function PLACE(X, Y, Direction) {
    //Assigns Coods to Toy Variables
    Toy.PosX = X;
    Toy.PosY = Y;
    //Saves Number equivalent to the Orientation Variable
    switch (Direction) {
        case Directions[0]:
            Toy.Orientation = 0;
            break;
        case Directions[1]:
            Toy.Orientation = 1;
            break;
        case Directions[2]:
            Toy.Orientation = 2;
            break;
        case Directions[3]:
            Toy.Orientation = 3;
            break;
    }
    Toy.Placed = true;
}
//MOVE
function MOVE() {
    //Switch Statement, checks if the direction the toy is moving in is viable, if it isn't it ignores it otherwise moves forward
    switch (Directions[Toy.Orientation]) {
        case Directions[0]:
            if (Toy.PosY < WorldMaxY) {
                Toy.PosY++;
            }
            break;
        case Directions[1]:
            if (Toy.PosX < WorldMaxX) {
                Toy.PosX++;
            }
            break;
        case Directions[2]:
            if (Toy.PosY > WorldMinY) {
                Toy.PosY--;
            }
            break;
        case Directions[3]:
            if (Toy.PosX > WorldMinX) {
                Toy.PosX--;
            }
            break;
    }
}
//LEFT
function LEFT() {
    //Deincrements Orientation Value, if the value decreases to -1 it loops aorund
    Toy.Orientation--;
    if (Toy.Orientation <= -1) {
        Toy.Orientation = 3;
    }
    ;
}
//RIGHT
function RIGHT() {
    //Increments Orientation Value, if the value increases to 4 it loops aorund
    Toy.Orientation++;
    if (Toy.Orientation >= 4) {
        Toy.Orientation = 0;
    }
    ;
}
//REPORT
function REPORT() {
    //Outputs Toy Coordinate and Orientation to Output Area
    OutputArea.innerHTML = OutputArea.innerHTML + "<br />" + Toy.PosX + " " + Toy.PosY + " " + Directions[Toy.Orientation];
}
//Submit Button Ref
const SubmitButton = document.querySelector('#ExecuteCommand');
//On Click Submit Button Event
SubmitButton.addEventListener('click', () => {
    //Splits into from the Area into an Array
    let Array = TextArea.value.split("\n");
    //Iterates through array and executes each command line by line
    for (let i = 0; i <= Array.length; i++) {
        //console.log(i + " Index: " + Array[i]);
        //Checks if the command is defined before executing
        if (Array[i] != undefined) {
            //Checks if the Command includes place
            if (Array[i].includes("PLACE")) {
                //console.log(i + " Index: PLACE COMMAND");
                //Splits PLACE command at " ". E.g. PLACE 1,2,NORTH -> PLACE + 1,2,NORTH
                let TempArray = Array[i].split(" ");
                //Takes Coords and splits it into X,Y,F. E.g. 1,2,NORTH -> 1 + 2 + NORTH
                TempArray = TempArray[1].split(",");
                //Runs the PLACE Function converting the two numbers from string to int variables
                PLACE(parseInt(TempArray[0]), parseInt(TempArray[1]), TempArray[2]);
            }
            //Checks the Toy has been placed before allowing access to other commands
            if (Toy.Placed) {
                switch (Array[i]) {
                    case "MOVE":
                        //console.log(i + " Index: PLACE MOVE");
                        MOVE();
                        break;
                    case "LEFT":
                        //console.log(i + " Index: PLACE LEFT");
                        LEFT();
                        break;
                    case "RIGHT":
                        //console.log(i + " Index: PLACE RIGHT");
                        RIGHT();
                        break;
                    case "REPORT":
                        //console.log(i + " Index: PLACE REPORT");
                        REPORT();
                        break;
                }
            }
        }
    }
});
