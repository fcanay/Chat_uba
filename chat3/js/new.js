ajaxChat.getDatetime = function()
{
	return '2200-10-10 23:00:00';
}

ajaxChat.restartChronometer = function(i)
{
	clearTimeout(this.timeout);
	this.chronometer(i);
}


ajaxChat.chronometer = function (i)
{
	/*var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	// add a zero in front of numbers<10
	m=this.checkTime(m);
	s=this.checkTime(s);
	*/
	var mins = 0;
	var secs = i;
	
	while(secs > 59)
	{
		secs -= 60;
		mins += 1;
    }

    if(i == 10 && this.state > 0){
		document.getElementById('imagenTablero').style.animation= "blink .5s step-end infinite alternate";
    }
	document.getElementById('chronometer').innerHTML = "<h4>"+this.checkTime(mins)+":"+this.checkTime(secs)+"</h4>";
	document.getElementById('chronometer').style.color = "black" ;

	//	document.getElementById('chronometer').style.font_weight = "bold" ;
	if(i>0){
		this.timeout=setTimeout(function(){ajaxChat.chronometer(i-1)},1000);
	}else{
		//this.cambiarOpinion();
	}
}

ajaxChat.checkTime = function (i)
{

	if (i<10) i="0" + i;
	return i;
}

// Override to add custom initialization code
	// This method is called on page load
ajaxChat.customInitialize = function() {	
	this.setAudioVolume(0.0);
	this.state = 0;
}

ajaxChat.opinionInicial = function(){
	document.getElementById('mensajePrincipal').innerHTML = ajaxChat.lang.initialQuestion;
	document.getElementById('imagenTablero').width = 720;
	document.getElementById('imagenTablero').height = 360;

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "55%";

	document.getElementById('emoticonsContainer').style.display = "block";
		
	document.getElementById('bbCodeContainer').style.display = "block";
	document.getElementById('bbCodeContainer').style.bottom = "";

	document.getElementById('bbCodeContainerOponent').style.display = "none";

	document.getElementById('clockContainer').style.display = "block";

/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.ronda = function(oponent,opinion,argumentos){
	console.log("ronda");
	this.cambioDeRonda(oponent);
	setTimeout(function(){ajaxChat.displayRonda(oponent,opinion,argumentos)},5000);
	console.log('argumentos');
	console.log(argumentos);
	


/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.displayRonda = function(oponent,opinion,argumentos){
	//document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.round) + " " + oponent;

	console.log("displayRonda");

	document.getElementById('emoticonsContainer').style.display = "block";
	document.getElementById('emoticonsContainer').style.top = "69%";

	document.getElementById('emoticonsContainerOponent').style.display = "block";
	
	document.getElementById('imagenTablero').width = 600;
	document.getElementById('imagenTablero').height = 300;
	document.getElementById('imagenTablero').style.animation= "";

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "45%";

	document.getElementById('bbCodeContainer').style.bottom = "20%";
	document.getElementById('bbCodeContainer').style.display = "block";

	document.getElementById('bbCodeContainerOponent').style.bottom = "11%";
	document.getElementById('bbCodeContainerOponent').style.display = "block";

	document.getElementById('slider-horizontal-oponent').style.display = "block";
	this.aux(opinion);

	//Cambiar la opinion del oponente
	document.getElementById('opinion-oponent').innerHTML = "Valoración usuario " + oponent +":"+  ajaxChat.lang.label_names[opinion];
	document.getElementById('clockContainer').style.display = "block";
	//document.querySelectorAll(".ui-slider-handle")[1].style.background = "#"+ajaxChat.handleColor(opinion);
	document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.roundDos) + " " + oponent + " " + ajaxChat.lang.changeOpinion;

	for(var i=0; i<this.emoticonCodes.length; i++) {
		document.getElementById('OpArg'+i).style.border= "";
	}
	for(var i=0; i<argumentos.length; i++) {
		document.getElementById('OpArg'+argumentos[i]).style.border= "2px solid #0c95d9";
	}
	//setTimeout(function(){ajaxChat.displayImage(oponent)},5000);
}

ajaxChat.cambioDeRonda = function(oponent){
	console.log("cambioDeRonda");
	document.getElementById('chessImg').style.display = "none";
	document.getElementById('bbCodeContainer').style.display = "none";
	document.getElementById('bbCodeContainerOponent').style.display = "none";
	document.getElementById('emoticonsContainer').style.display = "none";
	document.getElementById('emoticonsContainerOponent').style.display = "none";
	document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.round) + " " + oponent;
}

ajaxChat.displayImage = function(oponent){
	
document.getElementById('chessImg').style.display = "block";
document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.roundDos) + " " + oponent + " " + ajaxChat.lang.changeOpinion;
}

