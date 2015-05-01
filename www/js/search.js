
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
 
		
		 db.transaction(function(tx){
		 
		// tx.executeSql( 'DROP TABLE userimages',nullHandler,nullHandler);
																	
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS userimages(username VARCHAR(30) NOT NULL, uploadedpictures BLOB, likes INT(11), created TIMESTAMP DEFAULT CURRENT_TIMESTAMP , caption VARCHAR(50), FOREIGN KEY (username) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
																	
		db.transaction(function(tx){
		
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS friend(usernameone VARCHAR(30), usernametwo VARCHAR(20), FOREIGN KEY (usernameone) REFERENCES users(username), FOREIGN KEY (usernametwo) REFERENCES users(username))',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
 
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
		
		function searchByName() 
		{
		 
			 if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 $('#result1').empty();
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM users where ( username LIKE ?) OR (name LIKE ? ) OR (emailId LIKE ?);', ["%"+$('#searchByNameId').val()+"%","%"+$('#searchByNameId').val()+"%","%"+$('#searchByNameId').val()+"%"],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var row = result.rows.item(i);
															  
															  var divID = "item" + i;
															  
															
															  
															  $('#result1').append("<div id=\"" + divID+ "\" class=\"items\"> <table width=\"120%\"><tr><td><h4><b>"+ row.username+ "<b></h4></td> <td> </td> <td> </td><td><img class=\"img-circle\" style=\"display:block;width:60px;height:60px;\" src=\"data:image/jpeg;base64,"+ row.profilePic +"\" /></td><td> </td><td><form onsubmit=\"return follow(this.rs.value)\"> <input type=\"hidden\" name=\"rs\" value=\""+row.username+"\" id=\"tofollow\"> <input type=\"submit\" value=\"Follow\" class=\"btn btn-info\"> </form></td></tr></table>");
															  $("#" + divID).append('');
															  $("#" + divID).append('');
															
															  
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				 
		 
		}
		
		function searchByTag() 
		{
		 
		if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 $('#result2').empty();
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM userimages where caption LIKE ?;', ["%"+$('#searchByTagId').val()+"%"],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
													
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var row = result.rows.item(i);
															  $('#result2').append('<center><a href="profile.html?usersname="'+row.username+'><img class="img-rounded" style="display:block;width:60%;height:190px;" src="data:image/jpeg;base64,'+ row.uploadedpictures +'" /></a></center><br/><br/>');
															  
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
		}
		
		
		function follow(names) 
		{	
		
		 var loggedInUser = window.localStorage.getItem("username");
		 var wantsToFollow = names ; 
		 
		  if (!window.openDatabase) 
				 {
				   alert('Databases are not supported in this browser.');
				   return;
				 }
				 
			 
				 
				// this is the section that actually inserts the values into the User table
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('INSERT INTO friend(usernameone,usernametwo) VALUES (?,?)',[loggedInUser,wantsToFollow], nullHandler,errorHandler);
					//alert("image inserted");
				 });
				 
				 
				alert(" You are now following "+wantsToFollow);

				return false;
		}
		
		
		