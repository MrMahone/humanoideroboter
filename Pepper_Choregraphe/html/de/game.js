
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
var counter;
var Games = [];
var leftImg;
var rightImg;
var leftBut;
var rightBut;
var speaker;
var infos;
var prev;
var arrow;


function onButtonSpeakerClick(){
    var audio = document.getElementById('IAudio');
    audio.src = Games[idGame].sounds;
    audio.play();
}


function setImgs(){
    //set new Images
    leftImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].leftImg;
    rightImg.src = Games[idGame].GameParts[Games[idGame].solvedParts].rightImg;

    //rename Buttons
    if(Games[idGame].GameParts[Games[idGame].solvedParts].correctImg === 'l') {
        leftBut.id = 'c' + counter;
        rightBut.id = 'f' + counter++;
    } else {
        rightBut.id = 'c' + counter;
        leftBut.id = 'f' + counter++;
    }

    //set name of previous on top middle
    if(Games[idGame].solvedParts > 0){
        var text = '';
        if(Games[idGame].GameParts[(Games[idGame].solvedParts - 1)].correctImg === 'l') {
            text = Games[idGame].GameParts[(Games[idGame].solvedParts - 1)].leftImg;
        } else {
            text = Games[idGame].GameParts[(Games[idGame].solvedParts - 1)].rightImg;
        }
        //cut ".jpg" away
        text = text.slice(0,text.length-4);
        var char = '';
        var count = -1;
        while(char !== '/'){
            char = text.slice(-((++count)+1),-count);
        }
        prev.innerHTML = text.slice(-count);
        arrow.style.visibility = 'visible';
    }else {
        prev.innerHTML = '';
        arrow.style.visibility = 'hidden';
    }
}

function onLoad(){
    leftImg = document.getElementById('IimgLeft');
    rightImg = document.getElementById('IimgRight');
    leftBut = document.getElementById('ILeft');
    rightBut = document.getElementById('IRight');
    speaker = document.getElementById('ISpeaker');
    infos = document.getElementById('Iinfos');
    prev = document.getElementById('IPrev');
    arrow = document.getElementById('IImgArrow');
    counter = 1;
    idGame = 0;

    speaker.style.visibility = 'hidden';
    arrow.style.visibility = 'hidden';

    setGames();
    setTimeout(function () {
        showInfo('Von welchem Tier stammt dieses Geräusch?', 3, function () {
            speaker.style.visibility = 'visible';
            setImgs();
            onButtonSpeakerClick();
        });
    }, 8000);

}
function selectNewGame(){
    // now the first Game is played always. random could be implemented
    // idGame remains 0
    Games.shift();
    if(Games.length > 0){
        showInfo('Neue Runde', 2, function () {
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
        showInfo('Richtig!\n Toll gemacht!', 7, function () {
            if (++Games[idGame].solvedParts === Games[idGame].GameParts.length) {
                //all parts solved
                selectNewGame();
            } else {
                //next Part
                speaker.style.visibility = 'hidden';
                setImgs();
            }
        });
    } else {
        //false image has been selected
        showInfo('Das war es glaube ich nicht.', 4 ,function () {

        });
    }
}
function showInfo(text, duration, toDo) {
    infos.innerHTML = text;
    infos.style.visibility = 'visible';
    leftBut.disabled = true;
    rightBut.disabled = true;
    setTimeout(function(){
        infos.style.visibility = 'hidden';
        leftBut.disabled = false;
        rightBut.disabled = false;

        toDo();
    }, duration*1000);

}

function appendGame(leftImgs, rightImgs, correctImgs, sound){
    var gameParts = [];
    for(var i=0; i< leftImgs.length; i++){
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
    appendGame(['./img/Kuh.jpg','./img/Brot.jpg','./img/Kaese.jpg'], //Linke Bilder
        ['./img/Ratte.jpg','./img/Milch.jpg','./img/Wurst.jpg'],   // Rechte Bilder
        ['l','r','l'],                                               //richtiges Bild
        './Sounds/cow.mp3');                                        //Sound (1. Bild)
    //Game no. 2: Huhn
    appendGame(['./img/Huhn.jpg','./img/Ei.jpg','./img/Apfel.jpg'], //Linke Bilder
        ['./img/Esel.jpg','./img/Mehl.jpg','./img/Spiegelei.jpg'],   // Rechte Bilder
        ['l','l','r'],                                               //richtiges Bild
        './Sounds/chicken.mp3');                                        //Sound (1. Bild)
    //Game no. 3: Schaf
    appendGame(['./img/Schaf.jpg','./img/Kartoffeln.jpg','./img/Kuchen.jpg'], //Linke Bilder
        ['./img/Labrador.jpg','./img/Wolle.jpg','./img/Muetze.jpg'],   // Rechte Bilder
        ['l','r','r'],                                               //richtiges Bild
        './Sounds/sheep.mp3');                                        //Sound (1. Bild)
}

