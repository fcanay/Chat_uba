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
		case '/start_exp':
			var textParts = messageText.split(' ');	
			this.replaceCustomCommands(messageText, textParts);
		 	return false;
		break;

		default:
			return true;
		break;
	}
	
	return true;
}