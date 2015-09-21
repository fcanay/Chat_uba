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

	document.getElementById('chronometer').innerHTML = this.checkTime(mins)+":"+this.checkTime(secs);
	if(i>0){
		this.timeout=setTimeout(function(){ajaxChat.chronometer(i-1)},1000);
	}else{
		this.cambiarOpinion();
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
	document.getElementById('mensajePrincipal').innerHTML = this.lang.initialQuestion;

	document.getElementById('imagenTablero').width = 800;
	document.getElementById('imagenTablero').height = 400;

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "55%";

	
	document.getElementById('bbCodeContainer').style.display = "block";
	document.getElementById('bbCodeContainer').style.bottom = "";

	document.getElementById('bbCodeContainerOponent').style.display = "none";

	document.getElementById('chronometer').style.display = "block";

/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.ronda = function(oponent,opinion){
	document.getElementById('mensajePrincipal').innerHTML = this.lang.round + oponent;

	document.getElementById('imagenTablero').width = 600;
	document.getElementById('imagenTablero').height = 300;

	document.getElementById('chessImg').style.top = "45%";

	document.getElementById('bbCodeContainer').style.bottom = "15%";

	document.getElementById('bbCodeContainerOponent').style.display = "block";

	document.getElementById('slider-horizontal-oponent').style.display = "block";


	//Cambiar la opinion del oponente
	document.getElementById('opinion-oponent').innerHTML = "Valoración usuario " + oponent +":"+  this.lang.label_names[opinion];

/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.cambiarOpinion = function(){
	document.getElementById('mensajePrincipal').innerHTML = this.lang.changeOpinion;
}

ajaxChat.end = function(){
	window.location.replace("end.html");
}

ajaxChat.nextState = function() 
{
	var stateFunction = [this.opinionInicial,this.ronda,this.cambiarOpinion,this.end];
	//0 Espera
	//1 Opinion Inicial
	//2 Ronda
	//3 Cambio de opinion
	if( this.state != 3){
		this.state = this.state + 1;
	}
	else
	{
		this.state = 2;
	}
	stateFunction[this.state-1]();
	this.restartChronometer(this.stateTime[this.state]);

}