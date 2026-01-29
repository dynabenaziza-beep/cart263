window.load =function(){
    console.log("move");
    let box = this.document.querySelector('#draw-box-a');
    box.addEventListener("mousemove", drawBoxCallBack);


    let particle =this.document.createElement("div");
    function drawBoxCallBack(e){
        console.log("moving");
        //console.log(this)
        console.log(e)
        console.log(this.getBoundingClientRect())
        let offsetX = e.clientX -this.getBoundingClientRect().x
        let offsetY = e.clientY -this.getBoundingClientRect().y

        particle.style.left = offsetX+"px";
        particle.style.left = offsetX+"px";
       // this.innerHTML = ' x: ${e.clientX}. y:$ {e.clientY}';
    }
}