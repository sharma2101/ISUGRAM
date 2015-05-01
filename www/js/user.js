
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
		
		/*
		 db.transaction(function(tx)
		 {
		tx.executeSql( 'DROP TABLE users',[],nullHandler,errorHandler);},errorHandler,successCallBack);
		*/
		
		 db.transaction(function(tx){
		

		
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS users(username VARCHAR(30) NOT NULL PRIMARY KEY, name VARCHAR(50) , emailId VARCHAR(100) NOT NULL, userPassword VARCHAR(100) NOT NULL, profilePic BLOB, bio VARCHAR(140))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
																	
		db.transaction(function(tx){
		
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS friend(usernameone VARCHAR(30), usernametwo VARCHAR(20), FOREIGN KEY (usernameone) REFERENCES users(username), FOREIGN KEY (usernametwo) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);														
 
	}
 

		function AddValueToDB() 
		{
		 
		 if (!window.openDatabase) 
		 {
		   alert('Databases are not supported in this browser.');
		   return;
		 }
		
		 db.transaction(function(transaction) 
		 {
			transaction.executeSql('INSERT INTO users(username, emailId,userPassword ) VALUES (?,?,?)',[$('#username').val(), $('#email').val(), $('#password').val()], nullHandler,errorHandler);
			alert("Successfully Signed Up !");
			
			
		 });
		 
		 db.transaction(function(transaction) 
		 {
			transaction.executeSql('INSERT INTO friend(usernameone,usernametwo) VALUES (?,?)',[$('#username').val(),$('#username').val()], nullHandler,errorHandler);
			alert("Successfully friended urself !");
			window.location = "initial.html";
			
		 });
		 
		
		 
		}
		function CheckAllValidatations()
		{
			if(username.checkValidity() && email.checkValidity() && password.checkValidity())
			{
				 db.transaction(function(transaction) 
			 {
			   transaction.executeSql("SELECT * FROM users where (username='"+$('#username').val()+"' or emailId='"+$('#email').val()+"');", [],
						function(transaction, result) 
						{
						  if (result.rows.length>0) 
							{
								alert("Username or Email is already taken");
							}					
						else
							{
								alert("Welcome new user!");	
								AddValueToDB();
							
							}
						},errorHandler);
			 },errorHandler,nullHandler);
			 	
			}
		}
		
		function validateUsername() 
		{
			var username = document.getElementById("username");
			if(username.checkValidity()==false)
			{
				if(username.value.length < 3 || username.value.length > 15)
				{
					document.getElementById("usernameError").innerHTML = "Username should be 3-15 characters.";
				}
				else
				{
					document.getElementById("usernameError").innerHTML = "Username can only have alphabets, digits and underscores";
				}
			}
			else
			{
				document.getElementById("usernameError").innerHTML = "";
			}
		
		}
		
		function validateEmail() 
		{
			var email = document.getElementById("email");
			if(email.checkValidity()==false)
			{
				
				document.getElementById("emailError").innerHTML = "Invalid email address";
			}
			else
			{
				document.getElementById("emailError").innerHTML = "";
			}
		
		}
		
		function validatePassword() 
		{
			var password = document.getElementById("password");
			if(password.checkValidity()==false)
			{
				if(password.value.length < 5 || password.value.length > 15)
				{
					document.getElementById("passwordError").innerHTML = "Password should be 5-15 characters.";
				}
				else
				{
					document.getElementById("passwordError").innerHTML = "Password can only be alphanumeric and can have @,# or *";
				}
			}
			else
			{
				document.getElementById("passwordError").innerHTML = "";
			}
		
		}
		
		
		
		
		
		
		
		