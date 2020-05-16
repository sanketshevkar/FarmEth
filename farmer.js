
var config = {
    apiKey: "AIzaSyAkmsGmaYADtgiRqbwh6EavkoVFM4woVoU",
    authDomain: "tempeth.firebaseapp.com",
    databaseURL: "https://tempeth.firebaseio.com",
    projectId: "tempeth",
    storageBucket: "tempeth.appspot.com",
    messagingSenderId: "413640581007"
  };
  
  firebase.initializeApp(config);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('logs');
  var temp; 
  var day;
  var time;
  var address;


  messagesRef.on('child_changed', function(data) {
        
        
      
        var newPost = data.val();
    day=newPost.day;
    temp=newPost.temp;
    time=newPost.time;
    key=data.key;
    address=newPost.address;
    console.log("Author: " + temp);
    console.log("Author: " + day);
    console.log("Author: " + time);
    console.log("Author: " + key);
    $("#day").html(day);
   $("#time").html(time);
   $("#temp").html(temp);
   $("#address").html(address);
        

});


