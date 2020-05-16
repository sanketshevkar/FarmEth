
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
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


