let session = QiSession();

function onButtonClick(){
    let speechService = session.service('ALAudioPlayerProxy');
    speechService.loadFile('../Sounds/kuh.mp3');
    speechService.play();
}