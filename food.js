class Food{
    constructor(foodStock){
        this.foodStock=foodStock;
        this.ar=new Group();
        if(this.foodstock!=0){
            for(var i=1;i<=foodStock;i++){
                var x,y;
                if(i>10&&i!=10){
                    if(i==20){x=10;y=100;}
                    else{x=i%10;y=100;}
                }else{x=i;y=0;}
                var k= createSprite(x*50+20,80+y,5,5);
                k.addImage(ml);k.scale=0.125;
                this.ar.add(k);
            }
        }
    }
    getFood(){
    if(this.ar.size()!=0){
        var j=this.ar.get(this.ar.size()-1);
        if(j.x==520&&j.y==80){
            var q= createSprite(70,180,5,5);
            q.addImage(ml);q.scale=0.125;
            this.ar.add(q);
            }
        else{
            var q= createSprite(j.x+50,j.y,5,5);
            q.addImage(ml);q.scale=0.125;
            this.ar.add(q);           
        }
    }else if(this.ar.size()==0){
            var q=createSprite(70,80,5,5);
            q.addImage(ml);q.scale=0.125;
            this.ar.add(q);
        }
    }
    updateFoodStock(n){
        if(n>=0){
        var x=(this.ar.get(n));
        this.ar.remove(x);
        }
        return x;
    }
}


