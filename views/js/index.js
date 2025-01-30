const navLinks = document.querySelectorAll(".navlinks");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
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
