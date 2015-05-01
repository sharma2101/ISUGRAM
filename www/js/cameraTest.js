
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
		 
		 tx.executeSql( 'CREATE TABLE IF NOT EXISTS userimages(username VARCHAR(30) NOT NULL, uploadedpictures BLOB, likes INT(11), created TIMESTAMP DEFAULT CURRENT_TIMESTAMP , caption VARCHAR(50), FOREIGN KEY (username) REFERENCES users(username))',
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
		
			  mainImage = imageData;
			  var smallImage = document.getElementById('smallImage');
			  var smallImage1 = document.getElementById('sourceImage');
			  var smallImage2 = document.getElementById('smallImage2');

			  smallImage.style.display = 'block';
			  smallImage1.style.display = 'block';
			  smallImage2.style.display = 'block';

			  // Show the captured photo
			  // The in-line CSS rules are used to resize the image
			  //
			  smallImage.src = "data:image/jpeg;base64," + imageData;
			  smallImage1.src = "data:image/jpeg;base64," + imageData;
			  smallImage2.src = "data:image/jpeg;base64," + imageData;
			  
			
			 
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
		 
			 if (!window.openDatabase) 
			 {
			  alert('Databases are not supported in this browser.');
			  return;
			 }
			 
			 $('#images').empty();
			 
			
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('SELECT * FROM userimages;', [],
												 function(transaction, result) 
												 {
												  if (result != null && result.rows != null) 
													{
															for (var i = 0; i < result.rows.length; i++) 
															{
															  var row = result.rows.item(i);
															  $('#images').append('<img style="display:block;width:100%;height:80%;" src="data:image/jpeg;base64,'+ row.uploadedpictures +'" />');
															  $('#images').append('<p>'+ row.username +','+row.likes+','+row.caption+','+row.created);
															  //$('#images').append('<a href="index.html">Home</a>');
															}
													}
												 },errorHandler);  
				 },errorHandler,nullHandler);
				 
				 
		 
		}
		
		function AddValueToDB() 
		{
		 /*
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var img = document.getElementById('sourceImage');
		context.drawImage(img, 0, 0 );
		var myData = context.getImageData(0, 0, img.width, img.height);
		
		*/
		var value = window.localStorage.getItem("username");
		 
		  if (!window.openDatabase) 
				 {
				   alert('Databases are not supported in this browser.');
				   return;
				 }
				 
			 
				 
				// this is the section that actually inserts the values into the User table
				 db.transaction(function(transaction) 
				 {
				   transaction.executeSql('INSERT INTO userimages(username,uploadedpictures,likes,caption) VALUES (?,?,?,?)',[value,mainImage,0,$('#caption').val()], nullHandler,errorHandler);
					//alert("image inserted");
				 });
				 
				 
				 window.location = "index.html";
				 //ListDBValues();
		 
		 
		 
		}
		
		
		 //filter functions
		  function GrayscalePhotoEdit()
		 {
				resetPic();
				$('img.test').simpleFilter({
					filter : 'greyscale'
				});
  
		 }
		 
		   function vintagePhotoEdit()
		 {
				resetPic();
				$('img.test').simpleFilter({
					filter : 'vintage'
				});
  
		 }
		 
		   function luxenPhotoEdit()
		 {
				resetPic();
				$('img.test').simpleFilter({
					filter : 'luxen',
					lightleak : 'lightleak02'
				});
  
		 }
		  function beachPhotoEdit()
		 {
				resetPic();
				$('img.test').simpleFilter({
					filter : 'greyscale'
				});
  
		 }
		 
		   function vignettePhotoEdit()
		 {
				resetPic();
				$('img.test').simpleFilter({
					filter : 'beach'
				});
  
		 }
		 
		   function resetPic()
		 {
				 var smallImage1 = document.getElementById('sourceImage');
				 smallImage1.src = "data:image/jpeg;base64," + mainImage;
  
				var smallImage2 = document.getElementById('smallImage2');
				 smallImage2.src = "data:image/jpeg;base64," + mainImage;
				
		 }
 
		
		