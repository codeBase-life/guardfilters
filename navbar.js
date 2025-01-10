const navLinks = document.querySelectorAll(".navlinks");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

// fetch("../footer/footer.html")
//   .then((res) => res.text())
//   .then((data) => {
//     document.getElementById("footer").innerHTML = data;
//   })
