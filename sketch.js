//link do vídeo da primeira fase: https://youtu.be/LM6jsIHjqlc
  //desing de fundo
let OST1,parado, bd, bd1, bd2, bdmenu, Font1, click;
  //objetos
let placain, dev, botao, dialogueBox;
let chao; // chao
let chaoy = 250; // altura chao
let chao2; // chao de baixo
let poschao = 300
let rectx = -800
  //fx personagem
let x=0; // local do heroi
let y=250; // posição referente altura do heroi
let w=40; // tamanho do personagem em altura
let z=50;
let ArrayHeroRight = []; // vetor do heroi para direita
let ArrayHeroLeft = []; // vetor heroi para esquerda
let ArrayMove = [];
let atraso1 = 0 // atraso do contador do vetor
let atraso2 = 0
let atraso3 = 0
let contHero = 0; // contador vetor do heroi
  //mecanicas
let tela = 0; // transição de telas
let contFase = 0; // definir qual tela do jogo
let cutSceneEnd = false
var jumpOn = false; // bool de pulo
let vidas = 3;
let morte = false
let grav = 4.1;
let força = 0.2;
let puloRange = 65;
let volum = 0.02
  //mobs
let atrasoMob = 0; 
let contMob = 0;
let ArrayMob = [];

function preload()
{
  //backgrounds
    bd = loadImage('backgrounds/background_layer_1.png');
    bd2 = loadImage('backgrounds/background_layer_2.png');
    bd3 = loadImage('backgrounds/background_layer_3.png');
    bdmenu = loadImage('backgrounds/Screenshot_10.png');
    bdopt = loadImage('backgrounds/Screenshot_11.png');
  //tiles
    chao = loadImage('tiles/chao3.png');
    chao2 = loadImage('tiles/chao4.png');
    ponte1 = loadImage('tiles/ponte1.png')
    ponte2 = loadImage('tiles/ponte2.png')
    ponte3 = loadImage('tiles/ponte3.png')
    ponte4 = loadImage('tiles/ponte4.png')
    ponte5 = loadImage('tiles/ponte5.png')
    agua1 = loadImage('tiles/agua1.png')
    agua2 = loadImage('tiles/agua2.png')
  //objetos
    placain = loadImage('objetos/sign.png');
    pedra1 = loadImage('objetos/rock_2.png');
    pedra2 = loadImage('objetos/rock_3.png');
    pedra3 = loadImage('objetos/rock_4.png');
    poste = loadImage('objetos/lamp.png');
    cerca = loadImage('objetos/fence_2.png');
    mineshaft = loadImage('objetos/Pit-Forest.png');
    bau = loadImage('objetos/chest.png');
    mato = loadImage('objetos/mato.png');
    flor = loadImage('objetos/flor.png')
    dialogueBox = loadImage('design/dialogueBox.png')
  //fontes
    Font1 = loadFont('fontes/Retro Gaming.ttf');
    Font2 = loadFont('fontes/8-bit Arcade In.ttf');
  //design
    click = loadSound('design/mouseclick.mp3');
    OST1 = loadSound('design/gameost (1).mp3');
    dev = loadImage('design/dev.jpg');
    botao = loadImage('design/botao.png');
  //personagem

    for(i=0;i<9;i++)
    {
      ArrayHeroRight[i] = loadImage('personagem/wright/walk' + i + '.png')
    }
    for(i=0;i<9;i++)
    {
      ArrayHeroLeft[i] = loadImage('personagem/wleft/wleft' + i + '.png')
    }
    ArrayMove = ArrayHeroRight.concat(ArrayHeroLeft)
  //mobs
    for(i=0;i<8;i++)
    {
      ArrayMob[i] = loadImage('mob/snail' + i + '.png')
    }
}
function setup() 
{
  createCanvas(400, 400);//taxa de atualização
  frameRate(60)//plano de fundo
  OST1.loop(); //Musica do menu em loop
  OST1.setVolume(volum); //volume da musica
}
  //animação de corrida
