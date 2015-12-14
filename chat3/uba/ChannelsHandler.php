<?php
class ChannelsHandler
{
	
	var $db = null;
	var $table_names;

	function __construct(&$db,$table_names)
	{
		$this->db = &$db;
		$this->table_names = $table_names;
	}

	function getDataBaseTable($name){
		return $this->table_names[$name];
	}

	function getChannels($nameIndexed = true)
	{
		$channels = array();
		foreach($this->db->getAssoc("SELECT id, name FROM ".$this->getDataBaseTable('channels')) as $db_item)
		{
			if($nameIndexed)$channels[ $db_item["name"]] = $db_item["id"];
			else $channels[] = $db_item;
		}
			
		
		return $channels;
	}

	function initializeFor($roundPairs)
	{
		$this->reset();
		return $this->createChannels($roundPairs);
	}


	function createChannels($roundPairs)
	{
		$this->reset();
		$query = "INSERT INTO ".$this->getDataBaseTable('channels')." (id, name) VALUES";
		foreach($roundPairs as $pair)
		{	
			$id = str_pad($pair[0], 3, "0", STR_PAD_LEFT).str_pad($pair[1], 3, "0", STR_PAD_LEFT);
			$query.="($id, 'Channel_{$id}'),";
		}
		
		
		

		if($this->db->query(substr($query, 0, -1)))
		{
			return $this->getChannels($nameIndexed = false);
		}
	}

	function deleteChannels()
	{
		return (bool)$this->db->query("TRUNCATE TABLE ".$this->getDataBaseTable('channels'));
	}

	function moveEveryoneToPublic()
	{
		$sql = 'UPDATE '.$this->getDataBaseTable('online').' SET
				newChannel = 0,
				channelSwitch 	= 1,
				dateTime 	= NOW() ;';
					
		$result = $this->db->query($sql);
		
		return true;
	}
	

	function reset()
	{
		$this->moveEveryoneToPublic();
		$this->deleteChannels();

	}

}



?>