ajaxChat.aux = function(opinion){
	$("#slider-horizontal-oponent").slider('option','value',opinion);
	//handle.style.background = "#"+ajaxChat.handleColor(opinion);
	//document.getElementById('slider-horizontal-oponent')
	//document.querySelectorAll(".ui-slider-handle")[1].style.background = "#"+ajaxChat.handleColor(opinion);
	$("#slider-horizontal-oponent").find('.ui-slider-handle')[0].style.background = "#"+ajaxChat.handleColor(opinion);
}

ajaxChat.handleColor = function(value){
	//console.log(value);
	switch(value){
		case 0:
		case 1:
		case 2:
			return "ffffff";
		case 3:
		case 4:
		case 5:
			return "777777";
		case 6:
		case 7:
		case 8:
			return "000000";
		default:
			console.log("handleColor, case no reconocido")
			console.log(value);
	}
	
}
ajaxChat.cambiarOpinion = function(){
//	document.getElementById('mensajePrincipal').innerHTML = ajaxChat.lang.changeOpinion;
	document.getElementById('imagenTablero').style.animation= "";
	document.getElementById('clockContainer').style.display = "block";

}

ajaxChat.end = function(){
	window.location.replace("end.html");
}

ajaxChat.handleStateChange = function(parts){
	parts = parts.split(",");
	this.state = parseInt(parts[0]);
	console.log("Handle State Change " + parts.toString());
	console.log(parts);
	switch(this.state){
		case 1:
			this.opinionInicial();
			break;
		case 2:
			console.log("handleStateChange 2");
			if(parts.length >= 4){
				console.log("entre");

				array = this.build_array(parts[3]);
				this.ronda(parts[1],parseInt(parts[2]),array);
				//document.querySelectorAll(".ui-slider-handle")[1].style.background = "#"+ajaxChat.handleColor(parts[2]);

			}
			else{
				console.log("Error: cambio de estado sin parametros suficientes" + parts.toString());
			}
			break;
		case 3:
			this.end();
			break;
		default:
			console.log("WTF");
			break;
	}
	this.restartChronometer(this.stateTime[this.state]);
}

ajaxChat.getChatName = function(userID){
	if(this.userID == userID){
		return 'Yo';
	}
	else{
		return 'usuario ' + userID;
	}

}

ajaxChat.argumentCliked = function(argument,color){
	if(this.argumentos[[argument,color]] == undefined &&  Object.keys(this.argumentos).length < this.maxArguments){ //Arguments is cliked
		ajaxChat.sendMessage("/add_argument "+ argument+" "+color);
		this.argumentos[[argument,color]] = 0;
		this.display_argument(argument,color);

		//agregar a la lista
		//display argument
	}
/*
	else{
		ajaxChat.sendMessage("/remove_argument "+argument+" "+color);
		delete this.argumentos[[argument,color]];
		this.display_argument(argument,color);
		//sacar de la lista
		//undisplay argument
	}*/
}

ajaxChat.display_argument = function(argument,color){
	//var para = document.createElement("p");
	//para.setAttribute("style","border:1px solid grey");
	var t = document.createTextNode("  "+this.emoticonNames[argument-1]+" "+this.color_to_name(color));
	//para.appendChild(t);
	img = document.createElement("img");
	img.setAttribute("src","./img/delete.png");
	a = document.createElement("a");
	a.setAttribute("href","javascript:ajaxChat.remove_argument("+argument+","+color+");");
	a.appendChild(img);
	//para.appendChild(a);
	document.getElementById("ArgumentContainerP").appendChild(t);
	document.getElementById("ArgumentContainerP").appendChild(a);

}
ajaxChat.remove_argument= function(argument,color){
	ajaxChat.sendMessage("/remove_argument "+argument+" "+color);
	delete this.argumentos[[argument,color]];
	this.undisplay_argument(argument,color);
}


ajaxChat.color_to_name = function(color){
	if(color == 0){
		return "Blanco";
	}
	if (color == 1){
		return "Negro";
	}
}

ajaxChat.undisplay_argument = function(argument,color){
	arg = document.getElementById("ArgumentContainerP");
	for (i = 1; i < arg.childNodes.length; i+=2) {
		n = arg.childNodes[i].getAttribute("href");
		if(n.search(argument+","+color) != -1){
			arg.removeChild(arg.childNodes[i]);
			arg.removeChild(arg.childNodes[i-1]);
			break;
		}
	}
	
}

ajaxChat.build_array = function(array){
	res = array.split(";");
	for (i = 0; i < res.length; i++) {
		console.log(i);
		console.log(res[i]);

    	res[i] = parseInt(res[i]);
	}
	console.log(res);
	return res;
}