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

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".links a");
  const slides = document.querySelectorAll(".slider-main > div");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      slides.forEach((slide) => {
        if (slide.id === targetId) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
    });
  });
});
