<?php
	//links form.php to config.php
	require_once(__DIR__ . "/../model/config.php");
	// links form.php to login-verify.php
	require_once(__DIR__ . "/../controller/login-verify.php");

	// if statement runs authenticateUser
	// within the if statement we run certain information
	// die will stop the page from loading
	if(!authenticateUser()) {
		header("Location; " . $path . "index.php");
		die();
	}
?>

<h1>Create Blog Post</h1>

<!-- sends information to the post and echos the path for the information to follow -->
<form method="post" action="<?php echo $path . "controller/create-post.php"; ?>">
<!-- div puts in the title and the label for the title -->
	<div>
		<label for="title">Title: </label>
		<input type="text" name="title" />
	</div>
<!-- div is a label for post -->
	<div>
		<label for="post">Post: </label>
		<textarea name="post"></textarea>
	</div>
	<!-- div is to create the submit button -->
	<div>
		<button type="submit" class="btn btn-success">Submit</button>
	</div>
</form>