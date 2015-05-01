
// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
 
	function errorHandler(transaction, error) 
	{
	   alert('Error: ' + error.message + ' code: ' + error.code);
	}
	 
	// this is called when a successful transaction happens
	function successCallBack() 
	{
	   //alert("DEBUGGING: success");
	}
 
	function nullHandler(){};
 
	// called when the application loads
	function onBodyLoad()
	{
		 
		 if (!window.openDatabase) 
		 {
		   // not all mobile devices support databases  if it does not, the
		   // indicating the device will not be albe to run this application
		   alert('Databases are not supported in this browser.');
		   return;
		 }
 
		 db = openDatabase(shortName, version, displayName,maxSize);
 
		// this line will try to create the table User in the database just created/openned
		 db.transaction(function(tx){
		 
	
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS users(username VARCHAR(30) NOT NULL PRIMARY KEY, name VARCHAR(50) , emailId VARCHAR(100) NOT NULL, userPassword VARCHAR(100) NOT NULL, profilePic BLOB, bio VARCHAR(140))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
 
	}
 
	// list the values in the database to the screen using jquery to update the #lbUsers element
	function ListDBValues() 
	{
	 
		 if (!window.openDatabase) 
		 {
		  alert('Databases are not supported in this browser.');
		  return;
		 }
	 
			 if(document.getElementById("username").value.length > 0 && document.getElementById("password").value.length > 0)
			 {
				 db.transaction(function(transaction) 
			 {
			   transaction.executeSql("SELECT * FROM users where (username='"+$('#username').val()+"' and userPassword='"+$('#password').val()+"');", [],
											 function(transaction, result) 
											 {
											  if (result != null && result.rows != null) 
												{
												//alert("SELECT * FROM users where (username='"+$('#username').val()+"' and userPassword='"+$('#password').val()+"');");
														window.localStorage.setItem("username", $('#username').val());
														window.location = "index.html";
														
												}
												
												else
												{
													alert("Incorrect username or password");
												}
											 },errorHandler);
			 },errorHandler,nullHandler);
			 }
			 else
			 {
				 alert("Please enter both username and password");
			 }
	 
	}
 
