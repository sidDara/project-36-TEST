var dog, dogImage, happyDog, database, foodS, foodStock;
var feedButton, addFoodButton, fedTime, lastfed, foodObj;

function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dogImage = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(800, 800);
  
  dog = createSprite(250, 400, 30, 30);
  dog.addImage(dogImage);
  dog.scale = 0.2

  database = firebase.database();

  foodObj = new Food();

  foodS = foodObj.getFoodStock();

  feedButton = createButton("Feed Drago")
  feedButton.position(350, 40);
  //feedButton.mousePressed(feedDog())

  addFoodButton = createButton("Add Food")
  addFoodButton.position(370, 80);
  //addFoodButton.mousePressed(addFood())

  fedTime = database.ref('Fed Time')
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
}


function draw() {  
  background(46, 139, 87);

  drawSprites()

    fill("white")
    textSize(29)
    text("Food: " + foodS, 190, 160)

    foodObj.display();


    fill(255,255,254);
    textSize(15)
    if(fedTime >= 12){
      text("Last Fed: " + fedTime%12 + "PM", 390, 40)
    } else if(fedTime === 0){
      text("Last Fed: 12 AM", 390, 40);
    } else{
      text("Last Fed: " + fedTime + "AM", 390, 40)
    }
}

function addFood(){
  foodS = foodObj.getFoodStock()+1
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    //Food:foodObj.getFoodStock(),
    "Fed Time":hour()
  })
  foodObj.foodStock = foodObj.getFoodStock()
  foodObj.deductFood();
}


