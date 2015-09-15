/*
 * @package AJAX_Chat
 * @author Sebastian Tschan
 * @copyright (c) Sebastian Tschan
 * @license Modified MIT License
 * @link https://blueimp.net/ajax/
 */

// Overriding client side functionality:


// Example - Overriding the replaceCustomCommands method:
ajaxChat.replaceCustomCommands = function(text, textParts) {
	
	if(ajaxChat.isCustomCommand(textParts[0])){
		switch(textParts[0])
		{
		case '/start_exp':
			//if(this.userRole !== '2' && this.userRole !== '3') window.location.replace("opinion.php");
			return true;
			return false;
			
		case '/round':
			if(this.userRole !== '2' && this.userRole !== '3') window.location.replace("ronda.php");
			return false;
		
		case '/change_opinion':
			return true;
			if(this.userRole !== '2' && this.userRole !== '3') window.location.replace("cambiarOpinion.php");
			return false;
		
		case '/restart_clock':
			ajaxChat.restartChronometer(0);
			//return "restarteado!";
		case '/start_opinion':
			if(this.userRole !== '2' && this.userRole !== '3') ajaxChat.startOpinion();
			return false;
		break;
		case '/end_opinion':
			if(this.userRole !== '2' && this.userRole !== '3') ajaxChat.endOpinion();
			return false;
		break;

		case '/open_chatbox':
			ajaxChat.toggleChatbox(true);
			return false;
		break;
		case '/close_chatbox':
			ajaxChat.toggleChatbox(false);
			return false;
		break;

		case '/close_experiment':
			if(this.userRole !== '2' && this.userRole !== '3')  ajaxChat.goToExitScreen();
			return false;
		case '/restart_admin':
			if(this.userRole == '2' || this.userRole == '3')  ajaxChat.restart();
			return false;
		break;
		}
	}
	return text;
}

ajaxChat.goToExitScreen = function()
{	
	window.location.replace("end.html");
}

ajaxChat.getDatetime = function()
{
	return '2200-10-10 23:00:00';
}

ajaxChat.restartCountdown = function(i)
{
	clearTimeout(this.timeout);
	this.countDown(i);
}

ajaxChat.restartChronometer = function(i)
{
	clearTimeout(this.timeout);
	this.chronometer(i);
}


ajaxChat.nextState = function(state) 
{
	//0 Espera
	//1 Opinion Inicial
	//2 Ronda
	//3 Cambio de opinion
	this.stateFunction(state);
	if( state != 3){
		state = state + 1;
	}
	else
	{
		state = 2;
	}
	this.state = state;
	this.restartCountdown(this.stateTime[state]);

}
		
ajaxChat.stateFunction = function(state)
{
	switch (state){
		case 0:
			this.sendMessageWrapper('/init_exp');
			break;
		case 1:
			this.sendMessageWrapper('/round');
			break;
		case 2:
			this.sendMessageWrapper('/close_round');
			break;
		case 3:
			this.sendMessageWrapper('/round');
			break;
	}
}

ajaxChat.countDown = function (i)
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
	if( this.state != 0 && i <= 0){
		this.nextState(this.state);
		return;
	}


	while(secs > 59)
	{
		secs -= 60;
		mins += 1;
    }

	document.getElementById('countdown').innerHTML = this.checkTime(mins)+":"+this.checkTime(secs);

	if(this.state == 0 ){
		this.timeout=setTimeout(function(){ajaxChat.countDown(i+1)},1000);
	}
	else{
		this.timeout=setTimeout(function(){ajaxChat.countDown(i-1)},1000);
	}
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
	}
}

ajaxChat.restart = function(){
	this.state = 0;
	this.restartCountdown(0);
}

ajaxChat.toggleChatbox = function (show)
{
	$("#inputFieldContainer").css("display", (show? "block": "none"));
	$("#submitButtonContainer").css("display", (show? "block": "none"));
	
}


ajaxChat.startOpinion = function ()
{
	$("#bbCodeContainer").css("display", "block");
}

ajaxChat.endOpinion = function ()
{
	$("#bbCodeContainer").css("display", "none");	
}

ajaxChat.checkTime = function (i)
{

	if (i<10) i="0" + i;
	return i;
}


// Override to add custom initialization code
	// This method is called on page load
ajaxChat.customInitialize = function() {		
	if(this.userRole == 3){
		this.chronometer = this.countDown;
		this.chronometer(0);
	}
	//this.chronometer(30);
	this.setAudioVolume(0.0);
}






ajaxChat.getUserNodeStringItems =  function(encodedUserName, userID, isInline) {
		var menu;
		if(encodedUserName !== this.encodedUserName) { // otro usuario
			menu = '';
			if(this.userRole === '2' || this.userRole === '3') { //admin y moderadores
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapperIfConfirm(\'/kick '
						+ encodedUserName
						+ ' \',\'Está seguro que desea desloguear a este usuario? Las rondas calculadas se corromperán.\');">'
						+ this.lang['userMenuKick']
						+ '</a></li>';
			}
		} 
		else 
		{
			menu 	= '';
			if(this.userRole === '2' || this.userRole === '3') { //admin y moderadores
				menu	+= '<li>---------------------</li>';
				menu	+= '<li>Inicialización</li>';
				menu	+= '<li><a href="javascript:ajaxChat.nextState(0);">1) Iniciar Experimento </a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/init_game\');">1 a) Calcular rondas de chat</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/ask_initial_opinion\');ajaxChat.restartChronometer(0);">1 b) Pedir opinion inicial</a></li>';
				menu	+= '<li>---------------------</li>';
				menu	+= '<li>Rondas</li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/round\');">3 a) Avanzar un paso</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/close_round\');">3 b) Pedir opinion <br />(y avisar fin de ronda)</a></li>';
				menu	+= '<li>---------------------</li>';
				menu	+= '<li>Barra de opinión</li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/start_opinion\');">Habilitar</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/end_opinion\');">Deshabilitar</a></li>';
				menu	+= '<li>---------------------</li>';
				menu	+= '<li>Chatbox</li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/open_chatbox\');">Habilitar</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/close_chatbox\');">Deshabilitar</a></li>';
				menu	+= '<li>---------------------</li>';
				menu	+= '<li>Cierre</li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapper(\'/restart_clock\');">Reiniciar clock</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapperIfConfirm(\'/close_experiment\', \'Este paso es irreversible. Está seguro que quiere redirigir a todos los usuarios a la pantalla de finalización?\');">Redirigir a pantalla de finalización</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.sendMessageWrapperIfConfirm(\'/empty_messages\', \'Vaciará todos los datos generados. Está seguro que desea continuar?\');">Borrar todo</a></li>';
				menu	+= '<li><a href="javascript:ajaxChat.kickAll();ajaxChat.restart();">Desloguear a todos</a></li>';

				

			}
		}
		menu += this.getCustomUserMenuItems(encodedUserName, userID);
		return menu;
}

ajaxChat.sendMessageWrapperIfConfirm = function(message, confirmation_message)
{
	if(confirm(confirmation_message))
	{
		return this.sendMessageWrapper(message);
	}
}

ajaxChat.kickAll = function()
{
	if(!confirm("Deslogueará a todos los usuarios. Está serguro que desea continuar?")) return false;
	this.sendMessageWrapper('/kick_all');
	/*var id, userName;
	for(var i = 0; i < this.usersList.length; i++)
	{

		if(this.usersList[i] != "1")
		{
			userName = this.getUserNameFromUserID(this.usersList[i]);
			this.sendMessageWrapper("/kick "+userName);
		}
	}*/
}
