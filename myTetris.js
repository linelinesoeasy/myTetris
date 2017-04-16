var shapeLen = 20
var gameHeight = 600
var gameWidth = 400
var beginX = 300
var beginY = 1
var arrStat = new Array();
var left = document.getElementById("left");
var right = document.getElementById("right");
var faster = document.getElementById("faster");
var rotate = document.getElementById("rotate");
var pause = document.getElementById("pause");
var fallTime = 300;
var shapeStat = 0;
var begin = {};
var shape = 0;
var timer = 0;
var flag = true;
var shapeColor = {
  0: "yellow",
  1: "pink",
  // 2: "black",
  2: "MediumSpringGreen",
  3: "MediumPurple",
  4: "LightGrey"
}
var TNext = {
  0:statT0,
  1:statT1,
  2:statT2,
  3:statT3
}
var RectNext = {
  0:statR1,
  1:statR2,
  2:statR1,
  3:statR2
}
var HNext = {
  0:statH1,
  1:statH2,
  2:statH1,
  3:statH2
}
var LNext = {
  0: statL1,
  1: statL2,
  2: statL3,
  3: statL4
}
var nextStat = {
  0:JudgeTNext,
  1:JudgeSNext,
  2:JudgeRectNext,
  3:JudgeHNext,
  4:JudgeLNext
}

var arrStatAll = {
  0:setArrStatByT,
  1:setArrStatByS,
  2:setArrStatByRect,
  3:setArrStatByH,
  4:setArrStatByL
}

var arrStatT  = {
  0:arrStatT0,
  1:arrStatT1,
  2:arrStatT2,
  3:arrStatT3
}

var arrStatRect = {
  0:arrStatRect1,
  1:arrStatRect2,
  2:arrStatRect1,
  3:arrStatRect2
}

var arrStatH = {
  0:arrStatH1,
  1:arrStatH2,
  2:arrStatH1,
  3:arrStatH1
}

var arrStatL = {
  0:arrStatL0,
  1:arrStatL1,
  2:arrStatL2,
  3:arrStatL3
}

var JudgeBotEdge = {
  0:JudgeTBottomEdge,
  1:JudgeSBottomEdge,
  2:JudgeRectBottomEdge,
  3:JudgeHBottomEdge,
  4:JudgeLBottomEdge
}

var rotateShape = {
  0:rotatT,
  2:rotatRect,
  3:rotateH,
  4:rotateL
}

var LClick = {
  0:JudgeTL,
  1:JudgeSL,
  2:JudgeRectL,
  3:JudgeRectL,
  4:JudgeLL
}
var RClick = {
  0:JudgeTR,
  1:JudgeSR,
  2:JudgeRectR,
  3:JudgeHR,
  4:JudgeLR
}
function initArea(){
  var canvas = document.getElementById('gameArea');
  canvas.height = document.body.clientHeight;
  canvas.width = 1000;
  cxt = gameArea.getContext("2d");
  cxt.translate(beginX, beginY);
  cxt.lineWidth = 4;
  cxt.strokeStyle = 'SeaGreen';
  cxt.moveTo(0, 0);
  cxt.lineTo(0, gameHeight);
  cxt.lineTo(gameWidth,gameHeight);
  cxt.lineTo(gameWidth,0);
  cxt.stroke();
}

function initStatArr(){
  for(var i = 0; i< Math.round(gameHeight/shapeLen); ++i){
    arrStat[i] = new Array();
    for(var j = 0; j< Math.round(gameWidth/shapeLen); ++j){
      arrStat[i][j] = {
        value: 0,
        color: 'white'
      };
    }
  }
}

function drawArea(){
    cxt.beginPath()
    for(var i = 0; i < Math.round(Math.max(arrStat.length, arrStat[0].length)); ++i){
      var w = (i+1)*shapeLen;
      cxt.strokeStyle = 'white';
      if(w < gameHeight){
        cxt.moveTo(0, w)
        cxt.lineTo(gameWidth, w);
      }
      if(w < gameWidth){
        cxt.moveTo(w, 0);
        cxt.lineTo(w, gameHeight);
      }
    }
    cxt.stroke();
}

function statT0(x, y){
  if(y + 1 >= arrStat.length ||arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 1][x - 1].value ==1|| arrStat[y + 1][x + 1].value == 1)
    return false;
  return true;
}
function statT1(x, y){
  if(y + 2 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 2][x].value ==1|| arrStat[y + 1][x + 1].value==1)
    return false;
  return true;
}

