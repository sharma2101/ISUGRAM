
		var pictureSource;   // picture source
		var destinationType; // sets the format of returned value
		
		var db;
		var shortName = 'WebSqlDB';
		var version = '1.0';
		var displayName = 'WebSqlDB';
		var maxSize = 65535;
		var mainImage;
		
		
		document.addEventListener("deviceready",onDeviceReady,false);

		 function onDeviceReady() 
		 {
			pictureSource=navigator.camera.PictureSourceType;
			destinationType=navigator.camera.DestinationType;
			
			if (!window.openDatabase) 
			 {
			   alert('Databases are not supported in this browser.');
			   return;
			 }
 
		 db = openDatabase(shortName, version, displayName,maxSize);
 
 /*
		db.transaction(function(tx){
		
		 tx.executeSql( 'DROP TABLE userimages',[],nullHandler,errorHandler);},errorHandler,successCallBack);
		 */
		 
		 db.transaction(function(tx){

		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS userimages(username VARCHAR(30) NOT NULL, uploadedpictures BLOB, likes INT(11), created TIMESTAMP DEFAULT CURRENT_TIMESTAMP , caption VARCHAR(50), FOREIGN KEY (username) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
																	
		db.transaction(function(tx){
		
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS friend(usernameone VARCHAR(30), usernametwo VARCHAR(20), FOREIGN KEY (usernameone) REFERENCES users(username), FOREIGN KEY (usernametwo) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
  
		ListDBValues();
			
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
			var userInSession = window.localStorage.getItem("username");
		  
			 if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 $('#posts').empty();
			
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('select * from userimages where username IN (select usernametwo from friend where usernameone = ?) order by created desc;', [userInSession],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var divID = "item" + i;
															  var row = result.rows.item(i);
															  $("#posts").append("<div id=\"" + divID+ "\" class=\"items\"><h3><b>"+ row.username+ "</b></h3><hr>");
															  $("#" + divID).append('<img style="display:block;width:100%;height:300px;" class="img-rounded" src="data:image/jpeg;base64,'+ row.uploadedpictures +'" />');
															  $("#" + divID).append('<h4><b>'+ row.username +': '+row.caption+'</h4><hr>');
			
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				 
		 
		}
		
		function logout()
		{
		
			window.localStorage.removeItem("username");
			window.location = "signup.html";
		}
		