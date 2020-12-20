//Create variables here
var  dog, happyDog, database, foodS, foodStock;
var img1,img2;
function preload()
{
img1=loadImage("images/dogImg.png")
img2=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(img1);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  }
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(img2);
  }
  fill(255,255,254);
  textSize(15);
  if(lastFed>+12){
    text("Last Feed : "+lastFed%12 +"PM".350,350);
  }else if(lastFed==0){
    text("last feed : 12 AM",350,30);
  }else{
    text("last feed : "+lastFed + "AM",350)
  }
  }
  }
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
  readState=database.ref('gameState');
  readState.on("value",function(data)){
    gameState=data.val();
  });
}