function statT2(x, y){
  if(y + 1 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y][x - 1].value == 1 || arrStat[y][x + 1].value ==1 || arrStat[y + 1][x].value == 1)
    return false;
  return true;
}

function statT3(x, y){
  if(y + 2 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 2][x].value ==1|| arrStat[y + 1][x - 1].value == 1)
    return false;
  return true;
}

function JudgeTNext(x, y){
  var TNextF = TNext[shapeStat];
  return TNextF(x, y);
}

function statS(x, y){
  if(y + 1 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y][x + 1].value == 1 || arrStat[y + 1][x + 1].value  == 1)
    return false;
  return true;
}
function JudgeSNext(x, y){
    return statS(x, y);
}
function statR1(x, y){
  if(y + 3 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 2][x].value == 1 || arrStat[y + 3][x].value == 1)
    return false;
  return true;
}
function statR2(x, y){
  if(y >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y][x - 1].value == 1 || arrStat[y][x - 2].value == 1 || arrStat[y][x + 1].value == 1)
    return false;
  return true;
}

function JudgeRectNext(x, y){
  var RectNextF = RectNext[shapeStat];
  return RectNextF(x, y);
}
function statH1(x, y){
  if(y + 2 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 1][x + 1].value == 1 || arrStat[y + 2][x + 1].value == 1)
    return false;
  return true;
}
function statH2(x, y){
  if(y + 1 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y][x + 1].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 1][x - 1].value == 1)
    return false;
  return true;
}

function JudgeHNext(x, y){
  var HNextF = HNext[shapeStat];
  return HNextF(x, y);
}
function statL1(x, y){
  if(y + 2 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 2][x].value == 1 || arrStat[y + 2][x + 1].value == 1 )
    return false;
  return true;
}
function statL2(x, y){
  if(y + 1 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y][x + 1].value == 1 || arrStat[y][x + 2].value == 1)
    return false;
  return true;
}
function statL3(x, y){
  if(y + 2 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y][x + 1].value == 1 || arrStat[y + 1][x + 1].value == 1 || arrStat[y + 2][x + 1].value == 1)
    return false;
  return true;
}
function statL4(x, y){
  if(y + 1 >= arrStat.length || arrStat[y][x].value == 1 || arrStat[y + 1][x].value == 1 || arrStat[y + 1][x - 1].value == 1 || arrStat[y + 1][x - 2].value == 1)
    return false;
  return true;
}

function JudgeLNext(x, y){
  var LNextF =  LNext[shapeStat];
  return LNextF(x, y);
}

function JudgeNextStat(x, y){
  var nextStatF = nextStat[shape];
  return nextStatF(x, y);
}

function arrStatT0(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 1][y - 1].value = 2;
  arrStat[x + 1][y + 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 1][y - 1].color = shapeColor[shape];
  arrStat[x + 1][y + 1].color = shapeColor[shape];
}
function arrStatT1(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 2][y].value = 2;
  arrStat[x + 1][y + 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 2][y].color = shapeColor[shape];
  arrStat[x + 1][y + 1].color = shapeColor[shape];
}

function arrStatT2(x, y){
  arrStat[x][y].value = 2;
  arrStat[x][y - 1].value = 2;
  arrStat[x][y + 1].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x][y - 1].color = shapeColor[shape];
  arrStat[x][y + 1].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
}

function arrStatT3(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 2][y].value = 2;
  arrStat[x + 1][y - 1].value =2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 2][y].color = shapeColor[shape];
  arrStat[x + 1][y - 1].color = shapeColor[shape];
}

function setArrStatByT(x, y){
  var arrStatTF = arrStatT[shapeStat]
  arrStatTF(x, y);
}

function setArrStatByS(x, y){
    arrStat[x][y].value = 2;
    arrStat[x + 1][y].value = 2;
    arrStat[x][y + 1].value = 2;
    arrStat[x + 1][y + 1].value = 2;
    arrStat[x][y].color = shapeColor[shape];
    arrStat[x + 1][y].color = shapeColor[shape];
    arrStat[x][y + 1].color = shapeColor[shape];
    arrStat[x + 1][y + 1].color = shapeColor[shape];
}

function arrStatRect1(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 2][y].value = 2;
  arrStat[x + 3][y].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 2][y].color = shapeColor[shape];
  arrStat[x + 3][y].color = shapeColor[shape];
}
function arrStatRect2(x, y){
  arrStat[x][y].value = 2;
  arrStat[x][y - 1].value = 2;
  arrStat[x][y - 2].value = 2;
  arrStat[x][y + 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x][y - 1].color = shapeColor[shape];
  arrStat[x][y - 2].color = shapeColor[shape];
  arrStat[x][y + 1].color = shapeColor[shape];
}

