const navLinks = document.querySelectorAll(".navlinks");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

var owl = $(".owl-carousel").owlCarousel({
  dots: true,
  loop: true,
  margin: 10,
  // dotsEach: true,
  responsiveClass: true,

  responsive: {
    0: {
      items: 1,
      loop: true,
      dots: true,
    },
    400: {
      items: 2,
      loop: true,
    },
    600: {
      items: 3,

      loop: true,
    },
    1000: {
      items: 4,

      loop: true,
    },
  },
});

$(".left-arrow").click(function (e) {
  e.preventDefault();
  owl.trigger("prev.owl.carousel");
});

$(".right-arrow").click(function (e) {
  e.preventDefault();
  owl.trigger("next.owl.carousel");
});
