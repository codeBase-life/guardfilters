const navLinks = document.querySelectorAll(".navlinks");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

$(".carousel").slick({
  dots: true,
  infinite: true,
  speed: 300,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        centerPadding: "20px",

        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        centerPadding: "10px",
        centerMode: true,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        centerPadding: "20px",
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
$(".left-arrow").click(function (e) {
  e.preventDefault();
  $(".carousel").slick("slickPrev");
});

$(".right-arrow").click(function (e) {
  e.preventDefault();
  $(".carousel").slick("slickNext");
});

// fetch("../footer/footer.html")
//   .then((res) => res.text())
//   .then((data) => {
//     document.getElementById("footer").innerHTML = data;
//   })
