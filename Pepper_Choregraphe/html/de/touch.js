var locked = false;
var memory;
var dialogs;

getDialogs('../Dialogs.txt');
// function to catch missing console on robot
// only usable if used on local browser
function logthis(message){
	try{
		console.log(message);
	} catch(err){}
}
// Callback touch event
/*function onTouchDown(data){
	logthis("touch down");
	if( !locked ){
	
		// recalculate data
		x = data[0] * $(document).width();
		y = data[1] * $(document).height();
	
		// get element
		locked = true;
		var el = document.elementFromPoint(x, y);
		
		if( el != null ){
			// create and sipatch event
			var ev = new MouseEvent('click', {
				'view': window,
				'bubbles': true,
				'cancelable': false
			});
			el.dispatchEvent(ev);
			logthis(el);
			// check if element or parent element is button
			if( el.tagName == 'BUTTON' ){
				logthis(el);
				sendData(el.id);
			} else if( el.parentElement != null && el.parentElement.tagName == 'BUTTON' ){
				logthis(el.parentElement);
				sendData(el.id);
			}
		}
		
	}
}*/
function sendData(buttonID){
	// get the correct Dialogs to send it to choregraphe
	if (dialogs == null){
		getDialogs('../Dialogs.txt');
	}
	var out = [];
	if(buttonID.length === 2){

		var number = parseInt(buttonID[1]);
		if (buttonID[0] === 'c'){
			// dialog for correct image
			out.push(dialogs[number][1]);
		} else if (buttonID[0] === 'f' ){
			// wrong answer
			out.push(dialogs[number][2]);
		} else if (buttonID[0] === 'm' ){
			// wrong answer was given multiple times
			out.push(dialogs[number][3]);
		} else {
			//some unknown button was called
			logthis('Unknown button called: ' + buttonID);
			return;
		}
		if (dialogs[number].length > 4){
			if (dialogs[number].length < 6) {
				//last Round finished
				out.push(dialogs[number][4]);
			}else {
				// dialog for new round
				out.push(dialogs[number][5]);
			}
		}
		if (dialogs.length > (number + 1)){
			// introduction into new task
			out.push(dialogs[number + 1][0]);
		}
		logthis(out);
		memory.raiseEvent( "custom/tablet/onButtonClick", out );
	} else if (buttonID === 'ITWBauernhof'){
		out.push(dialogs[0][0]);
		out.push(dialogs[0][1]);
		out.push(dialogs[1][0]);
		logthis(out);
		memory.raiseEvent( "custom/tablet/onButtonClick", out );
	}
}
//catch the Dialogs from a .txt file
function getDialogs(path){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", path, true);
	var current = null;
	dialogs = [];
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status === 0)
			{
				// File was successfully read
				var lines = rawFile.responseText.split('\n');

				for (var i = 0; i < lines.length; i++){
					//logthis(lines[i]);
					if (lines[i].length < 2){
						// empty lines are ignored
						continue;
					}else if(lines[i][0] === '$'){
						// new Dialog started
						if (current != null) {
							dialogs.push(current);
						}
						current = [lines[i].substr(1).replace('\r','')];
					} else if(current != null) {
						current.push(lines[i].replace('\r',''));
					}
				}
				dialogs.push(current);
			}
		}
	};

	rawFile.send(null);
	logthis(dialogs);
}

function alOnClick(value){
	memory.raiseEvent( "custom/tablet/onButtonClick", value );
}

function onTouchUp(){
	locked = false;
}

// NAOqi connected
function onConnected(session){
	logthis("connected to naoqi");
	session.service("ALMemory").then( 
		function (service){
			memory = service;
			RobotUtils.subscribeToALMemoryEvent( "custom/tablet/onTouchDown", onTouchDown );
			RobotUtils.subscribeToALMemoryEvent( "custom/tablet/onTouchUp", onTouchUp );
			
			// set website alive interval
			setInterval( function(){
				memory.raiseEvent( "custom/tablet/alive", 1 );
			}, 1000 );
		},
		function (error) {}
	);
}

// NAOqi disconnected
function onDisconnected(){
	alert("Disconnected from NAOqi!");
}

// ------ MAIN ------
$( document ).ready(function() {
	logthis("document ready");

    // connect to naoqi
    // function will wait half a second after document is ready,
    // because connected sometimes fails if done without timeout.
    setTimeout( function(){
    	logthis("connecting to naoqi...");
		RobotUtils.connect( onConnected, onDisconnected );
	}, 500 );
});



