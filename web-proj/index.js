const startBtn = document.querySelector(".start"),
      infoBtn = document.querySelector(".infoBtn"),
      infoDiv = document.querySelector(".info"),
      icons = document.querySelectorAll("i");
document.querySelector("i").addEventListener("click", () =>{
    //console.log("aaaa");
});
var cntbent = 15,
    cntstr = 13,
    cntt = 6;



const pileBent = [["img/1.png","img/2.png","img/3.png","img/4.png"],["img/5.png","img/6.png","img/7.png","img/8.png"],["img/9.png","img/10.png"]],
      unmovableind = [1,3,5,7,15,17,19,21,29,31,33,35,43,45,47,49],
      corners = [1, 7, 42, 49];
var treasure = [];
var index = [];

function random (a,b){
    return Math.floor(Math.random() * b) + a;
}


startBtn.addEventListener("click", () =>{
    start();
});

infoBtn.addEventListener("click", () => {
    if (infoDiv.className.includes("active"))
        infoDiv.classList.remove("active");
    else
        infoDiv.classList.add("active");
})

var gameState = 0,
    turn = 1;

// while(gameState != 1){
//
//     gameState = 1;
// }



var playerNum, cardNum;
function start(){
    document.querySelector(".start").disabled="true"
    playerNum = document.querySelector(".playersinp").value;
        cardNum = document.querySelector(".cardsinp").value;



    if(playerNum > 0  && playerNum < 5){
        drawgrid();
        placeRnd();
        drawExtraPile();
        treasuretoarr();
        placePlayers(playerNum);
        gamestatus();
        givecards();
        updatetres();

        // //console.log(document.querySelector("#i"))
        document.querySelector(".rotate").addEventListener('click', ()=>{
            if ((document.querySelector('.extrapile').style.background) == 'url("img/1.png")')
                document.querySelector('.extrapile').style.background = 'url("img/2.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/2.png")')
                document.querySelector('.extrapile').style.background = 'url("img/3.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/3.png")')
                document.querySelector('.extrapile').style.background = 'url("img/4.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/4.png")')
                document.querySelector('.extrapile').style.background = 'url("img/1.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/5.png")')
                document.querySelector('.extrapile').style.background = 'url("img/6.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/6.png")')
                document.querySelector('.extrapile').style.background = 'url("img/7.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/7.png")')
                document.querySelector('.extrapile').style.background = 'url("img/8.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/8.png")')
                document.querySelector('.extrapile').style.background = 'url("img/5.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/9.png")')
                document.querySelector('.extrapile').style.background = 'url("img/10.png")';
            else if ((document.querySelector('.extrapile').style.background) == 'url("img/10.png")')
                document.querySelector('.extrapile').style.background = 'url("img/9.png")';
        });

        document.querySelector("#i1").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideTop(2);
            nextPile(turn);
            moveplayer();
            // nextturn();

         });
        document.querySelector("#i2").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideTop(4);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i3").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideTop(6);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i4").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideRight(14);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i5").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideRight(28);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i6").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideRight(42);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i7").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideBottom(48);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i8").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideBottom(46);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i9").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideBottom(44);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i10").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideLeft(36);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i11").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideLeft(22);
            nextPile(turn);
            moveplayer();
        });
        document.querySelector("#i12").addEventListener("click", ()=>{
            
            gamestatusplayer();
            rmvhighlght();
            slideLeft(8);
            nextPile(turn);
            moveplayer();
        });


    }

    else{
        alert("INPUT ERROR");
    }


}

