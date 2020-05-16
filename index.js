web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[2];
})

abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"farmer","outputs":[{"internalType":"string","name":"day","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"temp","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"returnDet","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"day","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"temp","type":"string"}],"name":"updateDet","outputs":[],"stateMutability":"nonpayable","type":"function"}]')

contract = new web3.eth.Contract(abi);



function getInfo(address) {

 addresst = $("#address").val();
 contract.options.address = addresst;
 console.log(addresst);

 contract.methods.returnDet().call().then((f) => {
   let {0:day, 1:time, 2:temp}=f;
   $("#day").html(day);
   $("#time").html(time);
   $("#temp").html(temp);
  })
}


