window.onload= function(){
    console.log("keys");

    let speedX =5;
    letboxA = this.document.querySlector('#boxA');
    window.addEventListener("keydown",
    function(e)
    {

        if(this.e.key==="ArrowRight"){
            let currentPos= parseInt(boxA.style.left)
            boxA.style.left = currentPos+speedX+"px"


        }
        //body of callback function
    })
 //body of callback function
 //console.log(e,key);
 //console.log(e,key);

}