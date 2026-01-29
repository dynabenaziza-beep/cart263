function setup(){
    console.lpg("events!")

let introSection = document.getElementById("intro");
introSection.addEventListener("click",mouseIntroHandler)

let allSections= document.querySelectorAll(".mouseclick-active-section");
for(let element of allSections){
    element.addEventListerner("click", changeOfSection)
}

function changeOpacityOfsection(e){
    console.log(this);
    if(this.getAttribute("custom-bool")==="inactive"){

    
        let classToAdd = '${this.id}-section-active'
    let classToAdd = '${this.id}-section-p-active'
    this.classList.remove(classToAdd);
    document.querySelector('#${this.id}').classLisr.add(classToAddP)
    classList.remove(classToAddp)

    this.setAtrribute("custom-bool", "active")
        console.log(this);


}
function mouseIntroHandler(e){
console.log("hello");

console.log(this);
this.style.background= 'rgba(214,110,239,0.5)';
console.log(document.querySelector('#${this.id} p'));

  console.log("#"+ this.id+ "p")
  classList.add("intro-section-p-active");
}
}