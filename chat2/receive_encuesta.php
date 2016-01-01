<?php

  define('AJAX_CHAT_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');
  require(AJAX_CHAT_PATH.'lib/config.php');
  // The global $_POST variable allows you to access the data sent with the POST method
  // To access the data sent with the GET method, you can use $_GET
  $obj = new stdClass();
  $obj->estrategia1 = htmlspecialchars($_POST['estrategia1']);
  $obj->estrategia2  = htmlspecialchars($_POST['estrategia2']);
  $obj->info  = htmlspecialchars($_POST['info']);
  $obj->nivel_ajedrez  = htmlspecialchars($_POST['nivel_ajedrez']);
  $obj->elo  = htmlspecialchars($_POST['elo']);
  $obj->sitio_web  = htmlspecialchars($_POST['sitio_web']);

  $conn = new mysqli($config['dbConnection']['host'], $config['dbConnection']['user'], $config['dbConnection']['pass'],$config['dbConnection']['name']);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";
  $sql = "INSERT INTO ".$config['dbTableNames']['encuesta']." (data,userID,resultId) VALUES ('".json_encode($obj)."',".$_POST['userID'].",(SELECT max(id) FROM results))";

  if ($conn->query($sql) === TRUE) {
      //echo "New record created successfully";
  } else {
      shell_exec("echo '".$conn->error."' > ERROR");
      //echo "Error: " . $sql . "<br>" . $conn->error;

  }

  mysqli_close($conn); 
  header("Location: http://socex.df.uba.ar/chat2/end.html");
  /*shell_exec("touch ./chat3/TEST");
  shell_exec("python test.py");
  $output = exec("python histograma.py hist");
  echo "<pre>$output</pre>";
  //echo json_encode($obj);*/


  ?>
