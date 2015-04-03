<?php
// require once links read-posts with config.php
require_once(__DIR__ . "/../model/config.php");

//selects code from database
$query = "SELECT * FROM posts";
//variable stores a connenction to $query variable
$result = $_SESSION["connection"]->query($query);

//div 'posts' hold our posts on our index page
if($result){
	while($row = mysqli_fetch_array($result)) {
		echo "<div class = 'posts'>";
		echo "<h2>" . $row['title'] . "</h2>";
		echo "<p>" . $row['DateTime'] . "</p>";
		echo "<br />";
		echo "<section class ='post'>";
		echo "<p>" . $row['post'] . "</p>";
		echo "</section>";
		echo "<br/>";
		echo "</div>";
		}
	}
?>