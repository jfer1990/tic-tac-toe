class Figures{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvasSize = 500;
    sectionSize = this.canvasSize / 3;
    lineStart = 10;
    constructor(){
      this.context.lineWidth = 10;
    }
   

    drawTicTacToeGrid(){
        if (!canvas.getContext) {
            throw "Your browser is not currently supporting canvas, please use firefox or chrome to the most recent version or any other using gecko 1.8 or greater version engine";
        }
        var lineLenght = this.canvasSize - 5;
        this.context.beginPath();
        this.context.strokeStyle = "#ffffff";

        //ROW
        for (var y = 1;y <= 2;y++) {  
            this.context.moveTo(this.lineStart, y * this.sectionSize);
            this.context.lineTo(lineLenght, y * this.sectionSize);
        }

        //COLUMNS
        for (var x = 1;x <= 2;x++) {
            this.context.moveTo(x * this.sectionSize, this.lineStart);
            this.context.lineTo(x * this.sectionSize, lineLenght);
        }

        this.context.stroke();

  
    }

    //@return object with 2 fields, coords and matrixPos
    //{coords:[double,double],matrixPos:[int,int]}
    positionInTicTacGrid (mouse) {
        var xCordinate;
        var yCordinate;
      
        for (var x = 0;x < 3;x++) {
          for (var y = 0;y < 3;y++) {
            xCordinate = x * this.sectionSize;
            yCordinate = y * this.sectionSize;
      
            if (this.isMatch(mouse,xCordinate,yCordinate)){
              return {coords:[xCordinate,yCordinate],
                      matrixPos:[x,y]} ;
            }
          }
        }
      }


    isMatch(mouse,xCoord,yCoord){
      if (
          mouse.x >= xCoord && mouse.x <= xCoord + this.sectionSize &&
          mouse.y >= yCoord && mouse.y <= yCoord + this.sectionSize
        ) {
            return true; 
          }
          else{return false;}
        }


    matrixPositionInBoard(row,col){return [row,col];}

    drawX(xCordinate,yCordinate){   
      this.context.strokeStyle = "#ff0000";
      this.context.beginPath();
      var displacement = 45;
      this.context.moveTo(xCordinate + displacement, yCordinate + displacement);
      this.context.lineTo(xCordinate + this.sectionSize - displacement, yCordinate + this.sectionSize - displacement);

      this.context.moveTo(xCordinate + displacement, yCordinate + this.sectionSize - displacement);
      this.context.lineTo(xCordinate + this.sectionSize - displacement, yCordinate + displacement);

      this.context.stroke();
    }


    drawO(xCoordinate,yCoordinate){
        var halfSectionSize = (0.5 * this.sectionSize);
        var centerX = xCoordinate + halfSectionSize;
        var centerY = yCoordinate + halfSectionSize;
        var radius = (this.sectionSize - 100) / 2;
        var startAngle = 0 * Math.PI; 
        var endAngle = 2 * Math.PI;

        
        this.context.strokeStyle = "#ff0000";
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, startAngle, endAngle);
        this.context.stroke();

    }

    drawLine(xInitial,yInitial,xEnd,yEnd){   
      this.context.strokeStyle = "#ff0000";
      this.context.beginPath();
      this.context.moveTo(xInitial,yInitial);
      this.context.lineTo(xEnd,yEnd);
      this.context.stroke();
    }
    
}
//Esta clase falta para ser implementada, aqui va la logica minMax para que la maquina tome el siguiente valor
class TicTacToeLogic{
    matrix = this.loadMatrix();
    loadMatrix(){
        const matrixGame = new Array(3).fill("").map(() => new Array(3).fill(""));
       return matrixGame; 
    }
    setPlayerMove(xCoord, yCoord,charVal){
      for(var i = 0; i < 3 ; i++){
        for(var j = 0; j < 3 ; j++){
          if (xCoord == i && yCoord == j){
            if (this.positionInMatrixIsEmpty(i,j)){
              this.matrix[i][j] = charVal;
            }
            else{
              throw "error, ya hay un elemento en esta posicion";
            }
          }
        }
      }
    }
    isWinner(xCoord, yCoord,charVal){
      var winner = false;
      var lastThreeCoords = [];

      //check col --> set j as an inmutable value
      for(var i = 0; i < 3 ; i++){
        if(this.matrix[i][yCoord]==charVal){
          winner = true;
          lastThreeCoords.push({x:i.toString(),y:yCoord.toString()});
        }
        else{
          winner = false;
          break;
        }
      }
      if(winner){return {winStat :winner,winnerTraceCoord:lastThreeCoords};}
      //check row
      for(var i = 0; i < 3 ; i++){
        if(this.matrix[xCoord][i]==charVal){
          winner = true;
          lastThreeCoords.push({x:xCoord.toString(),y:i.toString()});
        }
        else{
          winner =  false;
          break;
        }
      }
      if(winner){return {winStat :winner,winnerTraceCoord:lastThreeCoords};}      
      //check diag
      if(this.isInDiagonal(xCoord,yCoord)){
        for(var i = 0; i < 3 ; i++){
          if(this.matrix[i][i]==charVal){
            winner = true;
            lastThreeCoords.push({x:i.toString(),y:i.toString()});
          }
          else{
            winner = false;
            break;
          }
        }
      }
      if(winner){return {winStat :winner,winnerTraceCoord:lastThreeCoords};}
      //check inverse-diag
      if(this.isInDiagonal(xCoord,yCoord)){
        for(var i = 0; i < 3 ; i++){
          if(this.matrix[i][2-i]==charVal){
            winner = true;
            lastThreeCoords.push({x:i.toString(),y:(2-1).toString()});
          }
          else{
            winner = false;
            break;
          }
        }
      }
      if(winner){return {winStat :winner,winnerTraceCoord:lastThreeCoords};}
      return {winStat:false,winnerTraceCoord:null};
    }
    isFull(){
      for(var i = 0; i<3;i++){
        for(var j = 0 ; j < 3 ; j++){
          if(this.matrix[i][j]==""){
            return false
          }
        }
      }
      return true;
    }
    positionInMatrixIsEmpty(xCoord,yCoord){return this.matrix[xCoord][yCoord]==""?true:false;}

