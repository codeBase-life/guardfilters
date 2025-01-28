function updateLimit(limit) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("limit", limit);
  currentUrl.searchParams.set("page", 1);
  window.location.href = currentUrl.toString();
}

function updateSort(value) {
  const url = new URL(window.location.href);
  url.searchParams.set("sort", value);
  window.location.href = url.toString();
}
