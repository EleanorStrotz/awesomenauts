<?php 
// looks for/links navigation.php config.php
	require_once(__DIR__ . "/../model/config.php");
?>
<nav>
	<ul>
	<!-- links you to post.php -->
		<li><a href="<?php echo $path . "post.php"?>">Blog Post Form</a></li>
	</ul>

</nav>