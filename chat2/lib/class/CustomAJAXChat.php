<?php
/*
 * @package AJAX_Chat
 * @author Sebastian Tschan
 * @copyright (c) Sebastian Tschan
 * @license Modified MIT License
 * @link https://blueimp.net/ajax/
 */

class CustomAJAXChat extends AJAXChat {
	
	var $_html;
	
	function __construct($html,$handle_request = true)
	{
		$this->_html = $html;
	   	if(!$handle_request)
	   	{
	   		// Initialize configuration settings:
			$this->initConfig();

			// Initialize the DataBase connection:
			$this->initDataBaseConnection();
			// Initialize request variables:
			$this->initRequestVars();
			
			// Initialize the chat session:
			$this->initSession();
	   	}
	   	else
	   	{
	   		parent::__construct();
	   	}
	}

	function manageUpdate(){
		$httpHeader = new AJAXChatHTTPHeader($this->getConfig('contentEncoding'), $this->getConfig('contentType'));

		$state = $this->getUserState();
		$res = strval($state);
		switch($state) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					$oponent = $this->getOponent();
					$res .= ','.$oponent.','.$this->getOponentOpinion($oponent).',';
					$opArg = $this->getOponentArguments($oponent);
					$opMov = $this->getOponentMovidas($oponent);
					foreach ($opArg as $value) {
						$res .= $value[0].'|'.$value[1] . ';';
					}
					foreach ($opMov as $value) {
						$res .= $value[0].'|'.$value[1]."|".$value[2]."|".$value[3] . ';';
					}
					$res = rtrim($res, ";");
					//$res .= '';
					break;
				case 3:
					break;
		}
		$httpHeader->send();
		echo '<?xml version="1.0" encoding="UTF-8" ?>
				<!DOCTYPE Edit_Mensaje SYSTEM "Edit_Mensaje.dtd">
				<update>'.$res.'</update>';
	}

	function generateValidUsername()
	{
		

		$onlineUsersData = $this->getOnlineUsersData();
		
		$userName = "usuario". str_pad((string)rand(1,4000), 4, "0", STR_PAD_LEFT);
		$listo = false;
		while(!$listo)
		{
			$existe = false;
			foreach($onlineUsersData as $onlineUser)
			{
				if($userName == $onlineUser["userName"]) 
				{
					$existe = true;
					break;
				}
			}

			if($existe) $userName = "usuario". str_pad((string)rand(1,4000), 4, "0", STR_PAD_LEFT);
			else return $userName;
		}
		
					
	}

	// Returns an associative array containing userName, userID and userRole
	// Returns null if login is invalid
	function getValidLoginUserData() {
		$customUsers = $this->getCustomUsers();
		
		if($this->getRequestVar('password')) {
			// Check if we have a valid registered user:

			$userName = $this->getRequestVar('userName');
			$userName = $this->convertEncoding($userName, $this->getConfig('contentEncoding'), $this->getConfig('sourceEncoding'));

			$password = $this->getRequestVar('password');
			$password = $this->convertEncoding($password, $this->getConfig('contentEncoding'), $this->getConfig('sourceEncoding'));

			foreach($customUsers as $key=>$value) {
				if(($value['userName'] == $userName) && ($value['password'] == $password)) {
					$userData = array();
					$userData['userID'] = $key;
					$userData['userName'] = $this->trimUserName($value['userName']);
					$userData['userRole'] = $value['userRole'];
					return $userData;
				}
			}
			
			return null;
		} else {
				$userName = $this->getRequestVar('userName');
				$userName = $this->convertEncoding($userName, $this->getConfig('contentEncoding'), $this->getConfig('sourceEncoding'));

				$userName = $this->generateValidUsername();

				$onlineUsersData = $this->getOnlineUsersData();
				
				//if($userName == "admin") return null;
				/*
				$id = 2;
				//echo "<pre>";
				//print_r($onlineUsersData);
				foreach($onlineUsersData as $onlineUser)
				{
					if($userName == $onlineUser["userName"]) return null;
					
					$id++;
				}
					*/
				
				$userData = array();
				$userData['userID'] = $this->createGuestUserID();
				$userData['userName'] = $this->trimUserName($userName);
				$userData['userRole'] = AJAX_CHAT_USER;
				$userData['channels'] = array_values($this->getAllChannels());
				//print_r($userData);
				//die();
				return $userData;
		}

	
	}

	// Returns an associative array containing userName, userID and userRole
	// Returns null if login is invalid
	function getValidLoginUserDataOld() {
		
		$customUsers = $this->getCustomUsers();
		
		if($this->getRequestVar('password')) {
			// Check if we have a valid registered user:

			$userName = $this->getRequestVar('userName');
			$userName = $this->convertEncoding($userName, $this->getConfig('contentEncoding'), $this->getConfig('sourceEncoding'));

			$password = $this->getRequestVar('password');
			$password = $this->convertEncoding($password, $this->getConfig('contentEncoding'), $this->getConfig('sourceEncoding'));

			foreach($customUsers as $key=>$value) {
				if(($value['userName'] == $userName) && ($value['password'] == $password)) {
					$userData = array();
					$userData['userID'] = $key;
					$userData['userName'] = $this->trimUserName($value['userName']);
					$userData['userRole'] = $value['userRole'];
					return $userData;
				}
			}
			
			return null;
		} else {
			// Guest users:
			return $this->getGuestUser();
		}
	}

	// Store the channels the current user has access to
	// Make sure channel names don't c ontain any whitespace
	function &getChannels() {
		$this->_channels = array();
		
		$customUsers = $this->getCustomUsers();
		
		
		// Add the valid channels to the channel list (the defautlChannelID is always valid):
		foreach($this->getAllChannels() as $key=>$value) {
			if ($value == $this->getConfig('defaultChannelID')) {
				$this->_channels[$key] = $value;
				continue;
			}
			// Check if we have to limit the available channels:
			if($this->getConfig('limitChannelList') && !in_array($value, $this->getConfig('limitChannelList'))) {
				continue;
			}
			
			$this->_channels[$key] = $value;
			
		}

		return $this->_channels;
	}

	// Store all existing channels
	// Make sure channel names don't contain any whitespace
	function &getAllChannels() {
		// Get all existing channels:
		$this->_allChannels = array();
		$customChannels = $this->getCustomChannels();
			
		$defaultChannelFound = false;
		
		foreach($customChannels as $name=>$id) {
			$this->_allChannels[$this->trimChannelName($name)] = $id;
			if($id == $this->getConfig('defaultChannelID')) {
				$defaultChannelFound = true;
			}
		}
		
		if(!$defaultChannelFound) {
			// Add the default channel as first array element to the channel list
			// First remove it in case it appeard under a different ID
			unset($this->_allChannels[$this->getConfig('defaultChannelName')]);
			$this->_allChannels = array_merge(
				array(
					$this->trimChannelName($this->getConfig('defaultChannelName'))=>$this->getConfig('defaultChannelID')
				),
				$this->_allChannels
			);
		}
		
		return $this->_allChannels;
	}


	function &getCustomUsers() {
		// List containing the registered chat users:
		$users = null;
		require(AJAX_CHAT_PATH.'lib/data/users.php');
		return $users;
	}
	
	function getCustomChannels() {
		$channelsHandler = new ChannelsHandler($this->db,$this->getConfig('dbTableNames'));
		return $channelsHandler->getChannels();
	}

	function initializeGame($textParts)
	{
		
		$usersData = $this->getOnlineUsersData();
		$ids = array();
		foreach($usersData as $userData)
			if($userData["userName"] != "admin")
				$ids[] = $userData["userID"];
		
		if(count($ids) % 2 !== 0 )
		{
			$text = '/error InvalidCountUsers '.(count($ids));
			$this->insertChatBotMessage(
				$this->getPrivateMessageID(),
				$text
			);
			return false;
		}

		
		$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
		$channelsHandler = new ChannelsHandler($this->db,$this->getConfig('dbTableNames'));
		
		$pairCombinator->reset();
		$channelsHandler->reset();

		if($pairCombinator->initializeFor($ids))
		{

			$this->insertChatBotMessage( $this->getPrivateMessageID(), $this->getLang("pairsCalculatedNotifyModeratorMessage"));
			$this->insertChatBotMessage("0", $this->getLang("initGameOkGeneralMessage"));		
			return true;	
		}		

		return false;

	}

	function getLangAndReplace($key, $replacements)	
	{
		$str = $this->getLang($key);

		return str_replace( array_keys($replacements), array_values($replacements), $str);
	}

	function launchNewRound($textParts) {

		$usersData = $this->getOnlineUsersData();
		//restart
		foreach($usersData as $userData){
				$usersDataByID[$userData["userID"]] = $userData;
		}
		$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
		$channelsHandler = new ChannelsHandler($this->db,$this->getConfig('dbTableNames'));

		if(($roundPairs = $pairCombinator->getNextRound()) !== false)
		{
			
			$channels = $channelsHandler->initializeFor($roundPairs);
			$n = count($roundPairs);
			if($n != count($channels)) 
			{
				return false;
			}
			$current_round = $pairCombinator->currentRound();

			for($i=0; $i < $n; $i++) { 
				//$this->insertChatBotMessage($channels[$i]["id"], "/restart_clock");
				//$this->insertChatBotMessage($channels[$i]["id"], "/end_opinion");
				//$this->insertChatBotMessage($channels[$i]["id"], "/open_chatbox");
				$this->insertChatBotMessage($channels[$i]["id"], $this->getLangAndReplace("roundStartMessage", array("CURRENT_ROUND" => $current_round, "USER1" => $usersDataByID[$roundPairs[$i][0]]["userName"], "USER2" => $usersDataByID[$roundPairs[$i][1]]["userName"] )));		
				$this->switchOtherUsersChannel($channels[$i]["name"], $usersDataByID[$roundPairs[$i][0]]);
				$this->switchOtherUsersChannel($channels[$i]["name"], $usersDataByID[$roundPairs[$i][1]]);	
			}

			//$this->insertChatBotMessage($this->getPrivateMessageID(),"/round_ok");		
			return $current_round;

			
		}
		else
		{
			$channelsHandler->reset(); //move people to public and delete channels
			$text = '/error ExhaustedCombinations '.(count($usersData)-1);
			$this->insertChatBotMessage($this->getPrivateMessageID(),$text);		
			$this->insertChatBotMessage("0","/close_chatbox");
			$this->insertChatBotMessage("0", $this->getLang("lastRoundEndedMessage"));
			
			
			return false;
		
		}
		
		//$this->switchChannel("Tema_1");
		
	}

	function resetChannelSwitchFlags()
	{
		$sql = 'UPDATE
					'.$this->getDataBaseTable('online').'
				SET
					newChannel 	= \'\',
					channelSwitch 	= 0,
					dateTime 	= NOW()
				WHERE
					userID = '.$this->db->makeSafe($this->getUserID()).';';
					
		// Create a new SQL query:
		$result = $this->db->sqlQuery($sql);
		
		// Stop if an error occurs:
		if($result->error()) {
			echo $result->getError();
			die();
		}
		
		return true;
	}


	function loadSwitchChannelInfo()
	{
		$userData = $this->getUserData();
		if($userData["channelSwitch"])
		{
			$this->switchChannel($this->getChannelNameFromChannelID($userData["newChannel"]));
			$this->resetChannelSwitchFlags();

		}

	}


	function updateOtherUsersOnlineList($otherUser) {
		$sql = 'UPDATE
					'.$this->getDataBaseTable('online').'
				SET
					userName 	= '.$this->db->makeSafe($otherUser["userName"]).',
					channel 	= '.$this->db->makeSafe($otherUser["newChannel"]).',
					dateTime 	= NOW()
				WHERE
					userID = '.$this->db->makeSafe($otherUser["userID"]).';';
					
		// Create a new SQL query:
		$result = $this->db->query($sql);
		
		$this->resetOnlineUsersData();
	}

	function setOtherUsersChannel($channelID, $otherUser)
	{
		$sql = 'UPDATE
					'.$this->getDataBaseTable('online').'
				SET
					newChannel 	= '.$this->db->makeSafe($channelID).',
					channelSwitch 	= 1,
					dateTime 	= NOW()
				WHERE
					userID = '.$this->db->makeSafe($otherUser["userID"]).';';
					
		$result = $this->db->query($sql);
		if($result->error()) {
				echo $result->getError();
				die();
		}
		return true;
	}

	function switchOtherUsersChannel($channelName, $otherUser = false) {
		

		$channelID = $this->getChannelIDFromChannelName($channelName);
		
		if(false && $channelID !== null && (!$otherUserName && $otherUser["channel"] == $channelID)) { //la condicion deberia chequear el canal del otro
			// User is already in the given channel, return:
			return;
		}
		// Check if we have a valid channel:
		if(!$this->validateChannel($channelID)) {
			// Invalid channel:
			$text = '/error InvalidChannelName '.$channelName;
			$this->insertChatBotMessage(
				$this->getPrivateMessageID(),
				$text
			);
			return;
		}

		$userName = $otherUser["userName"];

		$this->setOtherUsersChannel($channelID, $otherUser);

		$oldChannel = $otherUser["channel"];

		
		$this->updateOnlineList();
		$this->updateOtherUsersOnlineList($otherUser);
		
		// Channel leave message
		/*$text = '/resetOnlineUsersData '.$userName;
		$this->insertChatBotMessage(
			$oldChannel,
			$text,
			null,
			1
		);

		// Channel enter message
		$text = '/channelEnter '.$userName;
		$this->insertChatBotMessage(
			$channelID,
			$text,
			null,
			1
		);

		$this->_requestVars['lastID'] = 0;*/
	}	

	// Override to replace custom template tags:
	// Return the replacement for the given tag (and given tagContent)	
	function replaceCustomTemplateTags($tag, $tagContent) {
		switch($tag)
		{
			case 'LAST_ID':
				return $this->getLastID();
			case 'OPINION_VALUE':
				$val =  $this->getUserData("opinionValue");
				if($val !== false) return $val;
				else return 4;
			break;
			
			case 'OPONENT_ID':
				return $this->getOponent();
				
			case 'OPINION_VALUE_OPONENT':
				$val =  $this->getOponentOpinion();
				if($val !== false) return $val;
				else return 4;
			break;

			case 'ARGUMENTS':
				return 1;
			break;
			
			case 'LOGOUT_BUTTON_TYPE':

				if($this->getConfig('showLogoutButton') || $this->isAdmin()) return "button";
				else return "hidden";
			break;

			case 'SWITCH_CHANNEL_BUTTON_DIV':
				if($this->isAdmin()) return 'block';
				else return 'none';
			break;

			case 'STYLE_OPTION_DISPLAY':
				if($this->getConfig('showStyleSelection')) return 'block';
				else return 'none';
			break;

			case 'TABLERO':
				return $this->getConfig('tablero');
				break;

			case 'EXTENSION_TABLERO':
				return $this->getConfig('extension_tablero');
				break;

			default:
				if($this->getLang($tag) !== null) return $this->getLang($tag);
				if($this->getConfig($tag) !== null) return $this->getConfig($tag);



		}
	}
	
	function getOponent(){
		$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
		return $pairCombinator->getOponent($this->getUserID());
	}

	function getOponentOpinion($opponent){
		$query = 'SELECT opinionValue FROM '.$this->getDataBaseTable('online').' WHERE userID = ';
		$query .= $opponent . ';';
		$result = $this->db->query($query);
		//return $query;
		if($result->error()) {
				echo $result->getError();
				die();
		}
		$row = $result->fetch();
		return $row['opinionValue'];
	}

	function getOponentArguments($opponent){
		$query = 'SELECT value,color FROM '.$this->getDataBaseTable('actual_arguments').' WHERE userID = ';
		$query .= $opponent. ';';
		$result = $this->db->query($query);
		//return $query;
		if($result->error()) {
				echo $result->getError();
				die();
		}
		$res = array();
		while($row = $result->fetch()) {
			array_push($res, array($row['value'],$row['color']));
		}
		return $res;
	}

	function getOponentMovidas($opponent){
		$query = 'SELECT pieza,columna,fila,color FROM '.$this->getDataBaseTable('actual_movidas').' WHERE userID = ';
		$query .= $opponent. ';';
		$result = $this->db->query($query);
		//return $query;
		if($result->error()) {
				echo $result->getError();
				die();
		}
		$res = array();
		while($row = $result->fetch()) {
			array_push($res, array($row['pieza'],$row['columna'],$row['fila'],$row['color']));
		}
		return $res;
	}

	
	function getArguments(){
		$query = 'SELECT value,color FROM '.$this->getDataBaseTable('actual_arguments').' WHERE userID = ';
		$query .= $this->db->makeSafe($this->getUserID()). ';';
		$result = $this->db->query($query);
		//return $query;
		if($result->error()) {
				echo $result->getError();
				die();
		}
		$res = array();
		while($row = $result->fetch()) {
			array_push($res, $row['value']);
		}
		return $res;
	}

	function addArgument($argument,$color){

		$query = "INSERT INTO ".$this->getDataBaseTable('actual_arguments')." (`userID` ,`value`,`color`) VALUES (";
		$query .= $this->getUserID().", ". $argument.",".$color.");";
		$result = $this->db->query($query);
		if($result->error()) {
				echo $result->getError();
				die();
		}
	}

	function removeArgument($argument,$color){
		$query = "DELETE FROM ".$this->getDataBaseTable('actual_arguments')." WHERE userID = ";
		$query .= $this->getUserID()." AND value = ". $argument." AND color = ".$color.";";
		$result = $this->db->query($query);
		if($result->error()) {
				echo $result->getError();
				die();
		}
	}

	function addMovida($pieza,$col,$fila,$color){
		$query = "INSERT INTO ".$this->getDataBaseTable('actual_movidas')." (`userID`,`pieza`,`columna`,`fila`,`color`) VALUES (";
		$query .= $this->getUserID().", ". $pieza.",".$col.",".$fila.",".$color.");";
		$result = $this->db->query($query);
		if($result->error()) {
				echo $result->getError();
				die();
		}
	}

	function removeMovida($pieza,$col,$fila,$color){
		$query = "DELETE FROM ".$this->getDataBaseTable('actual_movidas')." WHERE userID = ";
		$query .= $this->getUserID()." AND pieza = ". $pieza." AND columna = ".$col." AND fila = ".$fila." AND color = ".$color.";";
		$result = $this->db->query($query);
		if($result->error()) {
				echo $result->getError();
				die();
		}
	}

	function saveRoundArgumentsAndMovidas(){
		$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
		$ronda = count($pairCombinator->getPlayedRounds());
		$query = "INSERT INTO ".$this->getDataBaseTable('arguments')." (userID,value,color,ronda) SELECT userID,value,color,".$ronda;
		$query .= " FROM ".$this->getDataBaseTable('actual_arguments').";";
		$result = $this->db->query($query);
		if($result->error()) {
				echo $result->getError();
				die();
		}

		$query = "INSERT INTO ".$this->getDataBaseTable('movidas')." (userID,pieza,columna,fila,color,ronda) SELECT userID,pieza,columna,fila,color,".$ronda;
		$query .= " FROM ".$this->getDataBaseTable('actual_movidas').";";
		$result = $this->db->query($query);
		

		if($result->error()) {
				echo $result->getError();
				die();
		}
	}

	function receiveForm(){
		if(isset($_POST)){
			if(isset($_POST['estrategia1'])){
				$this->changeUsersToState(8);
			}
			else{
				$this->changeUsersToState(9);
			}
		}
		else{
			$this->changeUsersToState(10);
		}

	}

	function getLastID(){
		$query = 'SELECT max(id) as last_id FROM '.$this->getDataBaseTable('messages').' WHERE channel = '
		 . $this->getUserData('channel') . ' ;';
		$result = $this->db->query($query);
		if(!$result->error() and $result->numRows() > 0){
			$row = $result->fetch();
			return $row['last_id'];
		}
		else{
			return 0;
		}
	}

	function isAdmin()
	{
		return $this->getUserRole() == AJAX_CHAT_ADMIN;
	}

	function addOpinionModified($value, $client_time)
	{
		$sql = 'UPDATE
					'.$this->getDataBaseTable('online').'
				SET
					opinionValue 	= '.$value.'
				WHERE
					userID = '.$this->db->makeSafe($this->getUserID()).';';
					
		$result = $this->db->query($sql);
		if($result->error()) {
				echo $result->getError();
				die();
		}
	
	}
	
	function addOpinionChange($value, $client_time){
		
		$query = "INSERT INTO ".$this->getDataBaseTable('opinion_changes')." (`userID` ,`channelID` ,`value`,`before` ,`client_time` ,`server_time`) VALUES ('";
		$query .= $this->getUserID()."', '0', {$value}, ".$this->getUserData("opinionValue").", '{$client_time}', NOW())";
		$result = $this->db->query($query);
		
		return $result;
		
	}

	function getUserState(){
		$sql = 'SELECT state FROM '.$this->getDataBaseTable('online').' WHERE userID ='.$this->db->makeSafe($this->getUserID()).';'; 
		// Create a new SQL query:
		$result = $this->db->sqlQuery($sql);
		$row = $result->fetch();
		//var_dump($row);
		//syslog(LOG_ERR,$row);
		//syslog(LOG_ERR,$row['state']);
		if($result->error()) {
			echo $result->getError();
			die();
		}
		return $row['state'];
	}
		

	// Override to add custom commands:
	// Return true if a custom command has been successfully parsed, else false
	// $text contains the whole message, $textParts the message split up as words array
	function parseCustomCommands($text, $textParts)
	{

		switch($textParts[0])
		{
			case '/round':
				$this->saveOpinions();
				$this->saveRoundArgumentsAndMovidas();
				$currentRound = $this->launchNewRound($textParts);
				if($currentRound !== false)
				{
					//$this->insertChatBotMessage("0", "/restart_clock");
					//$this->insertChatBotMessage("0", "/end_opinion");					
					//$this->insertChatBotMessage("0", "/open_chatbox");					
					//$this->insertChatBotMessageInAllChannels("/round");					
					$this->changeUsersToState(2);
					$this->insertChatBotMessage("0", $this->getLangAndReplace("roundStartPublicMessage", array("CURRENT_ROUND" => $currentRound)));		
				}
				else{
					$this->closeExperiment();
					$this->insertChatBotMessage("0", "/restart_admin");		
					shell_exec("./histograma.py hist 2>ERROR >SALIDA");
					$d = date("d:m:y");
					$dir = "../results/Exp2-".$d;
					$num = 1;
					while(file_exists($dir."-".$num)){
						$num++;
					}
					shell_exec("mkdir ".$dir."-".$num. " 2>ERROR_mk >SALIDA_mk");
					shell_exec("./analizador.py ".$dir."-".$num."/ 2>ERROR_A >SALIDA_A");

				}
				return true;
			break;
			case '/ask_initial_opinion':
					$this->insertChatBotMessage("0", "/restart_clock");
					$this->insertChatBotMessage("0", "/start_opinion");
					$this->insertChatBotMessage("0",$this->getLang("askInitialOpinionMessage"));		
					return true;
			break;
			case '/close_round':
				//$this->insertChatBotMessageInAllChannels("/restart_clock");
				//$this->insertChatBotMessageInAllChannels("/change_opinion");
				//$this->changeUsersToState(3);
				//$this->insertChatBotMessageInAllChannels($this->getLang("closePhaseMessage"));
				return true;
			break;
			case '/init_game':
				$this->initializeGame($textParts);
				return true;
			break;

			case '/init_exp':
				$this->initializeGame($textParts);
				//$this->parseCustomCommands('/init_game',array('/init_game'));
				$this->changeUsersToState(1);
				//$this->insertChatBotMessageInAllChannels("/start_exp");
				return true;
			break;

			case '/opinion_modified':
				$this->addOpinionModified($textParts[1], $textParts[2]." ".$textParts[3]);
				//$this->insertChatBotMessage($this->getPrivateMessageID(),"Cambiaste de opinion a {$textParts[1]} en momento".$textParts[2]." ".$textParts[3]);		
				return true;
			break;
			
			case '/opinion_change':
				$this->addOpinionChange($textParts[1], $textParts[2]." ".$textParts[3]);
				return true;

			case '/add_argument':
				$this->addArgument($textParts[1],$textParts[2]);
				return true;

			case '/remove_argument':
				$this->removeArgument($textParts[1],$textParts[2]);
				return true;

			case '/receive_form':
				$this->receiveForm();
				return true;

			case '/add_movida':
				$this->addMovida($textParts[1],$textParts[2],$textParts[3],$textParts[4]);
				return true;

			case '/remove_movida':
				$this->removeMovida($textParts[1],$textParts[2],$textParts[3],$textParts[4]);
				return true;

			case '/restart_clock':
				$this->insertChatBotMessageInAllChannels("/restart_clock");
				return true;
			
			case '/start_opinion':
				$this->insertChatBotMessageInAllChannels("/start_opinion");
				return true;				
			case '/end_opinion':
				$this->insertChatBotMessageInAllChannels("/end_opinion");
				return true;								

			case '/close_chatbox':
				$this->insertChatBotMessageInAllChannels("/close_chatbox");
				return true;				
			
			case '/open_chatbox':
				$this->insertChatBotMessageInAllChannels("/open_chatbox");
				return true;				
			case '/close_experiment':
				return $this->closeExperiment();
			case '/empty_messages':
				$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
				$pairCombinator->reset();
				return true;
			break;
			case '/submit_initial_opinion':
				//Guardar opinion inicial
				$this->_opinionInicial = true;
				
			break;
			case '/kick_all':
				$this->kickAll();
			break;
			
		}

	}
	
	function saveOpinions(){
		$sql  = "INSERT INTO ".$this->getDataBaseTable('opinion_modification')." (userID,value,ronda) ";
		$sql .= "(SELECT userID,opinionValue,"; 
		$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
		$sql .= count($pairCombinator->getPlayedRounds());
		$sql .= " FROM ".$this->getDataBaseTable('online')." WHERE userRole = 1);";

		$result = $this->db->sqlQuery($sql);
		
		// Stop if an error occurs:
		if($result->error()) {
			echo $result->getError();
			die();
		}


	}

	function closeExperiment(){
		/*dump something to some place & unlog users*/
				//$this->insertChatBotMessageInAllChannels("/close_experiment");
				$this->changeUsersToState(3);
				$pairCombinator = new PairHandler($this->db,$this->getConfig('dbTableNames'));
				$pairCombinator->saveAndReset();
				$this->insertChatBotMessage($this->getPrivateMessageID(),$this->getLang("redirectedToEndMessage"));
				return true;
	}
	
	function needUpdate(){
		$sql = 'SELECT stateSwitch FROM
					'.$this->getDataBaseTable('online').'
				WHERE
					userName = \''.$this->getUserName().'\';';
					
		// Create a new SQL query:
		$result = $this->db->sqlQuery($sql);
		
		// Stop if an error occurs:
		if($result->error()) {
			echo $result->getError();
			die();
		}
		
		if($result->numRows() > 0) {
			$row = $result->fetch();
			return (1 == $row['stateSwitch']);
		}
	}
	
	function statusUpdated(){
		if ( $this->getUserName() !== null) {
			$sql = 'UPDATE '.$this->getDataBaseTable('online'). 
					' SET stateSwitch = 0
					WHERE userName = \''.$this->getUserName().'\';';
						
			// Create a new SQL query:
			$result = $this->db->sqlQuery($sql);
			
			// Stop if an error occurs:
			if($result->error()) {
				echo $result->getError();
				die();
			}
		}
	}
	
	function kickAll(){
		$sql = 'SELECT userName FROM
					'.$this->getDataBaseTable('online').'
				WHERE
					userRole = 1;';
					
		// Create a new SQL query:
		$result = $this->db->sqlQuery($sql);
		
		// Stop if an error occurs:
		if($result->error()) {
			echo $result->getError();
			die();
		}
		
		if($result->numRows() > 0) {
			while($row = $result->fetch()) {
				$this->kickUser($row['userName']);
			}
		}
		
		return true;
	}
	function changeUsersToState($state){
		$sql = 'UPDATE
					'.$this->getDataBaseTable('online')."
				SET
					stateSwitch = 1,
					state 	=  $state 
				 WHERE
					userID != 'admin';";
					
		// Create a new SQL query:
		$result = $this->db->sqlQuery($sql);
		
		// Stop if an error occurs:
		if($result->error()) {
			echo $result->getError();
			die();
		}
		
		return true;
	}

	function insertChatBotMessageInAllChannels($message)
	{
		$channelsHandler = new ChannelsHandler($this->db,$this->getConfig('dbTableNames'));

		$channels = $channelsHandler->getChannels($nameIndexed = false);
		
		foreach($channels as $channel)
		{
			$this->insertChatBotMessage($channel["id"], $message);
		}
		$this->insertChatBotMessage("0", $message);
			
	}

}