function draw()
{
    if(tela==0)
    {
      morte = false
        background(100, 108, 152);
        image(bdmenu, 0, 0, 400, 400);
        textFont(Font1);
        textSize(40)
        fill(255, 255, 255);
        text("DOWNFOREST", 45, 110)
    
    //Iniciar
        image(botao,150, 150, 100, 40)
        fill(0, 0, 0);
        textFont(Font1);
        textSize(12)
        text("Iniciar" , 172 , 175); 
    
    //Opcoes
        image(botao,150, 200, 100, 40)
        text("Opcoes" , 170 , 225); 
    
    //Creditos
        image(botao,150, 250, 100, 40)
        text("Creditos " , 165 , 275); 
     
    }    
  //tela da cutscene
    if(tela==1)
    {
      image(bd, 0, 0, 500, 400);
      //background2
      image(bd2, 0, 0, 500, 400);
      //background3
      image(bd3, 0, 0, 500, 400);

      // chão da cutscene
      for(i=0, j=0;i<10;i++)
      {
        image(chao,j, 300, 50, 50)
        j += 50
      }
      for(i=0, j=0;i<10;i++)
      {
        image(chao2,j, 350, 50, 50)
      j += 50
      }


      // personagem principal 
      image(ArrayMove[contHero],x, y, w, z)

      if(tela == 1 && x!=200)
      {
      atraso1++;
      if(atraso1 >= 7){
        atraso1 = 0;
        contHero++;
        if(contHero >= 7){
          contHero = 0
          
          }
        }
      }
      if(tela===1 && x<200)
      {
        x+=2
      }
      if(tela===1 && x == 200)
      {
        image(dialogueBox, 30, 270, 350, 100);
        textSize(10.5)
        fill(255, 255, 255);
        text("Droga! me perdi novamente na floresta."+'\n'+
        "Espero que eu consiga sair antes do anoitecer,"+'\n'+
        "e não acabe me perdendo floresta abaixo" , 43 , 320); 
      }
      if(cutSceneEnd == true)
        {
          if(tela === 1 && x<400)
          {
            x+=2
          }
        }

        if(x > 200)
        {
          rect(rectx, 0, 800, 400);
          if(rectx<200){
          rectx += 50

          }else
          {
          x = 30
          tela = 2
          }
        }
        fill(0, 0, 0)

    }
  //primeira fase
    if(tela==2){
  
      rect(0, chaoy, 400, 50)
    //background
      image(bd, 0, 0, 500, 400);
    //background2
      image(bd2, 0, 0, 500, 400);
    //background3
      image(bd3, 0, 0, 500, 400);
  
  
  
  
  
    //repetição do chao
      // chao baixo
      if(tela== 2){
      for(i=0, j=0;i<10;i++)
      {
        image(chao2,j, 350, 50, 50)
      j += 50
      }
      for(i=0, j=0;i<10;i++)
      {
        image(chao2,j, 310, 50, 50)
      j += 50
      }}
  
  
  
    //fase negativa
      if(contFase<1)
      {
          contFase=1
      }
    // objetos de fundo
      if(contFase==1)
      {
  
      //repetição do chao primeira metade
        for(let i=0, posChao1=300, j=0;i<4;i++)
        {
          image(chao,j, posChao1, 50, 50)
          j +=50
        }
      //repetição do chao segunda metade
        for(let i=0, posChao2=300, j=200;i<5;i++)
        {
          image(chao,j, posChao2, 50, 50)
          j +=50
        }
  
        image(mato, 320, 270, 60, 30)
        image(poste, 350, 230, 30, 70)
      }
  
      if(contFase==2)
      {
        //repetição do chao primeira metade
        for(let i=0, posChao1=300, j=0;i<7;i++)
        {
          image(chao,j, posChao1, 50, 50)
          j +=50
        }
        //repetição do chao segunda metad
        for(let i=0, posChao2=280, j=300;i<5;i++)
        {
          image(chao,j, posChao2, 50, 50)
          j +=50
        }
        image(pedra1, 340, 250, 30, 30)
        
        if(contFase==2 && x>270)
        {
          chaoy = 230
     
        }
        if(contFase==2 && x<270){
          chaoy=250
        }
  
      }
  
      if(contFase==3)
      {
      //repetição do chao primeira metade
        for(let i=0, posChao1=280, j=0;i<3;i++)
        {
          image(chao,j, posChao1, 50, 50)
          j +=50
        }
      //repetição do chao segunda metad
        for(let i=0, posChao2=300, j=150;i<5;i++)
        {
          image(chao,j, posChao2, 50, 50)
          j +=50
        }
  
        if(contFase==3 && x>135)
        {
          chaoy = 250
     
        }
        if(contFase==3 && x<135){
          chaoy=230
        }
      }
  
    //personagem
      image(ArrayMove[contHero],x, y, w, z)
      
    // animação de andar para direita
      if(keyIsDown(RIGHT_ARROW) && tela != 5){
        x += 3;
        if( x > width) {
          x = 30
          contFase += 1
        }
        atraso1++;
        if(atraso1 >= 5){
          atraso1 = 0;
          contHero++;
          if(contHero >= 8){
            contHero = 1
            
            }
          }
        }
    // animação de andar para esquerda
      if(keyIsDown(LEFT_ARROW) && tela != 5){
        x -= 3;
      if( x < 0) {
        x = 340
        contFase -= 1
      }
      atraso2++;
      if(atraso2 >= 5){
        atraso2 = 0;
        contHero++;
        if(contHero >= 18){
          contHero = 9
          
          }
        }
      }
    // deixar o personagem parado enquanto não anda
      if(keyIsDown(RIGHT_ARROW) != true && keyIsDown(LEFT_ARROW) != true){
        if(contHero < 9){
          contHero = 0
        }else if(contHero > 8){
          contHero = 9
        }
      }
  
    //pulo subida
      if(keyIsDown(UP_ARROW) && tela != 5 && ! jumpOn ){
        y = chaoy - 55
        jumpOn = true
      }
      
    //pulo descida
  
          if(y < chaoy)
          {
            y = y + grav
          }else
          {
            jumpOn = false;
            y = chaoy;
          }
        
  
    //atualização de fases pela frente
      if(contFase==1)
      {
        image(placain, 10, 270, 30, 30)
      }
      
      if(contFase==2){
        image(cerca, 370, 250, 80, 30)
        image(ArrayMob[contMob], 270, 260, 40, 40)
  
        //animação do caracol
        if(contFase==2)
        {
            atrasoMob++;
            if(atrasoMob >= 7){
              atrasoMob = 0;
              contMob++;
              if(contMob >= 7){
                contMob = 0
                ArrayMob.reverse()
            }
          }
          if(contFase == 2 && x>270 && x<300 && y>250 && y<350)
          {
            vidas -= 1
          }
        }
      }
      if(contFase==3)
      {
      image(cerca,-20, 250, 80, 30)
      image(placain, 370, 270, 30, 30)
      }
      if(contFase==4){
        tela=5
      }
      textSize(10);
      fill(255,255,255)
      text("vidas:",10,350)
      text(vidas,50,350)
      fill(0, 0, 0)
  
    //morte
      if(vidas<1){
        morrer(true)
      }
      }
  // segunda fase
    if(tela==7){
      rect(0, chaoy, 400, 50)
    //background
      image(bd, 0, 0, 500, 400);
    //background2
      if(contFase<3){
        image(bd2, 0, 0, 500, 400);}
    //background3
      if(contFase<2){     
        image(bd3, 0, 0, 500, 400);
      }
      
    //repetição do chao
    // chao baixo
      if(contFase != 3){
        for(i=0, j=0;i<7;i++)
          {
            image(chao2,j, 350, 50, 50)
          j += 50
          }
          for(i=0, j=0;i<7;i++)
          {
              image(chao2,j, 310, 50, 50)
              j += 50
          }
        if(contFase == 2){
          for(i=0, j=0;i<6;i++)
          {
              image(chao2,j, 350, 50, 50)
            j += 50
          }
          for(i=0, j=0;i<6;i++)
          {
              image(chao2,j, 310, 50, 50)
              j += 50
          }
        }
        image(ponte4, 350, 295, 50, 50)
        image(agua1, 350, 350, 60, 60)
        }



    //fase negativa
      if(contFase<1 && tela == 7)
      {
          contFase=1
      }
    // objetos de fundo
      if(contFase==1 && tela == 7)
      {
        //objetos
        image(mato, 160, 260, 80, 45)
        //repetição do chao primeira metade
        for(let i=0, posChao1=300, j=0;i<5;i++)
        {
          image(chao,j, posChao1, 50, 50)
          j +=50
        }
        //repetição do chao segunda metad
        for(let i=0, posChao2=280, j=230;i<5;i++)
        {
          image(chao,j, posChao2, 50, 50)
          j +=50
        }
        if(contFase==1 && x>220)
        {
          chaoy = 230

        }
        if(contFase==1 && x<220){
          chaoy=250
        }
        //objetos
      }

      if(contFase==2 && tela == 7)
      {
        //repetição do chao primeira metade
        image(mato, 260, 260, 80, 45)
        image(flor, 310, 280, 30, 30)
        for(let i=0, posChao1=280, j=0;i<3;i++)
        {
          if(i!=4){
            image(chao,j, posChao1, 50, 50)
            j +=50}
        }
      //repetição do chao segunda metad
        for(let i=0, posChao2=300, j=200;i<3;i++){
            image(chao,j, posChao2, 50, 50)
            j +=50
        }
        image(agua2,147, 305, 55, 100)

        if(contFase==2 && x>135)
        {
          chaoy = 250

        }
        if(contFase==2 && x<135){
          chaoy=230
        }
        if(contFase==2 && x>140 && x<180 && ! jumpOn){
          chaoy=400
          if(y<400){
            morrer(true)
            jumpOn = true
          }
        }
      }

      if(contFase==3 && tela == 7)
      {
        image(flor, 300, 280, 30, 30)
      //repetição da ponte
        for(let i=0, posChao1=300, j=0;i<5;i++)
        {
          image(ponte3,j, posChao1, 55, 20)
          j +=50
        }
      //repeticao da água
        for(let i=0, posChao1=350, j=0;i<6;i++)
        {
          image(agua1,j, posChao1, 55, 60)
          j +=50
        }
        image(ponte5, 250 , 295, 50, 50)
        image(chao,300, 300, 50, 50)
        image(chao,350, 300, 50, 50)
        image(chao2, 300, 350, 50, 50)
        image(chao2, 350, 350, 50, 50)
      }

    //personagem
      image(ArrayMove[contHero],x, y, w, z)
      
    // animação de andar para direita
      if(keyIsDown(RIGHT_ARROW) && tela != 5){
        x += 3;
        if( x > width) {
          x = 30
          contFase += 1
        }
        atraso1++;
        if(atraso1 >= 5){
          atraso1 = 0;
          contHero++;
          if(contHero >= 8){
            contHero = 1
            
            }
          }
        }
    // animação de andar para esquerda
      if(keyIsDown(LEFT_ARROW) && tela != 5){
        x -= 3;
      if( x < 0) {
        x = 340
        contFase -= 1
      }
      atraso2++;
      if(atraso2 >= 5){
        atraso2 = 0;
        contHero++;
        if(contHero >= 18){
          contHero = 9
          
          }
        }
      }
    // deixar o personagem parado enquanto não anda
      if(keyIsDown(RIGHT_ARROW) != true && keyIsDown(LEFT_ARROW) != true){
        if(contHero < 9){
          contHero = 0
        }else if(contHero > 8){
          contHero = 9
        }
      }

    //pulo subida
      if(keyIsDown(UP_ARROW) && tela != 5 && ! jumpOn ){
        y = chaoy - 55
        jumpOn = true
      }
      
    //pulo descida

          if(y < chaoy)
          {
            y = y + grav
          }else
          {
            jumpOn = false;
            y = chaoy;
          }
        

    //atualização de fases pela frente
      if(contFase==1)
      {
        image(placain, 15, 270, 30, 30)
      }
      if(contFase==3)
      {
        image(ArrayMob[contMob], 270, 260, 40, 40)

        //animação do caracol
        if(contFase==3)
        {
            atrasoMob++;
            if(atrasoMob >= 7){
              atrasoMob = 0;
              contMob++;
              if(contMob >= 7){
                contMob = 0
                ArrayMob.reverse()
            }
          }
          if(contFase == 2 && x>260 && x<285 && y>270 && y<350)
          {
            vidas -= 1
          }
        }

      } 
      if(contFase==3){
        image(placain, 370, 270, 30, 30)
      }
      if(contFase==4){
        tela=5
      }
      textSize(10);
      fill(255,255,255)
      text("vidas:",10,350)
      text(vidas,50,350)
      fill(0, 0, 0)

    //morte
      if(vidas<1){
        morrer()
      }
      }
  //tela opcoes 
    if(tela==3){
      background(205, 150, 92);
      image(bdopt, 0, 0, 400, 400)
      textSize(20);
      fill(0, 0, 0)
      text("Volume", 160,100);
      image(botao,10, 10, 80, 30)
      image(botao, 100, 120, 50, 50)  
      image(botao, 250, 120, 50, 50)   
      }
  //tela creditos  
    if(tela==4){
      background(105, 89, 205);
      image(bd, 0, 0, 400, 400)
      textSize("40");
      text("Desenvolvedor:" + "\n" + "Pedro Vitor Alencastro", 160, 120);
      image(botao,10, 10, 80, 30)
      text("Voltar", 25, 30);
      image(dev, 50, 100, 100, 100);
      }
  //cutscene vitoria
    if(tela==5){
      image(bd, 0, 0, 500, 400);
      //background2
      image(bd2, 0, 0, 500, 400);
      //background3
      //repetição do chao
      for(i=0, j=0;i<10;i++)
      {
        image(chao,j, 300, 50, 50)
        j += 50
      }
      for(i=0, j=0;i<10;i++)
      {
        image(chao2,j, 350, 50, 50)
      j += 50
      }

      image(ArrayMove[contHero],x, y, w, z)
      
      if(tela == 5 && x<400)
      {
      atraso1++;
      if(atraso1 >= 7){
        atraso1 = 0;
        contHero++;
        if(contHero >= 7){
          contHero = 0
          
          }
        }
      }
      if(tela===5 && x<400){
        x+=3
      }
      textSize("100");
      text("Parabens!", 160, 120);
      text("Você escapou da floresta", 100, 150);

      }
  //menu
    if(tela==6){
      image(bdmenu, 0, 0, 400, 400)
      image(botao, 150, 220, 100, 40)
      text("1 Fase", 172, 245);  
      image(botao, 150, 280, 100, 40)
      text("2 Fase", 172, 305);   
      }
  // botao de voltar
    if(tela>0){
      textSize(13);
      image(botao,10, 10, 80, 30)
      text("Voltar", 23, 30);
    }
}
//adicionar return pra resetar a morte
function morrer(morte){
  if(morte=true && y<400){
    y += 4
    text("Você morreu!", 180, 190)
  }else if(morte=false){
    y = chaoy
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    cutSceneEnd = true;
  }
}

