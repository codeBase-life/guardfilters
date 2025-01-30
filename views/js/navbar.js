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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchInput").value = "";
});

function searchProducts(query) {
  const searchResults = document.getElementById("searchResults");
  if (query.length < 2) {
    searchResults.innerHTML = "";
    searchResults.classList.remove("show");
    return;
  }
  searchResults.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;
  searchResults.classList.add("show");

  fetch(`/search?query=${query}`)
    .then((res) => res.json())
    .then((data) => {
      searchResults.innerHTML = "";
      if (data.length === 0) {
        searchResults.innerHTML =
          '<div class="dropdown-item text-muted text-center">No data found</div>';
      } else {
        data.forEach((product) => {
          searchResults.innerHTML += `
          <div class="d-flex border-bottom my-3">
              <img src="${product.imageUrl}" alt="no image" width="60" class="me-5">
              <a href="/product?title=${product.title}" class="dropdown-item" style=white-space:nowrape;overflow:hidden;text-overflow:ellipsis>${product.title}</a>
          </div>
             `;
        });
      }
      searchResults.classList.add("show");
    })
    .catch((error) => {
      console.error("Search error:", error);
      searchResults.innerHTML =
        '<div class="dropdown-item text-muted text-center">No data found</div>';
      searchResults.classList.add("show");
    });
}

document.addEventListener("click", function (event) {
  const searchResults = document.getElementById("searchResults");
  if (!event.target.closest(".input-group")) {
    searchResults.classList.remove("show");
  }
});
