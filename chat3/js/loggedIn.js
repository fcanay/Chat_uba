ajaxChat.customOnNewMessage = function(dateObject, userID, userName, userRole, messageID, messageText, channelID, ip)
{
	
	switch(messageText)
	{
		case '/close_experiment':
		case '/close_chatbox':
		case '/open_chatbox':
		case '/end_opinion':
		case '/start_opinion':
		case '/restart_clock':
		case '/opinion':
		case '/restart_admin':
			var textParts = messageText.split(' ');	
			return this.replaceCustomCommands(messageText, textParts);
		break;

		default:
			return true;
		break;
	}
	
	return true;
}

ajaxChat.isCustomCommand = function(command)
{
	switch(command)
	{
		case '/close_experiment':
		case '/close_chatbox':
		case '/open_chatbox':
		case '/end_opinion':
		case '/start_opinion':
		case '/restart_clock':
		case '/opinion':
		case '/restart_admin':
		 	return true;
		break;
		default:
			return false;
		break;
	}
}