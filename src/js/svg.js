const svg = document.getElementById("histogram");

function createRect(x, y, width, height, className) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("class", className);
  rect.style.fill = "blue"; // Use CSS to define colors
  svg.appendChild(rect);
}

function createText(x, y, textContent, attributes = {}) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.textContent = textContent;

  for (const [key, value] of Object.entries(attributes)) {
    text.setAttribute(key, value);
  }

  svg.appendChild(text);
}

function createLine(x1, x2, y1, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("x2", x2);
  line.setAttribute("y1", y1);
  line.setAttribute("y2", y2);
  line.style.stroke = "black"; // Default color
  svg.appendChild(line);
}

function removeChild() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}

export { createRect, createText, createLine, removeChild };

