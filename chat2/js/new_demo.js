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
		document.getElementById('loginForm').submit();
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
	//document.getElementById('mensajePrincipal').innerHTML = ajaxChat.lang.initialQuestion;
	//document.getElementById('imagenTablero').width = 720;
	//document.getElementById('imagenTablero').height = 360;

	//document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "55%";

	//document.getElementById('movida').style.display = "block";

	//document.getElementById('emoticonsContainer').style.display = "block";
		
	//document.getElementById('bbCodeContainer').style.display = "block";
	document.getElementById('bbCodeContainer').style.bottom = "";

	//document.getElementById('bbCodeContainerOponent').style.display = "none";

	//document.getElementById('clockContainer').style.display = "block";

/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.ronda = function(oponent,opinion,argumentos){
	this.cambioDeRonda(oponent);

	setTimeout(function(){ajaxChat.displayRonda(oponent,opinion,argumentos)},5000);
	


/*
	$('#mensajePrincipal').innerHTML = 'Evalúe la siguiente posición sabiendo que es el turno de las Blancas. Para mayor comodidad en el análisis, los tableros muestran la misma posición desde ambos lados.';
	
	$('#imagenTablero').width = 600;
	$('#imagenTablero').height = 300;
*/
}

ajaxChat.displayRonda = function(oponent,opinion,argumentos){
	//document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.round) + " " + oponent;


	document.getElementById('emoticonsContainer').style.display = "block";
	document.getElementById('emoticonsContainer').style.top = "17%";

	document.getElementById('ArgumentContainer').style.display = "block";
	document.getElementById('ArgumentContainer').style.top = "69%";

	document.getElementById('ArgumentContainerOponent').style.display = "block";

	document.getElementById('movida').style.display = "block";
	
	document.getElementById('imagenTablero').width = 600;
	document.getElementById('imagenTablero').height = 300;
	document.getElementById('imagenTablero').style.animation= "";

	document.getElementById('chessImg').style.display = "block";
	document.getElementById('chessImg').style.top = "45%";
	document.getElementById('chessImg').style.left = "0%";
	document.getElementById('chessImg').style.webkitTransform = "translate(10%, -50%)";
	document.getElementById('chessImg').style.transform = "translate(10%, -50%)";
	document.getElementById('chessImg').style.MozTransform = "translate(10%, -50%)";

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
	for (var i = argumentos.length - 1; i >= 0; i--) {
		if(argumentos[i].length == 2){
			this.display_oponent_argument(argumentos[i][0],argumentos[i][1]);
		}
		else if(argumentos[i].length == 4){
			this.display_oponent_movida(argumentos[i][0],argumentos[i][1],argumentos[i][2],argumentos[i][3]);
		}
	};

	//setTimeout(function(){ajaxChat.displayImage(oponent)},5000);
}

ajaxChat.cambioDeRonda = function(oponent){
	document.getElementById('chessImg').style.display = "none";
	document.getElementById('bbCodeContainer').style.display = "none";
	document.getElementById('bbCodeContainerOponent').style.display = "none";
	document.getElementById('emoticonsContainer').style.display = "none";
	document.getElementById('ArgumentContainer').style.display = "none";
	document.getElementById('movida').style.display = "none";
	document.getElementById('ArgumentContainerOponent').style.display = "none";
	document.getElementById('mensajePrincipal').innerHTML = (ajaxChat.lang.round) + " " + oponent;
	this.undisplay_oponent_argument();
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
	console.log("state change en demo");
	return;
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
		//ajaxChat.sendMessage("/add_argument "+ argument+" "+color);
		this.argumentos[[argument,color]] = 0;
		this.display_argument(argument,color);
	}
}

ajaxChat.agregar_movida = function(){
	pieza = document.getElementById('pieza').options[document.getElementById('pieza').selectedIndex].value;
	col = document.getElementById('columna').options[document.getElementById('columna').selectedIndex].value;
	fila = document.getElementById('fila').options[document.getElementById('fila').selectedIndex].value;
	color = document.getElementById('color').options[document.getElementById('color').selectedIndex].value;



	if(this.argumentos[[pieza,col,fila,color]] == undefined &&  Object.keys(this.argumentos).length < this.maxArguments){ //Arguments is cliked
		//console.log("/add_movida '"+ pieza+"' '"+col+"' "+fila);
		//ajaxChat.sendMessage("/add_movida '"+ pieza+"' '"+col+"' "+fila);
		this.argumentos[[pieza,col,fila,color]] = 0;
		this.display_movida(pieza,col,fila,color);
	}

}

