<?php

//Looks for config.php 
 require_once(__DIR__ . "/../model/config.php");
// connects our host, username, and password to mysqli

    // created a table within a database
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "title varchar(235) NOT NULL,"
	//shows text
	    . "post text NOT NULL,"
	    // table for date time propertie
	    . "DateTime datetime NOT NULL,"
	    . "PRIMARY KEY (id) )");

		// creates a database for the users
		$query = $_SESSION["connection"]->query("CREATE TABLE users("
			. "id int(11) NOT NULL AUTO_INCREMENT,"
			. "username varchar(30) NOT NULL,"
			. "email varchar(50) NOT NULL,"
			. "password char(128) NOT NULL,"
			. "salt char(128) NOT NULL,"
			. "PRIMARY KEY (id))");