    isInDiagonal(xCoord,yCoord){
      if (xCoord==yCoord){
        return true;
      }
      if(xCoord+yCoord+1 == 3){
        return true;
      }
      return false;
    }

}
class TicTacToeGame{
    figure = new Figures();
    ticLogic = new TicTacToeLogic();
    moveTracer = [];
    playerOne = {current:true,charVal:"O",name:"jugador1"};
    playerTwo = {current:false,charVal:"X",name:"jugador2"}; 
    positionsMap = new Map();

    drawScenario(){
        this.figure.drawTicTacToeGrid();
    }
    setPlayersNames(name1,name2){
      this.playerOne.name = name1;
      this.playerTwo.name = name2;
    }
    addPlayerMove (mousePosition) {
      

      var currentPlayer = this.playerOne.current?this.playerOne:this.playerTwo;
      var currentChar = currentPlayer.charVal;
      

      var clickPosition = this.figure.positionInTicTacGrid(mousePosition);

      var drawingPos = clickPosition.coords;
      var matrixPos = clickPosition.matrixPos;
      try{
        if(drawingPos && matrixPos){
          this.ticLogic.setPlayerMove(matrixPos[0],matrixPos[1],currentChar);
          if(this.playerOne.current){
            this.figure.drawO(drawingPos[0],drawingPos[1]);
            playAudio();
          }
          else{
            this.figure.drawX(drawingPos[0],drawingPos[1]);
            playAudio();
          }
          this.moveTracer.push({drawPos:drawingPos,matrixPos:matrixPos});

          
        }
        var isWinner = this.ticLogic.isWinner(matrixPos[0],matrixPos[1],currentPlayer.charVal);
        if(isWinner.winStat){
          var winnerTracePosition = isWinner.winnerTraceCoord;

          showModal(currentPlayer.name+" es el ganador");
          
          
        }
        else{
          if(this.ticLogic.isFull()){
            showModal("No hay ganador");
          }
        }
        //this.playerTurn(nextPlayer);
        this.playerOne.current = !this.playerOne.current;
        this.playerTwo.current = !this.playerTwo.current;
        this.playerTurn();
      }
      catch(e){
        window.alert(e);
      }

    }
    mousePosition (event) {
        var rectangle = canvas.getBoundingClientRect();
      
        return {
          x: event.clientX - rectangle.left,
          y: event.clientY - rectangle.top
        }
      }
      playerTurn(){
        var player = this.playerOne.current?this.playerOne.name:this.playerTwo.name;
        
        var userDiv = document.getElementById("user");
        var lastParragraph = document.getElementById("turnos");
        var parragraph = document.createElement("p");
        var node = document.createTextNode("Turno de "+player);
        parragraph.appendChild(node);
        userDiv.replaceChild(parragraph,lastParragraph);
        parragraph.id = "turnos";
      }
      showStackOfMovementsInDiv(divId){
        var div = document.getElementById(divId);
        var divAux = document.createElement("div");
        var lastDiv = document.getElementById("last");

        this.moveTracer.forEach(element=>{
          var node = document.createTextNode(element.drawPos+"===>"+element.matrixPos);
          var p = document.createElement("p");
          p.appendChild(node);
          divAux.appendChild(p);
        })
        div.replaceChild(divAux,lastDiv);
        divAux.id = 'last';
      }
      
}

//Audio zone
var sounds = [
  new Audio("sounds/niceone.mp3"),
  new Audio("sounds/good.ogg"),
  new Audio("sounds/loveit.ogg")
];
function playAudio() { 
  var sound = sounds[Math.floor(Math.random() * sounds.length)];
  sound.pause();
  sound.currentTime = 0.36;
  sound.play();
} 


