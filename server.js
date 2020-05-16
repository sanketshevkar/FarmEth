var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
Web3 = require('web3');
var fs=require('fs');

web3 = new Web3("http://localhost:8545");
//const binPath=path.resolve(__dirname, 'contracts', 'Voting_sol_Temp.bin')
var bytecode = fs.readFileSync('Temp_sol_Temp.bin').toString();
abi = JSON.parse(fs.readFileSync('Temp_sol_Temp.abi').toString());
//deployedContract = new web3.eth.Contract(abi);

// Initialize Firebase (ADD YOUR OWN DATA)
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



function upd(k, a){
  firebase.database().ref('logs/'+k).set({
    address: a,
    temp: temp,
    day: day,
    time: time
  })
}

  
    
      messagesRef.on('child_added', function(data) {
        
        
        function readMessage(){
          return new Promise(function(resolve, reject){
            var newPost = data.val();
        day=newPost.day;
        temp=newPost.temp;
        time=newPost.time;
        key=data.key;
        console.log("Author: " + temp);
        console.log("Author: " + day);
        console.log("Author: " + time);
        console.log("Author: " + key);
            resolve(1);
      });
    };

    let promise=readMessage();
  promise.then(()=>{
    var address; 
    deployedContract = new web3.eth.Contract(abi)
    deployedContract.deploy({data: bytecode}).send({
      from: '0xe6798a170c60BDb76801abDCA992f15CcbB6540B',
      gas: 1500000,
      gasPrice: web3.utils.toWei('0.00003', 'ether')
    }).then((newContractInstance) => {
      deployedContract.options.address = newContractInstance.options.address
      console.log(newContractInstance.options.address)
      address = deployedContract.options.address;
      console.log(day);
      console.log(temp);
      typeof(temp);
      deployedContract.methods.updateDet(day, time, temp).send({from: '0x340F3999E53A3EcaEf0336Ed1291D14484CEAc5D'}).then((f) => {
        console.log(f);
        deployedContract.methods.returnDet().call(console.log)
        upd(key, address);
        //ca0ll the function that upload data to cloud here
      })
    });
  });
});
  
