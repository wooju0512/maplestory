const display = document.getElementById('display');
const ctx = display.getContext('2d');
var player_exp=0;
var max_exp=10;

var right_potal=new Image();
right_potal.src='./img/potal.png';


var specking=false;


var map = 1;

var first_npc=new Image();
first_npc.src='./img/npc.png';


var player = new Image();
player.src='./img/character.png';
var player_x=700;
var player_y=400;
var player_add_x=0;
var player_add_y=0;
var player_png_x=0;
var player_png_y=0;
var player_png_end_x=88.3;
var player_see='left';
var player_level=1;
var player_hp=180;
var player_max_hp=180;
var player_mp=180;
var player_max_mp=180;

var background = new Image();
background.src='./img/tiles.png';

var background1 = new Image();
background1.src='./img/background.png'

var deco = new Image();
deco.src='./img/backlayer.png';

var attacking = false;
var jumping = false;
var double_jumping = false;

var orange_mush = new Image();
orange_mush.src='./img/monster.png';
var monster_x=130;
var monster_y=360;
var monster_hp=50;
var monster_live=true;
var first_quest_cnt=0;
function sleep(t){
    return new Promise(resolve=>setTimeout(resolve,t));
 }
var skill_x=player_x-100;
var skill_y=player_y-40;
var skill1 = new Image();
skill1.src='./img/skill.png'; 
var skill1_use=false;
var skill1_png_x=750
 function Skill1(){
     if(player_see=='left'){
     var skill_first_x=player_x-100;
     var skill_first_y=player_y-40;   
        ctx.drawImage(skill1,skill1_png_x,170,150,150,skill_x,skill_y,150,150);
     }
 }


var first_quest="?";
var first_questing="false";
var first_quest_can=false;
var quest_text='';
 function Draw_npc(){
     ctx.fillStyle="white"
     ctx.fillRect(211,360,30,30)
     ctx.fillStyle="red";
     ctx.font="20px 궁서";
     if(quest_have){
         first_quest='!';
     }
     ctx.fillText(first_quest,220,380);
    ctx.drawImage(first_npc,0,0,50,100,200,380,50,100);
    if(specking==true){
        if(first_quest_cnt>=5){
            quest_text='O';
            ctx.fillStyle="white";
            ctx.fillRect(300,150,700,250);
            ctx.fillStyle="skyblue";
            ctx.fillRect(745,160,250,230);
            specking=true;
            ctx.drawImage(first_npc,0,0,50,100,800,180,100,200);
            ctx.fillStyle="red";
            ctx.font="20px 고딕";
            ctx.fillText('수고했어.',300,300);
            if(quest_choose=='Y'){
                player_exp+=1500;
                specking=false;
                quest_text='?';
                first_quest_cnt=0;
                quest_choose='a';
            }
            else if(quest_choose=='N'){
                specking=false;
                quest_text='!';
                quest_choose='n';
            }
        }
        else{
            ctx.fillStyle="white";
            ctx.fillRect(300,150,700,250);
            ctx.fillStyle="skyblue";
            ctx.fillRect(745,160,250,230);
            specking=true;
            ctx.drawImage(first_npc,0,0,50,100,800,180,100,200);
            ctx.fillStyle="red";
            ctx.font="20px 고딕";
            ctx.fillText('주황버섯 5마리만 죽여와 ㅆㅂㄹㅇ',300,300);
            if(quest_choose=='Y'){
                specking=false;
                quest_text='주황버섯 5마리 잡아오기.';
                quest_choose='a';
            }
            else if(quest_choose=='N'){
                specking=false;
                
                quest_text='X';
                quest_choose='n';
            }
        }
    }
 }

function check_first_quest(){

    if(player_x<=350 && player_x>=50){
        first_quest_can=true;
    }
    else{
        first_quest_can=false;
    }

}

function Draw_Quest(){
    ctx.fillStyle="#787878"
    ctx.lineJoin = "round"
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#787878"
    ctx.strokeRect(1200,30,290,50);
    ctx.fillRect(1200,30,290,49);
    ctx.fillStyle="white"
    ctx.fillText('Q.',1210,50);
    ctx.fillText(quest_text,1230,50);
}

 var skill_bang = new Audio();
 skill_bang.volum=0.2;
 skill_bang.playbackRate=1.0;
 skill_bang.src="./audio/firecracker1.mp3";


