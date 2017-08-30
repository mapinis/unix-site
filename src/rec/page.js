var input = document.getElementById("input");
input.addEventListener("mousedown", function(event){
    event.stopImmediatePropagation();
    event.preventDefault();
})