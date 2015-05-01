
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
 
		ListDBValues();
  
 
		 }
		 

		
		function getPhoto(source) 
		 {
		  // Retrieve image file location from specified source
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,allowEdit: true,
			destinationType: destinationType.DATA_URL ,
			sourceType: source });
		}
		
		
		function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
		  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
			destinationType: destinationType.DATA_URL });
		}

		
	
		 function onPhotoDataSuccess(imageData) 
		 { 
		
			
		 
			if (!window.openDatabase) 
				 {
				   alert('Databases are not supported in this browser.');
				   return;
				 }
				 
				  var userInSession = window.localStorage.getItem("username");
			 
				 
				// this is the section that actually inserts the values into the User table
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('UPDATE users SET profilePic = ? where username = ?',[imageData,userInSession], nullHandler,errorHandler);
					//alert("image inserted");
				 });
				 
				 
				 window.location = "index.html";
				 ListDBValues();
			
			 
		}  
								  
		
		function onFail(message) 
		{
			alert('Failed because: ' + message);
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
															 
															  
															   var smallImage1 = document.getElementById('smallImage');
																smallImage1.src = "data:image/jpeg;base64," + row.profilePic;
				 
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				
		 
		}