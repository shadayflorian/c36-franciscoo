var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

// Función para configurar el ambiente inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, console.log("error"));
  textSize(20); 
}

// Función para mostrar UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    // Agrega la animación del globo [usa balloonImage2]
    //comentario; Habias escrito change animation
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    // Agrega la animación del globo [usa balloonImage2]
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    // Agrega la animación del globo [usa balloonImage2]
    balloon.addAnimation("hotAirBalloon",balloonImage2)
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    // Agrega la animación del globo [usa balloonImage2]
    balloon.addAnimation("hotAirBalloon",balloonImage2)
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Usa las flechas del teclado para mover el globo aerostático!",40,40);

}


function updateHeight(x,y){
  //RECUERDA QUE PARA HACER REFERENCIA A UN VALOR EXACTO DE LA 
  //BASE DE DATOS SOLO NECESITAMOS COLOCAR EL DATO PRINCIPAL, ES DECIR
  //EL SLASH ANTES DE BALLON ESTA INCORRECTO PARA ESTE CASO
  //ADEMAS PARA ACTUALIZAR UN DATO EN PARTICULAR UTILIZAMOS SET
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
  // Asigna el valor de "data" como la altura
  // Asigna el valor de "X" e "y" de la altura a las posiciones "x" e "y" respectivas del globo

//COMNETARIO: FALTABA AGREGAR LOS PARENTESIS A VAL
  height = data.val()
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
  console.log("Error la escribir en la base de datos");
}