function Draw_Player(){
    if(player_see=='left'){
        player.src='./img/character.png';
        ctx.drawImage(player,player_png_x,player_png_y,player_png_end_x,80,player_x,player_y+player_add_y,90,80);
    }
    if(player_see=='right'){
        player.src='./img/character2.png';
        ctx.drawImage(player,player_png_x,player_png_y,88.3,80,player_x,player_y+player_add_y,90,80);
    }
}
var right_potal_x=1300;
var right_potal_y=350;
function Draw_Potal(){
    ctx.drawImage(right_potal,0,1,600,800,right_potal_x,right_potal_y,300,300)
}

function Draw_Exp(){
    if(player_exp>=1500){
        max_exp*=1.5;
        player_exp=0;
        player_level++;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,715,1500,15); 
    ctx.fillStyle="lightgreen";
    ctx.fillRect(0,715,player_exp,15); 
}

var move_map_time=10000;
var moveing = false;


function Draw_Level(){
    ctx.fillStyle="#787878"
    ctx.lineJoin = "round"
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#787878"
    ctx.strokeRect(650,645,200,50);



    ctx.fillRect(650,645,200,35)
    
    ctx.fillStyle="white"
    ctx.fillRect(650,680,200,35)
    ctx.font="20px 궁서";
    ctx.fillStyle="#FFCD00"
    ctx.fillText('LV .',670,665);
    ctx.fillText(player_level,710,665);
    ctx.font="20px 고딕";
    ctx.fillStyle="white"
    if(map==1){
        ctx.fillText('모험가',740,668);
        ctx.fillText("<- -> : 이동 방향키",0,50);
        ctx.fillText("Ctrl    : 공격키",0,70);
        ctx.fillText("X       : 마나 체우는키",0,90);
        ctx.fillText("spacebar: 점프&더블점프",0,110);
    }
    if(map==2){
        ctx.fillText('q : 퀘스트 진행 버튼 (?를 띈 npc 주변에서 q를 누르자)',0,50);
        ctx.fillText('y : 퀘스트 수락 버튼',0,70);
        ctx.fillText('n : 퀘스트 거절 버튼',0,90);
    }
    ctx.font="14px 궁서";
    ctx.fillText(Math.floor(player_exp)+'/'+Math.floor(1500),730,728);
    ctx.fillStyle="red";
    ctx.font="25px 궁서";
    if(monster_live){
        ctx.fillStyle="#5D5D5D"
        ctx.fillRect(monster_x+15,monster_y,100,5);
        ctx.fillStyle="#FF4646"
        if(monster_hp*2<=0){
            monster_hp=0;
        }
        ctx.fillRect(monster_x+15,monster_y,monster_hp*2,5);
    }
    ctx.lineJoin = "round"
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white"
    ctx.strokeRect(650,678,200,37);
}

function Draw_Map(){
    if(map==1 || map==2){
        ctx.drawImage(deco,0,0,1500,500);
        for(var i=0;i<19;i++){
            for(var j=6;j<7;j++){
                ctx.drawImage(background1,11,80,80,30,i*80,j*78,90,30)
            }
            for(var j=6;j<7;j++){
                ctx.drawImage(background1,11,20,80,50,i*80,j*83,90,50)
            }
            for(var j=6;j<7;j++){
                ctx.drawImage(background1,11,20,80,70,i*80,j*91,90,80)
            }
            for(var j=6;j<7;j++){
                ctx.drawImage(background1,11,20,80,70,i*80,j*102,90,80)
            }
            for(var j=6;j<7;j++){
                ctx.drawImage(background1,11,20,80,60,i*80,j*108,90,73)
            }
        }
    } 
}
var play_cnt=0;
var monster_cnt=0;
function Draw_monster(){
    if(map==1)
            ctx.drawImage(orange_mush,monster_cnt*135,130,130,140,monster_x,monster_y,130,140); 
    if(map==2){
        monster_x=600;
        monster_y=350;
        ctx.drawImage(orange_mush,monster_cnt*135,130,130,140,monster_x,monster_y,130,140); 

    }           
}
var attack_cnt=0;
function Check_attack(){
    if(player_mp>0)
        player_mp-=1;
        if(monster_x<=player_x && monster_x+125>=player_x && player_see=='left'){
            attack_cnt++;
        }
        
        if(monster_x<=player_x+80 && monster_x+125>=player_x+80 && player_see=='right'){
            attack_cnt++;
        }
    
}

var skill1_go=false;

function Draw_HP(){
    ctx.fillStyle="#5D5D5D"
    ctx.fillRect(660,685,player_max_hp,10)
    ctx.fillStyle="#FF4646"
    ctx.fillRect(660,685,player_hp,10)


    ctx.fillStyle="#5D5D5D"
    ctx.fillRect(660,700,player_max_mp,10)
    ctx.fillStyle="#28A0FF"
    if(player_mp<=0){
        player_mp=0;
    }
    ctx.fillRect(660,700,player_mp,10)
}

