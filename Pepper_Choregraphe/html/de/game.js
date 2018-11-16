//let session = QiSession();


/*   The Game "Object":

        id: number
        solvedParts: number
        sounds: String: path
        GameParts: Array[
            leftImg: String: path
            rigtImg: String: path
            correctImg: String, Value should be 'r' or 'l'
           ]
 */

let idGame; //id für Auswahl der Spielreihe
let Games = [];
let leftImg = document.getElementById('IimgLeft');
let rightImg = document.getElementById('IimgRight');
let speaker = document.getElementById('ISpeaker');

function onButtonSpeakerClick(){
    let audio = document.getElementById('IAudio');
    audio.src = Games[idGame].sounds;
    audio.play();
    //let speechService = session.service('ALAudioPlayerProxy');
    //speechService.loadFile('../Sounds/cow.mp3');
    //speechService.play();
}


function setImgs(){
    leftImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].leftImg;
    rightImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].rightImg;
}
function onLoad(){

    leftImg = document.getElementById('IimgLeft');
    rightImg = document.getElementById('IimgRight');
    speaker = document.getElementById('ISpeaker');
    setGames();
    idGame = 0;
    setImgs();
}
function selectNewGame(){
    // now the first Game is played always. random could be implemented
    // idGame remains 0


    Games.shift();
    if(Games.length > 0){
        alert('Neue Runde!');
        //there is still a Game to select
        speaker.style.visibility = 'visible';
        setImgs();
    } else {
        //Game is over
        alert('Game Over!');
    }
}
function onImgClick(pos){
    if (Games[idGame].GameParts[Games[idGame].solvedParts].correctImg === pos){
        //correct Image has been selected
        alert('CORRECT');
        if(++Games[idGame].solvedParts === Games[idGame].GameParts.length){
            //all parts solved
            selectNewGame();
        } else {
            //next Part
            speaker.style.visibility = 'hidden';
            setImgs();
        }
    }
}


function appendGame(leftImgs, rightImgs, correctImgs, sound){
    let gameParts = [];
    for(let i=0; i<leftImgs.length; i++){
        gameParts.push({
            leftImg: leftImgs[i], //String
            rightImg: rightImgs[i], //String
            correctImg: correctImgs[i] //String, Value should be 'r' or 'l'
        });
    }
    Games.push({
        id: Games.length,
        solvedParts: 0,
        sounds: sound,
        GameParts: gameParts
    });
}
//predefined Games
function setGames() {

    //Game no. 1: Kuh
    appendGame(['./img/kuh.jpg','./img/Brot.jpg','./img/1Käse.jpg'], //Linke Bilder
        ['./img/ratte.jpg','./img/Milch.jpg','./img/1Wurst.jpg'],   // Rechte Bilder
        ['l','r','l'],                                              //richtiges Bild
        './Sounds/cow.mp3');                                        //Sound (1. Bild)
    //Game no. 2: huhn
    appendGame(['./img/huhn.jpg','./img/Ei.jpg','./img/Apfel.jpg'],
        ['./img/Esel.jpg','./img/Mehl.jpg','./img/1Spiegelei.jpg'],
        ['l','l','r'],
        './Sounds/chicken.mp3');
}