function nextturn(){
    if (turn!=playerNum){
        turn++
    }
    else turn=1;
}
function moveplayer(){

    if(document.querySelector(`.accessible`)!=null) {
        let access = document.querySelectorAll(".accessible");
        for (let i =0; i < access.length; i++){
            access[i].addEventListener("click", (e) => {
                console.log(e)
                    if(e.target.parentElement.className.includes("accessible")) {
                        console.log("placed")
                        removeplayer();
                        console.log(players)
                        e.target.parentElement.innerHTML += `<i id="player${turn}" class="fas fa-male player"></i>`;
                        if(checkroom()){
                            players[turn-1].pop();
                        }
                        checkzero();
                        nextturn();
                        rmvhighlght();
                        gamestatusplace();
                        gamestatusturn();
                        updatetres();
                    }
                    else if(e.target.className.includes("accessible")) {
                        // console.log("placed")
                        removeplayer();
                        console.log(players)
                        e.target.innerHTML += `<i id="player${turn}" class="fas fa-male player"></i>`;
                        if(checkroom()){
                            players[turn-1].pop();
                        }
                        checkzero();
                        nextturn();
                        rmvhighlght();
                        gamestatusplace();
                        gamestatusturn();
                        updatetres();
                    }
            });
        }
    }
    else{
        nextturn();
        gamestatusplace();
        gamestatusturn();
    };
}
function checkroom(){

    if(document.querySelector(`#player${turn}`).parentElement.querySelector("img") != null) {
        let img = document.querySelector(`#player${turn}`).parentElement.querySelector("img");
        if (img.src.includes(`${players[turn - 1][players[turn - 1].length-1]+1}`)) {
            return true;
        }
    }
    return false;
}
var players = [];
var cards = [];
function playercards(){
    for (let i =0; i < playerNum; i++){
        let arr = [];
        players.push(arr);
    }
}
function checkzero(){
    for (let i = 0 ; i < playerNum; i++){
        if(players[i].length == 0){
            document.querySelector(".game").style.display = "none";
            document.querySelector(".modal1").style.display = "flex";
        }
    }
}

function updatetres(){
    document.querySelector("img.treasure").src = `img/treasure/${players[turn - 1][players[turn - 1].length-1]+1}.png`;
}

function givecards(){
    playercards();
    for (let i = 0; i < playerNum; i++){
        for (let j = 0; j < cardNum; j++){
            let res= giverndtres();
            players[i].push(res);
            cards.push(res)
        }
    }
}

function giverndtres(){
    let rnd = random(0, 24);
    if(cards.includes(rnd)){
        // console.log(rnd);
        return giverndtres();
    }
    else return rnd;

}

function treasuretoarr(){
    for (let i=1; i <25; i++){
        treasure.push(i);
    }
    for (let i=1; i < 50; i++){
        if( i!=1 && i!=7 && i!=43 && i!=49){
            index.push(i)
        }
    }
    for (let i=0; i < 24; i++){
        treassurerand();
    }
}

function treassurerand(){
    let rndind = random(0, index.length);
    let rndtre = random(0, treasure.length);
    document.querySelector(`.n${index[rndind]}`).innerHTML+= `<img src="img/treasure/${treasure[rndtre]}.png">`;
    treasure.splice(rndtre, 1);
    index.splice(rndind, 1);

}
function removeplayer(){
    for (let i =1; i <50; i++ ){
        if( hasIcon(document.querySelector(`.n${i}`), turn)) {
            document.querySelector(`.n${i}`).innerHTML = document.querySelector(`.n${i}`).innerHTML.replace(`<i id="player${turn}" class="fas fa-male player"></i>`,'')
        }
    }
}

function  rmvhighlght(){
    for (let i =1; i<50; i++){
        if (document.querySelector(`.n${i}`).className.includes("accessible"))
            document.querySelector(`.n${i}`).classList.remove("accessible");
    }
}

function gamestatusturn(){
    document.querySelector(".player-id").innerHTML = `Player${turn}`;
}

