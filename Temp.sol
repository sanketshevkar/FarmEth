pragma solidity ^0.6.4;

contract Temp {
  
  
  struct Details{
      string day;
      string time;
      string temp;
  }
  

  Details public farmer;


  constructor() public {
  }


  function updateDet(string memory day, string memory time, string memory temp ) public  {
    farmer.day=day;
    farmer.time=time;
    farmer.temp=temp;
  }
  
  
 function returnDet() public view returns (string memory, string memory, string memory)  {
    return(farmer.day, farmer.time, farmer.temp);
  }
  
}