// digitacao
    const saida = document.querySelector(".saida");

    function digitacao(texto, contador){
      if(contador < texto.lenght)
      {

        setTimeout(()=>{
          saida.textContent += texto.charAt(contador);
          contador++;
          digitacao(texto, contador);
        }, 90)
      }
    }

function mousePressed(){
  //start
    if(tela==0)
  {
      if(mouseX>150 && mouseX<(150 + 150) && mouseY>150 && mouseY<(150+40)) 
    {
        tela = 6
        click.play()
    } 
    
  }  
  //voltar fases
    if(tela==1)
  {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
    {
        tela = 0
        click.play()
    }
    
  } 
  //voltar jogo 1
  if(tela==2)
  {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
    {
        tela = 0
        click.play()
    }
    
  } 
  //voltar jogo 2
  if(tela==7)
  {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
    {
        tela = 0
        click.play()
    }
    
  }  
  //opcoes
    if(tela==0)
  {
      if(mouseX>150 && mouseX<(150 + 200) && mouseY>200 && mouseY<(200+40))
    {
        tela = 3
        click.play()
    } 
  }
  //voltar opcoes
  if(tela==3)
  {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
      {
         tela = 0
         click.play()
      }
   
  }
  //creditos
  if(tela==0)
  {
      if(mouseX>150 && mouseX<(150 + 200) && mouseY>250 && mouseY<(250+40))
      {
         tela = 4
         click.play()
      }
  }
  //voltar creditos
  if(tela==4)
    {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
        {
         tela = 0
         click.play()
        }
    }
  if(tela==5)
    {
      if(mouseX>10 && mouseX<(10 + 80) && mouseY>10 && mouseY<(10 + 30))
        {
         tela = 0
         click.play()
        }
    }
  if(tela==3){
      if(mouseX>100 && mouseX<(150) && mouseY>120 && mouseY<(170))
      {
      volum -= 0.01
      click.play()      
      }
      if(mouseX>250 && mouseX<(300) && mouseY>120 && mouseY<(170))
      {
      volum += 0.01
      click.play()   
      }
  }
  if(tela==6){
    if(mouseX>150 && mouseX<(250) && mouseY>220 && mouseY<(260))
    {
    tela = 1
    x = 10
    contFase = 1
    click.play()      
    }
    if(mouseX>150 && mouseX<(250) && mouseY>280 && mouseY<(320))
    {
    tela = 7
    x = 10
    contFase = 1
    click.play()   
    }
  }
}
