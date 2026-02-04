window.onload = setup;


function setup() {
  console.log("in week 4 ;)")
  
  document.querySelector("#boxA").addEventListener("click", runTimeOut)

   window.setInterval(addTextRecur,2000); //set interval = run every two second like a loop 
    function addTextRecur(){ 
    let parent = document.getElementById("parent");
        parent.innerHTML+=" NEW TEXT TO APPEAR RECUR ";
  }

  window.setTimeout(addTimeoutText,2000);

  function runTimeOut(){

     window.setTimeout(addTimeoutText,2000); // wait 2 seconds and then act (2000=seconds)
  } 

  //
  function addTimeoutText(){
    let parent = document.getElementById("parent");
    parent.innerHTML+=" NEW TEXT TO APPEAR ";
  } 

}


