const svg = document.getElementById("histogram");

function createLine(x1, x2, y1, y2) {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", `${x1}`);
  newLine.setAttribute("x2", `${x2}`);
  newLine.setAttribute("y1", `${y1}`);
  newLine.setAttribute("y2", `${y2}`);
  newLine.setAttribute("stroke", "black");

  svg.appendChild(newLine);
}

function createRect(x, y, width, height, text, fill = "blue") {
  const newRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  newRect.setAttribute("x", `${x}`);
  newRect.setAttribute("y", `${y}`);
  newRect.setAttribute("width", `${width}`);
  newRect.setAttribute("height", `${height}`);
  newRect.setAttribute("fill", `${fill}`);

  // Add class name as a data attribute for rect
  newRect.setAttribute("data-class", text);

  // Add mouseover event listener to show text on hover
  newRect.addEventListener("mouseover", function () {
    createText(x + width / 2, y - 5, text);
  });

  newRect.addEventListener("mouseout", function () {
    removeText(text);
  });

  // Add rect to SVG
  svg.appendChild(newRect);
}

function createText(x, y, value = "") {
  const newText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  newText.setAttribute("x", x);
  newText.setAttribute("y", y);
  newText.setAttribute("font-size", "12");
  newText.setAttribute("fill", "black");
  newText.textContent = value;

  newText.setAttribute("class", "label");

  svg.appendChild(newText);
}

function removeText(text) {
  const labels = svg.querySelectorAll(".label");
  labels.forEach((label) => {
    if (label.textContent === text) {
      svg.removeChild(label);
    }
  });
}

function removeChild() {
  const line = svg.querySelectorAll("line");
  const rect = svg.querySelectorAll("rect");
  const text = svg.querySelectorAll("text");
  line.forEach((e) => {
    svg.removeChild(e);
  });
  text.forEach((e) => {
    svg.removeChild(e);
  });
  rect.forEach((e) => {
    svg.removeChild(e);
  });
}

export { createLine, createRect, createText, removeChild, removeText };
