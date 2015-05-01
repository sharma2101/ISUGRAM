
	
		
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
															 $( "#username" ).attr( "value", row.username );
															 $( "#name" ).attr( "value", row.name );
															 $( "#emailID" ).attr( "value", row.emailId );
															 $( "#userpassword" ).attr( "value", row.userPassword );
															 $( "#bio" ).attr( "value", row.bio );
															  
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				
		 
		}
		
		function updateProfile()

		{
			if (!window.openDatabase) 
				 {
				   alert('Databases are not supported in this browser.');
				   return;
				 }
				 
				 var nam = $( "#name" ).val();
				 var email = $( "#emailID" ).val();
				 var pass = $( "#userpassword" ).val();
				 var bio = $( "#bio" ).val();
				 var userInSession = window.localStorage.getItem("username");
			 
				 
				// this is the section that actually inserts the values into the User table
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('UPDATE users SET name = ?, emailId = ?, userPassword = ?, bio =? where username = ?',[nam,email,pass,bio,userInSession], nullHandler,errorHandler);
					//alert("image inserted");
				 });
				 
				 
				// window.location = "profile.html";
				// ListDBValues();
		}		