function gamestatusplayer(){
    document.querySelector(".todo p").innerHTML = "Move player";
}
function gamestatusplace(){
    document.querySelector(".todo p").innerHTML = "Place a card"
}
function gamestatus(){
    document.querySelector(".extrapile-parent").innerHTML+= `<div class ="gamestatus">
    <div class="turn">
        <p>Turn of:</p><p class="player-id">Player1</p>
    </div>
    <div class="todo">
        <p>Place a card</p>
    </div>
    <div class="treasure-parent">
        <p>Treasure to collect:</p>
        <img class="treasure">
</div>
</div>`;
}
function checkTop(i){
    let imgg = `${document.querySelector(`.n${i}`).style.background}`;
    let img  = document.querySelector(".salam");
    img.src = `${document.querySelector(`.n${i}`).style.background}`;
    imgg  =  `${(imgg.replace('url("', ''))}`;
    //console.log(imgg);
    imgg =  `${(imgg.replace('")', ''))}`;
    //console.log(imgg);
    img.src = imgg;
    let c= document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    ctx.crossOrigin = "Anonymous";
    ctx.drawImage(img , 0, 0);

   if( ctx.getImageData(25,10,1,1).data[0] == 255){
       return true;
   }
   else return false;
}
function checkBottom(i){
    let imgg = `${document.querySelector(`.n${i}`).style.background}`;
    let img  = document.querySelector(".salam");
    img.src = `${document.querySelector(`.n${i}`).style.background}`;
    imgg  =  `${(imgg.replace('url("', ''))}`;
    //console.log(imgg);
    imgg =  `${(imgg.replace('")', ''))}`;
    //console.log(imgg);
    img.src = imgg;
    let c= document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    ctx.crossOrigin = "Anonymous";
    ctx.drawImage(img , 0, 0);
    //console.log(ctx.getImageData(25,40,1,1).data);
   if( ctx.getImageData(25,40,1,1).data[0] == 255){
       return true;
   }
   else return false;
}
function checkLeft(i){
    let imgg = `${document.querySelector(`.n${i}`).style.background}`;
    let img  = document.querySelector(".salam");
    imgg  =  `${(imgg.replace('url("', ''))}`;
    imgg =  `${(imgg.replace('")', ''))}`;
    //console.log(imgg);
    img.src = imgg;
    let c= document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    ctx.crossOrigin = "Anonymous";
    ctx.drawImage(img , 0, 0);
    // console.log(img)
    // console.log(ctx.getImageData(0,0,1,1).data);

   if( ctx.getImageData(5,25,1,1).data[0] == 255){
       return true;
   }
   else return false;
}

function checkRight(i){
    let imgg = `${document.querySelector(`.n${i}`).style.background}`;
    let img  = document.querySelector(".salam");
    imgg  =  `${(imgg.replace('url("', ''))}`;
    imgg =  `${(imgg.replace('")', ''))}`;
    //console.log(imgg);
    img.src = `${imgg}`;
    let c= document.querySelector(".canvas");
    let ctx = c.getContext("2d");
    ctx.crossOrigin = "Anonymous";
    ctx.drawImage(img , 0, 0);
    //console.log(ctx.getImageData(45,25,1,1).data, i);
   if( ctx.getImageData(45,25,1,1).data[0] == 255){
       return true;
   }
   else return false;
}


