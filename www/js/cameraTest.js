
		var pictureSource;   // picture source
		var destinationType; // sets the format of returned value
		
		var db;
		var shortName = 'WebSqlDB';
		var version = '1.0';
		var displayName = 'WebSqlDB';
		var maxSize = 65535;
		
		
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
		 
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS PHOTOS(ID INTEGER PRIMARY KEY AUTOINCREMENT, PHOTO BLOB)',
																	[],nullHandler,errorHandler);},errorHandler,successCallBack);
  
 
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
		
			 // var smallImage = document.getElementById('smallImage');
		
			  //smallImage.style.display = 'block';
			
			 // smallImage.src = "data:image/jpeg;base64," + imageData;
			  
			  if (!window.openDatabase) 
				 {
				   alert('Databases are not supported in this browser.');
				   return;
				 }
				 
				// this is the section that actually inserts the values into the User table
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('INSERT INTO PHOTOS(PHOTO) VALUES (?)',[imageData], nullHandler,errorHandler);
					//alert("image inserted");
				 });
				 
				 ListDBValues();
			 
			}  
								  
		
		function onFail(message) 
		{
			alert('Failed because: ' + message);
		}
		
		/*
		function AddValueToDB() 
		{
		 
		 if (!window.openDatabase) 
		 {
		   alert('Databases are not supported in this browser.');
		   return;
		 }
		 
		// this is the section that actually inserts the values into the User table
		 db.transaction(function(transaction) 
		 {
		   transaction.executeSql('INSERT INTO PHOTOS(PHOTO) VALUES (?)',[$('#txFirstName').val()], nullHandler,errorHandler);
		  
		 });
		 
		// this calls the function that will show what is in the User table in the database
		// ListDBValues();
		 
		 return false;
		 
		}
		*/
		
		function errorHandler(transaction, error) 
		{
		   alert('Error: ' + error.message + ' code: ' + error.code);
		}
		 
		// this is called when a successful transaction happens
		function successCallBack() 
		{
		   alert("DEBUGGING: success");
		}
	 
		function nullHandler(){};
		
		function ListDBValues() 
		{
		 
			 if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM PHOTOS;', [],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var row = result.rows.item(i);
															  $('#images').append('<img style="display:block;width:100%;height:80%;" src="data:image/jpeg;base64,'+ row.PHOTO +'" />');
															}
													}
												 },errorHandler);
				 },errorHandler,nullHandler);
				 
				 return;
		 
		}
 
		
		