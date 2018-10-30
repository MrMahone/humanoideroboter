let session = QiSession();

function onButtonClick(){
    let speechService = session.service('ALAudioPlayerProxy');
    speechService.loadFile('../Sounds/cow.mp3');
    speechService.play();
}