function setArrStatByRect(x, y){
  var arrStatRectF = arrStatRect[shapeStat];
  arrStatRectF(x, y);
}

function arrStatH1(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 1][y + 1].value = 2;
  arrStat[x + 2][y + 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 1][y + 1].color = shapeColor[shape];
  arrStat[x + 2][y + 1].color = shapeColor[shape];
}

function arrStatH2(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x][y + 1].value = 2;
  arrStat[x + 1][y - 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x][y + 1].color = shapeColor[shape];
  arrStat[x + 1][y - 1].color = shapeColor[shape];
}

function setArrStatByH(x, y){
  var arrStatHF = arrStatH[shapeStat];
  arrStatHF(x, y);
}

function arrStatL0(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 2][y].value = 2;
  arrStat[x + 2][y + 1].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 2][y].color = shapeColor[shape];
  arrStat[x + 2][y + 1].color = shapeColor[shape];
}

function arrStatL1(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x][y + 1].value = 2;
  arrStat[x][y + 2].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x][y + 1].color = shapeColor[shape];
  arrStat[x][y + 2].color = shapeColor[shape];
}

function arrStatL2(x, y){
  arrStat[x][y].value = 2;
  arrStat[x][y + 1].value = 2;
  arrStat[x + 1][y + 1].value = 2;
  arrStat[x + 2][y + 1].value =2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x][y + 1].color = shapeColor[shape];
  arrStat[x + 1][y + 1].color = shapeColor[shape];
  arrStat[x + 2][y + 1].color = shapeColor[shape];
}

function arrStatL3(x, y){
  arrStat[x][y].value = 2;
  arrStat[x + 1][y].value = 2;
  arrStat[x + 1][y - 1].value = 2;
  arrStat[x + 1][y - 2].value = 2;
  arrStat[x][y].color = shapeColor[shape];
  arrStat[x + 1][y].color = shapeColor[shape];
  arrStat[x + 1][y - 1].color = shapeColor[shape];
  arrStat[x + 1][y - 2].color = shapeColor[shape];
}

function setArrStatByL(x, y){
  var arrStatLF = arrStatL[shapeStat];
  arrStatLF(x, y)
}

function setArrStatTo2(){
  var arrStatAllF = arrStatAll[shape];
  arrStatAllF(begin.y, begin.x);
}

function clearSquar(){
  for(var i = 0; i < arrStat.length; ++i){
    for(var j = 0; j < arrStat[0].length; ++j){
        if(arrStat[i][j].value == 2 || arrStat[i][j].value == 0){
            cxt.beginPath();
            cxt.clearRect(j*shapeLen, i*shapeLen, shapeLen, shapeLen);
        }
    }
  }
}

function clearArrStat(){
  for(var i = 0; i < arrStat.length; ++i){
    for(var j = 0; j < arrStat[0].length; ++j){
        if(arrStat[i][j].value == 2){
            arrStat[i][j].value = 0;
        }
    }
  }
}

function setArrStatTo1(){
  for(var i = 0; i < arrStat.length; ++i){
    for(var j = 0; j < arrStat[0].length; ++j){
        if(arrStat[i][j].value == 2){
            arrStat[i][j].value = 1;
            arrStat[i][j].color = shapeColor[shape];
        }
    }
  }
}

function JudgeGameOver(){
  for(var i = 0; i< arrStat[0].length; ++i)
    if(arrStat[0][i].value == 1)
      return true;
  return false;
}

function clearFallStat(){
  clearInterval(timer);
  setArrStatTo1();
  geneShape();
}

function JudgeTBottomEdge(){
  if(shapeStat == 0 || shapeStat == 2){
    if(begin.y > arrStat.length - 2)
      clearFallStat();
  }else
  {
    if(begin.y > arrStat.length - 3)
      clearFallStat();
  }
}

function JudgeSBottomEdge(){
  if(begin.y > arrStat.length -2)
      clearFallStat();
}

function JudgeRectBottomEdge(){
  if(shapeStat == 0 || shapeStat == 2){
    if(begin.y > arrStat.length - 4)
      clearFallStat();
  }else{
    if(begin.y > arrStat.length - 1)
      clearFallStat();
  }
}

function JudgeHBottomEdge(){
  if(shapeStat == 0 || shapeStat == 2){
    if(begin.y > arrStat.length - 3)
      clearFallStat();
  }else{
    if(begin.y > arrStat.length - 2)
      clearFallStat();
  }
}

