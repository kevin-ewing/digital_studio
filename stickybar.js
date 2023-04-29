window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var appearing = document.getElementById("appearing"); // get a reference to the new element

function myFunction() {
if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    appearing.classList.add("fade-in");
} else {
    navbar.classList.remove("sticky");
    appearing.classList.remove("fade-in");
}
}