ajaxChat.display_movida = function(pieza,col,fila,color){
	var para = document.createElement("p");
	para.setAttribute("style","border:2px solid grey;display:inline-block;margin-left:2px;margin-right:2px");
	var t = document.createTextNode("  "+this.lang.piezas[pieza]+" "+col+fila+"  "+this.color_to_name(color)+" ");
	para.appendChild(t);
	img = document.createElement("img");
	img.setAttribute("src","./img/delete.png");
	a = document.createElement("a");
	a.setAttribute("href","javascript:ajaxChat.remove_movida('"+pieza+"','"+col+"',"+fila+","+color+");");
	a.appendChild(img);
	para.appendChild(a);
	document.getElementById("ArgumentContainerP").appendChild(para);
	/*document.getElementById("ArgumentContainerP").appendChild(t);
	document.getElementById("ArgumentContainerP").appendChild(a);*/

}


ajaxChat.display_argument = function(argument,color){
	var para = document.createElement("p");
	para.setAttribute("style","border:2px solid grey;display:inline-block;margin-left:2px;margin-right:2px");
	var t = document.createTextNode("  "+this.emoticonNames[argument-1]+" "+this.color_to_name(color)+"  ");
	para.appendChild(t);
	img = document.createElement("img");
	img.setAttribute("src","./img/delete.png");
	a = document.createElement("a");
	a.setAttribute("href","javascript:ajaxChat.remove_argument("+argument+","+color+");");
	a.appendChild(img);
	para.appendChild(a);
	document.getElementById("ArgumentContainerP").appendChild(para);
	/*document.getElementById("ArgumentContainerP").appendChild(t);
	document.getElementById("ArgumentContainerP").appendChild(a);*/

}
ajaxChat.remove_argument= function(argument,color){
	//ajaxChat.sendMessage("/remove_argument "+argument+" "+color);
	delete this.argumentos[[argument,color]];
	this.undisplay_argument(argument,color);
}
ajaxChat.remove_movida= function(pieza,col,fila,color){
	//ajaxChat.sendMessage("/remove_movida '"+pieza+"' '"+col+"' "+fila );
	delete this.argumentos[[pieza,col,fila,color]];
	this.undisplay_movida(pieza,col,fila,color);
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
	for (i = 0; i < arg.childNodes.length; i++) {
		n = arg.childNodes[i].childNodes[1].getAttribute("href");
		if(n.search("\\("+argument+","+color) != -1){
			arg.removeChild(arg.childNodes[i]);
			break;
		}
	}	
}

ajaxChat.undisplay_movida = function(pieza,col,fila,color){
	arg = document.getElementById("ArgumentContainerP");
	for (i = 0; i < arg.childNodes.length; i++) {
		n = arg.childNodes[i].childNodes[1].getAttribute("href");
		if(n.search("\\('"+pieza+"','"+col+"',"+fila+","+color) != -1){
			arg.removeChild(arg.childNodes[i]);
			break;
		}
	}	
}

ajaxChat.display_oponent_argument = function(argument,color){
	var t = document.createTextNode("  "+this.emoticonNames[argument-1]+" "+this.color_to_name(color)+"  ");
	document.getElementById("ArgumentContainerOponentP").appendChild(t);
}

ajaxChat.display_oponent_movida = function(pieza,col,fila,color){
	var t = document.createTextNode("  "+this.lang.piezas[pieza]+" "+col+fila+" "+this.color_to_name(color)+" ");
	document.getElementById("ArgumentContainerOponentP").appendChild(t);
}

ajaxChat.undisplay_oponent_argument = function(){
	var myNode = document.getElementById("ArgumentContainerOponentP");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}

ajaxChat.build_array = function(array){
	res = array.split(";");
	for (i = 0; i < res.length; i++) {
		console.log(i);
		console.log(res[i]);
		res[i] = res[i].split('|');
		if(res[i].length == 2){
	    	res[i][0] = parseInt(res[i][0]);
	    	res[i][1] = parseInt(res[i][1]);
		}
		else if(res[i].length == 4){
	    	res[i][2] = parseInt(res[i][2]);
	    	res[i][2] = parseInt(res[i][3]);
		}
	}
	console.log(res);
	return res;
}

ajaxChat.handleLogout = function(url) {
		return;
}

ajaxChat.changeImage = function(){
	var imagen = document.getElementById("imagenTablero");
	imagen.src = imagen.src.replace(this.tablero + this.imagen,this.tablero + ((this.imagen + 1)%2));
	this.imagen = (this.imagen + 1) % 2; 
}