function JudgeLBottomEdge(){
  if(shapeStat == 0 || shapeStat == 2){
    if(begin.y> arrStat.length - 3)
      clearFallStat();
  }else{
    if(begin.y > arrStat.length - 2)
      clearFallStat();
  }
}

function JudgeBottomEdge(){
  var JudgeF = JudgeBotEdge[shape];
  JudgeF();
}

function JudgeEdge(){
  if(JudgeNextStat(begin.x, begin.y + 1)){
    begin.y++;
    JudgeBottomEdge();
  }else{
    clearInterval(timer);
    setArrStatTo1();
    if(JudgeGameOver()){
      alert("gameover")
    }
    else{
      geneShape();
      reduceSquar();
    }
  }
}

function JudgeTL(x, y){
    if(shapeStat == 0){
      if((x - 1) < 0 || !statT0(x, y))
        return false;
    }
    else if(shapeStat == 1){
      if(x < 0 || !statT1(x, y))
        return false;
    }
    else if(shapeStat == 2){
      if((x-1)<0 || !statT2(x, y))
        return false;
    }
    else{
      if((x-1)<0|| !statT3(x, y))
        return false;
    }
    return true;
}

function JudgeTR(x, y){
  if(shapeStat == 0){
    if((x + 1) > arrStat[0].length -1 || !statT0(x, y))
      return false;
  }else if(shapeStat == 1){
    if((x + 1) > arrStat[0].length -1|| !statT1(x, y))
      return false;
  }else if(shapeStat == 2){
    if((x + 1) > arrStat[0].length -1 || !statT2(x, y))
      return false;
  }else{
    if(x > arrStat[0].length -1|| !statT3(x, y))
      return false;
  }
  return true;
}

function JudgeSL(x, y){
  if(x < 0|| !statS(x, y))
    return false;
  return true;
}

function JudgeSR(x, y){
  if( (x + 1) > arrStat[0].length -1 || !statS(x, y))
    return false;
  return true;
}

function JudgeRectL(x, y){
  if(shapeStat == 0 || shapeStat == 2){
    if( x < 0 || !statR1(x, y))
      return false;
  }else{
    if((x-2) < 0 || !statR2(x, y))
      return false;
  }
  return true;
}

function JudgeRectR(x, y){
  if(shapeStat == 0 || shapeStat == 2){
    if( x > arrStat[0].length - 1 || !statR1(x, y))
      return false;
  }else{
    if( (x+1) > arrStat[0].length - 1 || !statR2(x, y))
      return false;
  }
  return true;
}

function JudgeHL(x, y){
  if(shapeStat == 0 || shapeStat == 2){
    if( x < 0 || !statH1(x, y))
      return false;
  }else{
    if((x-1) < 0 || !statH2(x, y))
      return false;
  }
  return true;
}

function JudgeHR(x, y){
  if(shapeStat == 0 || shapeStat == 2){
    if((x + 1) > arrStat[0].length -1 || !statH1(x, y))
      return false;
  }else{
    if((x + 1) > arrStat[0].length -1 || !statH2(x, y))
      return false;
  }
  return true;
}

function JudgeLL(x, y){
  if(shapeStat == 0){
    if( x < 0 || !statL1(x, y))
      return false;
  }else if(shapeStat == 1){
    if( x < 0 || !statL2(x, y))
      return false;
  }else if(shapeStat == 2){
    if(x < 0 || !statL3(x, y))
      return false;
  }else{
    if( (x - 2) < 0 || !statL4(x, y))
      return false;
  }
  return true;
}

function JudgeLR(x, y){
  if(shapeStat == 0){
    if( (x + 1) > arrStat[0].length - 1 || !statL1(x, y))
      return false;
  }else if(shapeStat == 1){
    if( (x + 2) > arrStat[0].length - 1 || !statL2(x, y))
      return false;
  }else if(shapeStat == 2){
    if((x + 1) > arrStat[0].length - 1 || !statL3(x, y))
      return false;
  }else{
    if( x > arrStat[0].length - 1 || !statL4(x, y))
      return false;
  }
  return true;
}

function JudgeL(){
  var LClickF = LClick[shape];
  return LClickF(begin.x - 1, begin.y);
}


function JudgeR(){
  var RClickF = RClick[shape];
  return RClickF(begin.x + 1, begin.y);
}

function lClick(){
    if(JudgeL()){
      begin.x--;
    }
}

function rClick(){
    if(JudgeR()){
      begin.x++;
    }
}

