<?php
// require once connects create-post with config.php
	require_once(__DIR__ . "/../model/config.php");

//variable filter the input, gets the posts from the title and filters its to make sure its a string
	$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
	// variable filter the input, gets the posts from the post and filters it to make sure its a string
	$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
  $date = new DateTime('today');
  $time = new DateTime('America/Los_Angeles');

  // variable query makes a query for the variables post and title
	$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post ='$post'");
    // if statement checks if $query is running correctly
    if($query) {
    	// echo is used if $query is successfully working/ if it is true
    	echo "<p>Successfully inserted post: $title</p>";
      //echos date and time when you post a posts
      echo "Posted on:" . $date->format("M/D/Y") . " at " . $time->format("h:i");
       
       }

       // else statement outputs if there is an error 
       else {
       	 echo"<p>" . $_SESSION["connection"]->error . "</p>";
       }
?>
