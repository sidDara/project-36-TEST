class Food{
    constructor(){
        this.image = loadImage("images/milk.png");
        this.foodStock;
        this.lastFed;
    }
    
    display(){
        var x =80;
        var y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);
        
        if(foodStock !== 0){
            for(var i = 0;i<this.foodStock;i++)
            {
                if(i%10 === 0)
                {
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    getFoodStock(){
        database.ref('Food').on("value",(data)=>{
            this.foodStock = data.val();
        })
    }

    updateFoodStock(food){
        database.ref('/').update({
            Food: food
        })
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }else{
            this.foodStock = 0
        }
    }

}
