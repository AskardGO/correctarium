let menuButton = $(".mobile__menu-button");
let menu = $(".mobile__menu");
let lines = document.querySelectorAll(".menu__line");

menuButton.addEventListener("click", ()=>{
    $(".square").classList.toggle("active")
    lines.forEach(line => line.classList.toggle("active"));
    menu.classList.toggle("active");
})

function $(selector) {
    return document.querySelector(selector)
}

