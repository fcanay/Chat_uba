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
		document.getElementById('chronometer').innerHTML = "<h2>"+this.checkTime(mins)+":"+this.checkTime(secs)+"</h2>";
		//document.getElementById('chronometer').style.color = "red" ;
		document.getElementById('imagenTablero').style.animation= "blink .5s step-end infinite alternate";
    }
    else{
		document.getElementById('chronometer').innerHTML = "<h4>"+this.checkTime(mins)+":"+this.checkTime(secs)+"</h4>";
		document.getElementById('chronometer').style.color = "black" ;
    }
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
	document.getElementById('imagenTablero').width = 800;
	document.getElementById('imagenTablero').height = 400;

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "55%";

		
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

ajaxChat.ronda = function(oponent,opinion){
	this.cambioDeRonda(oponent);
	setTimeout(function(){ajaxChat.displayRonda(oponent,opinion)},5000);
	


/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.displayRonda = function(oponent,opinion){
	//document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.round) + " " + oponent;

	document.getElementById('chatList').style.display = "block";

	document.getElementById('emoticonsContainer').style.display = "block";


	document.getElementById('imagenTablero').width = 600;
	document.getElementById('imagenTablero').height = 300;
	document.getElementById('imagenTablero').style.animation= "";

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "45%";
	document.getElementById('chessImg').style.left = "70%";

	document.getElementById('bbCodeContainer').style.bottom = "15%";
	document.getElementById('bbCodeContainer').style.display = "block";

	document.getElementById('bbCodeContainerOponent').style.display = "block";

	document.getElementById('slider-horizontal-oponent').style.display = "block";
	this.aux(opinion);

	//Cambiar la opinion del oponente
	document.getElementById('opinion-oponent').innerHTML = "Valoración usuario " + oponent +":"+  ajaxChat.lang.label_names[opinion];
	document.getElementById('clockContainer').style.display = "block";
	//document.querySelectorAll(".ui-slider-handle")[1].style.background = "#"+ajaxChat.handleColor(opinion);
	document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.roundDos) + " " + oponent + " " + ajaxChat.lang.changeOpinion;

	//setTimeout(function(){ajaxChat.displayImage(oponent)},5000);
}

ajaxChat.cambioDeRonda = function(oponent){
	document.getElementById('chessImg').style.display = "none";
	document.getElementById('bbCodeContainer').style.display = "none";
	document.getElementById('bbCodeContainerOponent').style.display = "none";
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
			if(parts.length >= 3){
				this.ronda(parts[1],parseInt(parts[2]));
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
