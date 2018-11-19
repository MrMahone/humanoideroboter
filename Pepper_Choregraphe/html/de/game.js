
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

var idGame; //id für Auswahl der Spielreihe
var Games = [];
var leftImg = document.getElementById('IimgLeft');
var rightImg = document.getElementById('IimgRight');
var speaker = document.getElementById('ISpeaker');
var infos = document.getElementById('Iinfos');

function onButtonSpeakerClick(){
    var audio = document.getElementById('IAudio');
    audio.src = Games[idGame].sounds;
    audio.play();
}


function setImgs(){
    leftImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].leftImg;
    rightImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].rightImg;
}
function onLoad(){
    leftImg = document.getElementById('IimgLeft');
    rightImg = document.getElementById('IimgRight');
    speaker = document.getElementById('ISpeaker');
    infos = document.getElementById('Iinfos');
    speaker.style.visibility = 'hidden';
    setGames();
    idGame = 0;
    showInfo('Von welchem Tier stammt dieses Geräusch?',2,function () {
        speaker.style.visibility = 'visible';
        setImgs();
        onButtonSpeakerClick();
    });
}
function selectNewGame(){
    // now the first Game is played always. random could be implemented
    // idGame remains 0
    Games.shift();
    if(Games.length > 0){
        showInfo('Neue Runde', 1, function () {
            //there is still a Game to select
            speaker.style.visibility = 'visible';
            setImgs();
            onButtonSpeakerClick();
        });
    } else {
        //Game is over
        showInfo('Danke für die Hilfe!', 5, function () {
            document.location = './index.html';
        })
    }
}
function onImgClick(pos){
    if (Games[idGame].GameParts[Games[idGame].solvedParts].correctImg === pos){
        //correct Image has been selected
        showInfo('Richtig!\n Toll gemacht!', 2, function () {
            if (++Games[idGame].solvedParts === Games[idGame].GameParts.length) {
                //all parts solved
                selectNewGame();
            } else {
                //next Part
                speaker.style.visibility = 'hidden';
                setImgs();
            }
        });
    }
}
function showInfo(text, duration, toDo) {
    infos.innerHTML = text;
    infos.style.visibility = 'visible';
    setTimeout(function(){

        infos.style.visibility = 'hidden';
        toDo();
    }, duration*1000);

}


function appendGame(leftImgs, rightImgs, correctImgs, sound){
    var gameParts = [];
    for(var i=0; i<leftImgs.length; i++){
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
    appendGame(['./img/kuh.jpg','./img/Brot.jpg','./img/Käse.jpg'], //Linke Bilder
        ['./img/ratte.jpg','./img/Milch.jpg','./img/Wurst.jpg'],   // Rechte Bilder
        ['l','r','l'],                                               //richtiges Bild
        './Sounds/cow.mp3');                                        //Sound (1. Bild)
    //Game no. 2: huhn
    appendGame(['./img/huhn.jpg','./img/Ei.jpg','./img/Apfel.jpg'],
        ['./img/Esel.jpg','./img/Mehl.jpg','./img/Spiegelei.jpg'],
        ['l','l','r'],
        './Sounds/chicken.mp3');
}

