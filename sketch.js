var dog,database,foods,bow,c=0,t=0;
var dg,hdg,s1,s2=0,s3=0,s4=0,ml,tb,bl,kit;
var ltfed,tri,time;
var b1,b2,n1,nm,gn;

function preload(){
   hdg=loadImage("happydog.png");
   dg=loadImage("Dog.png");
   ml=loadImage("Milk.png");
   tb=loadImage("wood2.png");
   bl=loadImage("bowlbg.png");
}

function setup() {
  createCanvas(600,600);
  database=firebase.database();
  dog=createSprite(450,400,100,100);
  dog.addImage(dg);
  dog.scale=0.3;
  dog.setCollider("rectangle",0,0,450,700);
  bow=createSprite(150,475,60,60);
  bow.addImage(bl);
  bow.scale=0.3;
  var dt,ft,nt;
  dt = database.ref('food');
  dt.on("value",readStock);
  ft = database.ref('feedTime');
  ft.on("value",readTime);
  nt=database.ref('name');
  nt.on("value",readname);

  b1=createButton("feed");
  b2=createButton("get food");
  n1=createButton("change");
  nm=createInput("new name");
  b1.position(475,535);
  b2.position(405,535);
  n1.position(245,565);
  nm.position(50,565);
  b1.mousePressed(feeddog);
  b2.mousePressed(gt);
  n1.mousePressed(cng);
}

function readStock(data){
  foods=data.val();
}

function readTime(data){
  ltfed=data.val();
}

function readname(data){
  gn=data.val();
}

function draw() {
  background(46,139,87);
  fill("black");
  if(tri!=null){
    image(tb,45,100,500,20);
    image(tb,45,200,500,20);
  }
  if((mouseOver(dog))&&foods!=0&&c==0){
      cursor('pointer');
  }else{cursor('default');}

  if(gn=="new"+" name"||gn=="name"||gn==undefined){
    gn="him";
  }
  if(foods!==undefined){
    if(t==0){tri=new Food(foods);t=1;}
    if(c==0){
      dog.x=450;bow.x=150;
      dog.addImage(dg);
      if(foods!=0){
        textSize(25);
        fill("orange");
        text("click to feed "+gn,350,275);
        if(mousePressedOver(dog)){
          feeddog();
        }
    }else{
      textSize(25);fill("orange");
      text("No food!",250,250);}
    if(keyDown("g")){gt();}
    }
  }
  if(ltfed!==undefined){
    fill("blue");
    var k,d;
    if(ltfed>12&&ltfed<=23){k=ltfed%12;d="pm";}
    else if(ltfed==12){k=12;d="pm";}
    else if(ltfed==0){k=12;d="am";}
    else{k=ltfed;d="am";}
    textSize(25);
    text("last fed: "+k+d,230,550);
  }
  if(c==1&&dog.x!=455){   
    if(kit!=null){    
      kit.x+=Math.round((90-kit.x)/10);kit.y+=Math.round((415-kit.y)/10);
      if((kit.x==95||kit.x==86)&&kit.y==411){
        if(kit.rotation<=120){
          kit.rotation+=15;
        }else{s2+=1;}
      }
      if((s2-s1)>=19){kit.destroy();kit=null;s2=0;}
    }else{
      bow.x+=Math.round((352-bow.x)/10);
      if(bow.x==348){
        dog.addImage(hdg);
        s3+=1;
      }
      if((s3-s4)>=19){dog.x=455;}
      }
    }
  if(dog.x==455){
    bow.x+=Math.round((145-bow.x)/10);
    if(bow.x==150){
      c=0;s3=0;
    }
  }
  drawSprites();
}

function writeStockTime(x,h){
  t=1;
  if(x>0){x--;
  }else{x=0;}
  database.ref('/').update({
    food:x,
    feedTime:h
  }) 
  return x;
}

function mouseOver(x){
  if((mouseX>=x.x-x.width/3.5&&mouseX<=x.x+x.width/3.5)&&(mouseY>=x.y-x.height/2.25&&mouseY<=x.y+x.height/2.25)){
    return true;
  }else{return false;}
}

function feeddog(){
  if(foods!=0&&c==0){
  time = hour();
  kit=tri.updateFoodStock(writeStockTime(foods,time));
  s1=1;
  c=1;
 }
}

function gt(){
  if(foods>=0&&foods<=19){
    foods++;
    tri.getFood();
   database.ref('/').update({
      food:foods
    })
  }
}

function cng(){
{
  gn=nm.value();
  database.ref('/').update({
    name:gn
  }) 
  }
}
