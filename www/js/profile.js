
	
		
		var db;
		var shortName = 'WebSqlDB';
		var version = '1.0';
		var displayName = 'WebSqlDB';
		var maxSize = 65535;
		var mainImage;
		
		
		document.addEventListener("deviceready",onDeviceReady,false);

		 function onDeviceReady() 
		 {
		 
			alert("in device ready");
			pictureSource=navigator.camera.PictureSourceType;
			destinationType=navigator.camera.DestinationType;
			
			if (!window.openDatabase) 
			 {
			   alert('Databases are not supported in this browser.');
			   return;
			 }
 
		 db = openDatabase(shortName, version, displayName,maxSize);
 
		
		 db.transaction(function(tx){
		 
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS userimages(username VARCHAR(30) NOT NULL, uploadedpictures BLOB, likes INT(11), created TIMESTAMP DEFAULT CURRENT_TIMESTAMP , caption VARCHAR(50), FOREIGN KEY (username) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
  
		
			ListDBValues();
			getDetails();
			getFriends();
 
		 }
		 
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
		
		function ListDBValues() 
		{
		 
			alert("in list db values");
			 if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 var userInSession = window.localStorage.getItem("username");
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM users where username = ?;', [userInSession],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var row = result.rows.item(i);
															  $('#profilePic').append('<center><a href="editImage.html"><img class="img-circle" style="display:block;width:200px;height:200px;" id="smallImage" src="data:image/jpeg;base64,'+row.profilePic+'" /></a></center>');
															  $('#postsUsername').append('<p>'+ row.username +'</p>');
															  
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				
		 
		}
		
		function getDetails() 
		{
		
		  if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 var userInSession = window.localStorage.getItem("username");
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM userimages where username = ?;', [userInSession],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															
															  $('#postsValueID').append(result.rows.length);
															
															  
															
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
		 
		}
		
		
		function getFriends() 
		{
		
		  if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 var userInSession = window.localStorage.getItem("username");
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM friend where usernameone = ?;', [userInSession],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															
															  $('#followingValueID').append(((result.rows.length)-1));
															
															  
															
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
		 
		 
		 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM friend where usernametwo = ?;', [userInSession],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															
															  $('#followersValueID').append((result.rows.length)-1);
															
															  
															}
													
												 },errorHandler);  
				 },errorHandler,nullHandler);
		}