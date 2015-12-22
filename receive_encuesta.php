<?php
  // The global $_POST variable allows you to access the data sent with the POST method
  // To access the data sent with the GET method, you can use $_GET
  $obj = new stdClass();
  $obj->userID = htmlspecialchars($_POST['userID']);
  $obj->estrategia1 = htmlspecialchars($_POST['estrategia1']);
  $obj->estrategia2  = htmlspecialchars($_POST['estrategia2']);
  $obj->info  = htmlspecialchars($_POST['info']);
  $obj->nivel_ajedrez  = htmlspecialchars($_POST['nivel_ajedrez']);
  $obj->elo  = htmlspecialchars($_POST['elo']);
  $obj->sitio_web  = htmlspecialchars($_POST['sitio_web']);

  shell_exec("touch ./chat3/TEST");
  shell_exec("python test.py");
  $output = exec("python histograma.py hist");
	echo "<pre>$output</pre>";
  //header("Location: http:/repo/chat3/");
  //echo json_encode($obj);


  ?>