function Draw_skill_gauge(){
    ctx.fillStyle="#5D5D5D"
    ctx.fillRect(650,630,200,10)
    ctx.fillStyle="#FF4646"
    ctx.fillRect(650,630,skill1_chazing*4,10)
    if(skill1_chazing*4==200)
        skill1_go=true;
}
var right_potal_move=false;
function Check_Potal(){
    if( right_potal_x+90>=player_x+40 &&player_x+40>=right_potal_x && player_y>=right_potal_y )
        right_potal_move=true;
    else{
        right_potal_move=false;
    }
}

function Play1(){
    Check_Potal();
    if(moveing==true){
        move_map_time-=100;
    }
    if(move_map_time==0){
        moveing=false;
        move_map_time=10000;
        if(map==1){
            map=2;
            player_x=100;
        }
    }
    if(monster_hp==0){
        monster_live=false;
        first_quest_cnt+=1;
        player_exp+=1500/max_exp;
        monster_hp=-1;
    }
    if(move_right==true){
        player_x+=0.5;
    }
    if(move_left==true){
        player_x-=0.5;
    }
    Draw_Map();
    if(monster_live==true){
        Draw_monster();
    }
    Draw_Exp();
    Draw_Level();
    Draw_HP();
    Draw_Potal();
    if(map==2){
        Draw_npc();
    }
    Draw_Quest();
    Draw_Player();
    check_first_quest()
    if(player_mp>0){
        Draw_skill_gauge();
    }
        if(skill_gauge==true)
        Skill1();
        if(skill1_go==true){
            skill1_chazing=0;
            if(monster_x<=skill_x && skill_x<=monster_x+70 && monster_live){
                skill1_go=false;
                monster_hp-=40;
                skill_x=player_x-100;
                skill_bang.play();
            }
            skill_x-=6;
        }
    if(play_cnt%15==0)
    monster_cnt++;
    if(monster_cnt>4){
        monster_cnt=0;
    }
    if(play_cnt%500==0 && monster_live==false){
        monster_hp=50;
        monster_live=true;
    }
    play_cnt++;
    if(move_map_time!=10000){
        ctx.fillStyle="black"
        ctx.fillRect(0,0,1500,800);
    }
}

setInterval(Play1,10);

var move_right=false;
var move_left=false;

function move(event){
    if(event.keyCode==37){
        move_left=true;
        move_right=false;
        player_x-=3;
        player_see='left';
    }
    if(event.keyCode==39){
        move_right=true;
        move_left=false;
        player_x+=3;
        player_see='right';
    }
}



function attack(){
    if(player_mp<1){
        return;
    }

    if(attacking==false && player_see=='left'){
        (async function(){
            attacking=true;
        player_png_x=0;
        player_png_y=100;
        Check_attack();
        await sleep(100);
        player_png_x=80;
        Check_attack();
        await sleep(100);
        player_png_x=160;
        Check_attack();
        await sleep(100);
        player_png_x=250;  
        Check_attack();
        await sleep(100);
        player_png_x=350;  
        Check_attack();
        await sleep(100);
        player_png_x=350;
        Check_attack();
        await sleep(100);
        player_png_x=0;
        player_png_y=0;
        attacking=false;
      })();
    
    }
    
    if(attacking==false && player_see=='right'){
        (async function(){
            attacking=true;
        player_png_x=0;
        player_png_y=100;
        Check_attack();
        await sleep(100);
        player_png_x=763;
        Check_attack();
        await sleep(100);
        player_png_x=683;
        Check_attack();
        await sleep(100);
        player_png_x=593;  
        Check_attack();
        await sleep(100);
        player_png_x=493;  
        Check_attack();
        await sleep(100);
        player_png_x=393;
        Check_attack();
        await sleep(100);
        player_png_x=0;
        player_png_y=0;
        attacking=false;
      })();
    }
    if(attack_cnt>0){
        monster_hp-=10;
    }
    attack_cnt=0;
}
var jump_cnt=0;

