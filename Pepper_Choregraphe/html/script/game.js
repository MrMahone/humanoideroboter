//let session = QiSession();
let idGame; //id für Auswahl der Spielreihe

function onButtonClick(){
    //let speechService = session.service('ALAudioPlayerProxy');
    //speechService.loadFile('../Sounds/cow.mp3');
    //speechService.play();
}
function onLoad(){
    idGame = 0;
    let imgLeft = document.getElementById('IimgLeft');
    let imgright = document.getElementById('IimgRight');
    if(idGame == 0) {
        imgLeft.src = './img/kuh.jpg';
        imgright.src = './img/ratte.jpg';
    }
}

function onRightImgClick(){

}

function onLeftImgClick(){

}