function hasIcon(elem,turn){
    if (elem.querySelectorAll(`#player${turn}`).length > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function hasAccess(elem){
    if (elem.className.includes("accessible")){
        return true;
    }
    else{
        return false;
    }
}


function nextPile(turn){
    for (let j = 0; j < 49; j++) {
        for (let i = 1; i < 50; i++) {
            if (hasIcon(document.querySelector(`.n${i}`), turn) || hasAccess(document.querySelector(`.n${i}`))) {
                // console.log(i)
                if (i == 1) {
                    if (checkLeft(i + 1)) {
                        //console.log("boom")
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                    if (checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                } else if (i > 1 && i < 7) {
                    if (checkRight(i) && checkLeft(i + 1)) {
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                    if (checkLeft(i) && checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                    if (checkBottom(i) && checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                } else if (i == 7) {
                    if (checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                    if (checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                } else if ((i - 1) % 7 == 0 && i != 43) {
                    if (checkTop(i) && checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkBottom(i) && checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                    if (checkRight(i) && checkLeft(i + 1)) {
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                } else if (i % 7 == 0 && i != 49) {
                    if (checkTop(i) && checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkBottom(i) && checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                    if (checkLeft(i) && checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                } else if (i > 7 && i < 43) {
                    if (checkTop(i) && checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkBottom(i) && checkTop(i + 7)) {
                        document.querySelector(`.n${i + 7}`).classList.add("accessible");
                    }
                    if (checkLeft(i) && checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                    if (checkRight(i) && checkLeft(i + 1)) {
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                } else if (i == 43) {
                    if (checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkLeft(i + 1)) {
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                } else if (i > 43 && i != 49) {
                    if (checkTop(i) && checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkLeft(i) && checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                    if (checkRight(i) && checkLeft(i + 1)) {
                        document.querySelector(`.n${i + 1}`).classList.add("accessible");
                    }
                } else if (i == 49) {
                    if (checkBottom(i - 7)) {
                        document.querySelector(`.n${i - 7}`).classList.add("accessible");
                    }
                    if (checkRight(i - 1)) {
                        document.querySelector(`.n${i - 1}`).classList.add("accessible");
                    }
                }

            }
        }
    }
}

function placePlayers(num){
    if (num == 1 ){
        document.querySelector(`.n1`).innerHTML = `<i id="player1" class="fas fa-male player"></i>`
    }
    else if (num == 2 ){
        document.querySelector(`.n1`).innerHTML = `<i id="player1" class="fas fa-male player"></i>`
        document.querySelector(`.n7`).innerHTML = `<i id="player2" class="fas fa-male player"></i>`
    }
    else if (num == 3 ){
        document.querySelector(`.n1`).innerHTML = `<i id="player1" class="fas fa-male player"></i>`
        document.querySelector(`.n7`).innerHTML = `<i id="player2" class="fas fa-male player"></i>`
        document.querySelector(`.n43`).innerHTML = `<i id="player3" class="fas fa-male player"></i>`
    }
    else if (num == 4 ){
        document.querySelector(`.n1`).innerHTML = `<i id="player1" class="fas fa-male player"></i>`
        document.querySelector(`.n7`).innerHTML = `<i id="player2" class="fas fa-male player"></i>`
        document.querySelector(`.n43`).innerHTML = `<i id="player3" class="fas fa-male player"></i>`
        document.querySelector(`.n49`).innerHTML = `<i id="player4" class="fas fa-male player"></i>`
    }
}

function drawgrid(){
    document.querySelector(".table").style.display = "flex"
    let gridBody = document.querySelector(".grid-container");
    for (let i = 0; i < 49; i++){
        gridBody.innerHTML += `<div class = "grid-item pile n${i+1}"></div>`;
    }
}
function isMovable(i){
    if(unmovableind.includes(i))
        return false;
    else{
        return true;

    }
}

function slideTop(i){
    let helper, helper2;
    helper = document.querySelector(`.n${i}`).style.background;
    helper2 = document.querySelector(`.n${i}`).innerHTML;
    document.querySelector(`.n${i}`).style.background =  document.querySelector(`.extrapile`).style.background;
    document.querySelector(`.n${i}`).innerHTML =  document.querySelector(`.extrapile`).innerHTML;
    document.querySelector(".extrapile").style.background =  document.querySelector(`.n${i+42}`).style.background;
    document.querySelector(".extrapile").innerHTML =  document.querySelector(`.n${i+42}`).innerHTML;
    document.querySelector(`.n${i+42}`).style.background =  document.querySelector(`.n${i+35}`).style.background;
    document.querySelector(`.n${i+42}`).innerHTML =  document.querySelector(`.n${i+35}`).innerHTML;
    document.querySelector(`.n${i+35}`).style.background =  document.querySelector(`.n${i+28}`).style.background;
    document.querySelector(`.n${i+35}`).innerHTML =  document.querySelector(`.n${i+28}`).innerHTML;
    document.querySelector(`.n${i+28}`).style.background =  document.querySelector(`.n${i+21}`).style.background;
    document.querySelector(`.n${i+28}`).innerHTML =  document.querySelector(`.n${i+21}`).innerHTML;
    document.querySelector(`.n${i+21}`).style.background =  document.querySelector(`.n${i+14}`).style.background;
    document.querySelector(`.n${i+21}`).innerHTML =  document.querySelector(`.n${i+14}`).innerHTML;
    document.querySelector(`.n${i+14}`).style.background =  document.querySelector(`.n${i+7}`).style.background;
    document.querySelector(`.n${i+14}`).innerHTML =  document.querySelector(`.n${i+7}`).innerHTML;
    document.querySelector(`.n${i+7}`).style.background =  `${helper}`;
    document.querySelector(`.n${i+7}`).innerHTML =  `${helper2}`;
}
function slideBottom(i){
    let helper,helper2;
    helper = document.querySelector(`.n${i}`).style.background;
    helper2 = document.querySelector(`.n${i}`).innerHTML;
    document.querySelector(`.n${i}`).style.background =  document.querySelector(`.extrapile`).style.background;
    document.querySelector(`.n${i}`).innerHTML =  document.querySelector(`.extrapile`).innerHTML;
    document.querySelector(".extrapile").style.background =  document.querySelector(`.n${i-42}`).style.background;
    document.querySelector(".extrapile").innerHTML =  document.querySelector(`.n${i-42}`).innerHTML;
    document.querySelector(`.n${i-42}`).style.background =  document.querySelector(`.n${i-35}`).style.background;
    document.querySelector(`.n${i-42}`).innerHTML =  document.querySelector(`.n${i-35}`).innerHTML;
    document.querySelector(`.n${i-35}`).style.background =  document.querySelector(`.n${i-28}`).style.background;
    document.querySelector(`.n${i-35}`).innerHTML =  document.querySelector(`.n${i-28}`).innerHTML;
    document.querySelector(`.n${i-28}`).style.background =  document.querySelector(`.n${i-21}`).style.background;
    document.querySelector(`.n${i-28}`).innerHTML =  document.querySelector(`.n${i-21}`).innerHTML;
    document.querySelector(`.n${i-21}`).style.background =  document.querySelector(`.n${i-14}`).style.background;
    document.querySelector(`.n${i-21}`).innerHTML =  document.querySelector(`.n${i-14}`).innerHTML;
    document.querySelector(`.n${i-14}`).style.background =  document.querySelector(`.n${i-7}`).style.background;
    document.querySelector(`.n${i-14}`).innerHTML =  document.querySelector(`.n${i-7}`).innerHTML;
    document.querySelector(`.n${i-7}`).style.background =  `${helper}`;
    document.querySelector(`.n${i-7}`).innerHTML =  `${helper2}`;
}
function slideRight(i){
    let helper, helper2;
    helper = document.querySelector(`.n${i}`).style.background;
    helper2 = document.querySelector(`.n${i}`).innerHTML;
    document.querySelector(`.n${i}`).style.background =  document.querySelector(`.extrapile`).style.background;
    document.querySelector(`.n${i}`).innerHTML =  document.querySelector(`.extrapile`).innerHTML;
    document.querySelector(".extrapile").style.background =  document.querySelector(`.n${i-6}`).style.background;
    document.querySelector(".extrapile").innerHTML =  document.querySelector(`.n${i-6}`).innerHTML;
    document.querySelector(`.n${i-6}`).style.background =  document.querySelector(`.n${i-5}`).style.background;
    document.querySelector(`.n${i-6}`).innerHTML =  document.querySelector(`.n${i-5}`).innerHTML;
    document.querySelector(`.n${i-5}`).style.background =  document.querySelector(`.n${i-4}`).style.background;
    document.querySelector(`.n${i-5}`).innerHTML =  document.querySelector(`.n${i-4}`).innerHTML;
    document.querySelector(`.n${i-4}`).style.background =  document.querySelector(`.n${i-3}`).style.background;
    document.querySelector(`.n${i-4}`).innerHTML=  document.querySelector(`.n${i-3}`).innerHTML;
    document.querySelector(`.n${i-3}`).style.background =  document.querySelector(`.n${i-2}`).style.background;
    document.querySelector(`.n${i-3}`).innerHTML =  document.querySelector(`.n${i-2}`).innerHTML;
    document.querySelector(`.n${i-2}`).style.background =  document.querySelector(`.n${i-1}`).style.background;
    document.querySelector(`.n${i-2}`).innerHTML =  document.querySelector(`.n${i-1}`).innerHTML;
    document.querySelector(`.n${i-1}`).style.background =  `${helper}`;
    document.querySelector(`.n${i-1}`).innerHTML =  `${helper2}`;
}
function slideLeft(i){
    let helper, helper2;
    helper = document.querySelector(`.n${i}`).style.background;
    helper2 = document.querySelector(`.n${i}`).innerHTML;
    document.querySelector(`.n${i}`).style.background =  document.querySelector(`.extrapile`).style.background;
    document.querySelector(`.n${i}`).innerHTML =  document.querySelector(`.extrapile`).innerHTML;
    document.querySelector(".extrapile").style.background =  document.querySelector(`.n${i+6}`).style.background;
    document.querySelector(".extrapile").innerHTML =  document.querySelector(`.n${i+6}`).innerHTML;
    document.querySelector(`.n${i+6}`).style.background =  document.querySelector(`.n${i+5}`).style.background;
    document.querySelector(`.n${i+6}`).innerHTML =  document.querySelector(`.n${i+5}`).innerHTML;
    document.querySelector(`.n${i+5}`).style.background =  document.querySelector(`.n${i+4}`).style.background;
    document.querySelector(`.n${i+5}`).innerHTML =  document.querySelector(`.n${i+4}`).innerHTML;
    document.querySelector(`.n${i+4}`).style.background =  document.querySelector(`.n${i+3}`).style.background;
    document.querySelector(`.n${i+4}`).innerHTML=  document.querySelector(`.n${i+3}`).innerHTML;
    document.querySelector(`.n${i+3}`).style.background =  document.querySelector(`.n${i+2}`).style.background;
    document.querySelector(`.n${i+3}`).innerHTML =  document.querySelector(`.n${i+2}`).innerHTML;
    document.querySelector(`.n${i+2}`).style.background =  document.querySelector(`.n${i+1}`).style.background;
    document.querySelector(`.n${i+2}`).innerHTML =  document.querySelector(`.n${i+1}`).innerHTML;
    document.querySelector(`.n${i+1}`).style.background =  `${helper}`;
    document.querySelector(`.n${i+1}`).innerHTML =  `${helper2}`;
}






function placeRnd(){

    for (let i = 0; i<49; i++){
        if (isMovable(i+1)){
            rndhelper(i);
        }

        switch(i) {
            case 0:
                //console.log("aaaa")
                document.querySelector(`.n${i+1}`).style.background = 'url("img/1.png")';
                break;
            case 2:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/5.png")';
                break;
            case 4:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/5.png")';
                break;
            case 6:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/2.png")';
                break;
            case 7:
                //console.log("aaaa")
                document.querySelector(`.n${i+1}`).style.background = 'url("img/1.png")';
                break;
            case 42:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/4.png")';
                break;
            case 48:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/3.png")';
                break;
            case 18:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/5.png")';
                break;
            case 14:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/8.png")';
                break;
            case 16:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/8.png")';
                break;
            case 28:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/8.png")';
                break;
            case 20:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/6.png")';
                break;
            case 34:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/6.png")';
                break;
            case 32:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/6.png")';
                break;
            case 30:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/7.png")';
                break;
            case 44:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/7.png")';
                break;
            case 46:
                document.querySelector(`.n${i+1}`).style.background = 'url("img/7.png")';
                break;
            default:
            // code block
        }
    }
}

var pile50 = [];
function rndhelper(i){
    let rnd = random(0,3);
    if(rnd == 0 && cntbent > 0){
        rnd = random(0,4);
        cntbent--;
        document.querySelector(`.n${i+1}`).style.background = `url(${pileBent[0][rnd]})`

    }
    else if(rnd == 2 && cntstr > 0){
        rnd = random(0,2);
        cntstr--;
        document.querySelector(`.n${i+1}`).style.background = `url(${pileBent[2][rnd]})`


    }
    else if(rnd == 1 && cntt > 0){
        rnd = random(0,4);
        cntt--;
        document.querySelector(`.n${i+1}`).style.background = `url(${pileBent[1][rnd]})`;

    }
    else {
        rndhelper(i)
    }
}
function drawExtraPile (){

    if (cntstr == 1) {
        rnd = random(0,2);
        document.querySelector(".extra").innerHTML += `<div class = "extrapile-parent"><div class="extrapile n50"></div></div>`;
        document.querySelector(".extrapile").style.background = `url(${pileBent[2][random(0,2)]}`;
        pile50.push(2);
        pile50.push(rnd);
    }
    if (cntt == 1) {
        rnd = random(0,4);
        document.querySelector(".extra").innerHTML += `<div class = "extrapile-parent"><div class="extrapile"></div></div>`;
        document.querySelector(".extrapile").style.background = `url(${pileBent[1][random(0,4)]}`;
        pile50.push(0);
        pile50.push(rnd);
    }
    if (cntbent == 1) {
        rnd = random(0,4);
        document.querySelector(".extra").innerHTML += `<div class = "extrapile-parent"><div class="extrapile"></div></div>`;
        document.querySelector(".extrapile").style.background = `url(${pileBent[0][random(0,4)]}`;
        pile50.push(0);
        pile50.push(rnd);
    }
    document.querySelector(".extrapile-parent").innerHTML += `<button class="rotate">Rotate</button>`
}