function jump(){
    jump_cnt+=1;
    if(jumping==false){
            if(move_left == false && move_right == false){
                (async function(){
                    jumping=true;
                player_y-=10;
                await sleep(50);
                player_y-=20;
                await sleep(60);
                player_y-=30;
                await sleep(70);
                player_y+=30;
                await sleep(60);
                player_y+=20;
                await sleep(50);
                player_y+=10;
                jumping=false;
            })();
        }  
        else if(move_right==true && move_left==false){
            (async function(){
                jumping=true;
            player_y-=10;
            player_x+=5;
            await sleep(50);
            player_y-=20;
            player_x+=6;
            await sleep(60);
            player_y-=30;
            player_x+=7;
            await sleep(70);
            player_y+=30;
            player_x+=7;
            await sleep(60);
            player_y+=20;
            player_x+=6;
            await sleep(50);
            player_y+=10;
            player_x+=5;
            jumping=false;
        })();
        } 

        else if(move_right==false && move_left==true){
            (async function(){
                jumping=true;
            player_y-=10;
            player_x-=5;
            await sleep(50);
            player_y-=20;
            player_x-=6;
            await sleep(60);
            player_y-=30;
            player_x-=7;
            await sleep(70);
            player_y+=30;
            player_x-=7;
            await sleep(60);
            player_y+=20;
            player_x-=6;
            await sleep(50);
            player_y+=10;
            player_x-=5;
            jumping=false;
        })();
        } 
    }
    if(jump_cnt%2==0&& double_jumping==false && move_right){
        (async function(){
            double_jumping=true;
        player_y-=20;
        player_x+=20;
        await sleep(50);
        player_y-=30;
        player_x+=20;
        await sleep(60);
        player_y-=40;
        player_x+=20;
        await sleep(70);
        player_y+=40;
        player_x+=20;
        await sleep(60);
        player_y+=30;
        player_x+=20;
        await sleep(50);
        player_y+=20;
        player_x+=20;
        double_jumping=false;
        jump_cnt=0;
    })();
}
    else if(jump_cnt%2==0&& double_jumping==false && move_left){
            (async function(){
                double_jumping=true;
            player_y-=20;
            player_x-=20;
            await sleep(50);
            player_y-=30;
            player_x-=20;
            await sleep(60);
            player_y-=40;
            player_x-=20;
            await sleep(70);
            player_y+=40;
            player_x-=20;
            await sleep(60);
            player_y+=30;
            player_x-=20;
            await sleep(50);
            player_y+=20;
            player_x-=20;
            double_jumping=false;
            jump_cnt=0;
        })();
    }
    else if(jump_cnt%2==0&& double_jumping==false && move_left==false && move_right==false){
            (async function(){
                double_jumping=true;
            player_y-=20;
            await sleep(50);
            player_y-=30;
            await sleep(60);
            player_y-=40;
            await sleep(70);
            player_y+=40;
            await sleep(60);
            player_y+=30;
            await sleep(50);
            player_y+=20;
            double_jumping=false;
            jump_cnt=0;
        })();
    }
}

function mp_up(){
    player_png_x=625;
    player_png_y=790;
    player_png_end_x=67;
    if(play_cnt%5==0 && player_mp<player_max_mp){
        player_mp+=2;
    }
}
var quest_choose='?';
var quest_have=false;
var skill1_chazing=0;
var skill_gauge = false;
$(document).keydown(function(event) {
    if(specking==true){
        if(event.keyCode==89){
            quest_choose='Y';
            quest_have=true;
        }
        if(event.keyCode==78){
            quest_choose='N';
            quest_have=false;
        }
    }
            else{
            if(event.keyCode==16){
                skill_gauge=true;
                skill1_chazing++;
                if(skill1_chazing<50 && skill1_chazing>5)
                player_mp--;
                if(player_mp<=10){
                    skill_gauge=false;
                    skill_go=false;
                    return;
                }
                if(skill1_chazing>10){
                    skill1_png_x=650
                }
                if(skill1_chazing>20){
                    skill1_png_x=500
                }
                if(skill1_chazing>40){
                    skill1_png_x=0
                }
                if(skill1_chazing>50){
                    skill1_use=true;
                    skill1_chazing=0;
                    skill1_png_x=750;
                    skill_gauge=false;
                }
            }
            if(event.keyCode==17){
                if(!specking)
                    attack();
            }
            if(event.keyCode==32){
                if(!specking)
                    jump();
            }
            if(player_png_end_x==88.3)
                if(!specking)
                    move(event);
            if(event.keyCode==88){
                mp_up();
            }
            if(first_quest_can && event.keyCode==81 && map==2){
                specking=true;
            }
            else{
                specking=false;
            }
        }
  });

  $(document).keyup(function(event) {
      if(specking==true)
        return;
      if(event.keyCode==16){
          skill_x=player_x-100;
          skill1_chazing=0;
          skill_gauge=false;
      }
      if(right_potal_move && event.keyCode==38)
      {
        moveing=true;
      }
    if(move_left==true && event.keyCode==37){
        move_left=false;
    }

    if(move_right==true && event.keyCode==39){
        move_right=false;
    }
    if(event.keyCode==88){
        player_png_x=0;
        player_png_y=0;
        player_png_end_x=88.3
    }
  });




