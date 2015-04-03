
<?php
// require once links config.php to create-user.php
	require_once(__DIR__ . "/../model/config.php");

	//inputs email to database
	$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
	//inputs username to database
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	//inputs password to database
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	
// salt variable used to disquise our password and not reveal what it really is
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

// hashedpassword variable 
	$hashedPassword = crypt($password, $salt);

//querys the database
// query inserts into our table called users and inserts certian values
	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '$email',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt'");
	// if statement checks if the query function was successful or not
	if ($query) {
		echo "Successfully created user: $username";
	}
	//else statement echos if the query wasnt successful
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
 