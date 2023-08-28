function loadTime() {
  let tag = document.getElementById("load-time");
  let time = tag.textContent;
  let loadTime = `${Math.round(window.performance
    .getEntriesByType("navigation")[0].domComplete)} ms (client)`;
  tag.textContent = loadTime + " + " + time + "ms (server)";
}

window.addEventListener("load", () => loadTime());