function rotatT(){
  if(shapeStat == 0){
    return statT1(begin.x, begin.y + 1);
  }else if(shapeStat == 1){
    return ((begin.x-1) >= 0) && statT2(begin.x, begin.y + 1);
  }else if(shapeStat == 2){
    return statT3(begin.x, begin.y);
  }else{
    return ((begin.x + 1) < arrStat[0].length) && statT0(begin.x, begin.y);
  }
}

function rotatRect(){
  if(shapeStat == 0 || shapeStat == 2)
    return ((begin.x + 1) < arrStat[0].length) && ((begin.x - 2) >= 0) && statR2(begin.x, begin.y + 1);
  else{
    return statR1(begin.x, begin.y + 1);
  }
}

function rotateH(){
  if(shapeStat == 0 || shapeStat ==2){
    return ((begin.x -1) >= 0) && statH2(begin.x, begin.y)
  }else{
    return statH1(begin.x, begin.y);
  }
}

function rotateL(){
  if(shapeStat == 0)
    return ((begin.x+2) < arrStat[0].length) && statL2(begin.x, begin.y + 1);
  else if(shapeStat == 1)
    return statL3(begin.x, begin.y + 1);
  else if(shapeStat == 2){
    return ((begin.x - 2) >= 0) && statL4(begin.x + 1, begin.y);}
  else
    return ((begin.x + 1) < arrStat.length) && statL1(begin.x, begin.y + 1);
}

function rotatClock(){
  var rotateShapeF = rotateShape[shape];
  if(shape == 1){
    return true;
  }else{
    return rotateShapeF();
  }
}

function clearLine(deleteLineCount, ind) {
  for(var i = arrStat.length - 1, j = arrStat.length - 1; i >= ind; i--, j--){
    while(deleteLineCount.indexOf(j) >= 0) {
      for(var k = 0; k < arrStat[j].length; ++k)
        arrStat[j][k].value == 0;
      j--;
    }
    if (j < ind) {
      for(var k = 0; k < arrStat[0].length; ++k)
        arrStat[i][k].value = 0
    } else {
      for(var k = 0; k < arrStat[0].length; ++k)
        arrStat[i][k].value = arrStat[j][k].value;
    }
  }
}

function searchInd(){
  for(var i = 0; i < arrStat.length; ++i){
    for(var j = 0; j < arrStat[0].length; ++j){
      if(arrStat[i][j].value == 1){
         ind = i;
         return ind;
      }
    }
  }
}

function reduceSquar(){
  var deleteLineCount = [];
  for(var i = 0; i < arrStat.length; ++i){
    for(var j = 0; j < arrStat[i].length; ++j){
      if (arrStat[i][j].value !== 1) {
        break;
      }
    }
    if (j === arrStat[0].length) {
      deleteLineCount.push(i);
    }
  }
  clearLine(deleteLineCount, 0);
}

function geneShape(){
    shape = Math.round(Math.random()*10)%5;
    begin.x = Math.round(arrStat[0].length/2);
    begin.y = 0;
    timer = setInterval(function(){
    if(flag){
      clearSquar();
      clearArrStat();
      setArrStatTo2();
      drawSquar();
      drawArea();
      JudgeEdge();
    }
  }, fallTime);
}

document.onkeydown = function(event){
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode == 37)
    lClick();
  if(e && e.keyCode == 38)
    if(rotatClock()){
      shapeStat++;
      shapeStat %= 4;
    }
  if(e && e.keyCode == 39)
    rClick();
  if(e && e.keyCode == 40){
    if(JudgeNextStat(begin.x, begin.y + 1))
      begin.y++;
  }
}

left.onclick = function(){
  lClick();
}

right.onclick = function(){
  rClick();
}

faster.onclick = function(){
  if(JudgeNextStat(begin.x, begin.y + 1))
    begin.y++;
}

pause.onclick = function(){
  flag = !flag;
  if(pause.innerHTML == "pause")
    pause.innerHTML = "go";
  else
    pause.innerHTML = "pause";
}

rotate.onclick = function(){
  if(rotatClock()){
    shapeStat++;
    shapeStat %= 4;
  }
}

function drawS(x, y, color){
  cxt.beginPath();
  cxt.fillStyle = color;
  cxt.fillRect(x * shapeLen, y * shapeLen, shapeLen, shapeLen);
  cxt.stroke()
}

function drawSquar(){
    for(var i = 0; i < arrStat.length; ++i){
      for(var j = 0; j < arrStat[0].length; ++j){
          if(arrStat[i][j].value == 2 || arrStat[i][j].value == 1){
              drawS(j, i, arrStat[i][j].color);
          }
      }
    }
}

initStatArr()
initArea()
drawArea()
geneShape()
