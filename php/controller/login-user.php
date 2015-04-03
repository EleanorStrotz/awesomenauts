<?php
	// require once links config.php file to login-user.php file
   require_once(__DIR__ . "/../model/config.php");	

   // username and password variable help you login with authenication
   $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
   $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

   //query selects salt password from a username in our users table.
   $query = $_SESSION["connection"]->query("SELECT  salt,password FROM users WHERE username = '$username'");
	
	//checks if information is stored in the query variable
   if($query->num_rows == 1) {
   	 $row = $query->fetch_array();

   	 //checks if the login was successful
   	 if($row["password"] === crypt($password, $row["salt"])) {
   	 	// tells website that the user has logged in
   	 	$_SESSION["authenticated"] = true;
   	 	echo "<p>Login Successful</p>";
   	 }
   	 // else statement echos if the if statemt was incorrect
   	 else {
   	 	echo "<p>Invaild username and password</p>";
   	 }
   }
   // else statement echos if the if statment for $query is not working
   else {
   	echo "<p>Invalid username and password</p>";
   }

?>
<!-- contoller checks if the session variable has been set, also checks if its true -->