import { createLine, createRect, createText, removeChild } from "./svg.js";

const svg = document.getElementById("histogram");

function createHistogram(classNames, classFrequencies) {
  removeChild();

  const n = classNames.length;
  const margin = { top: 20, right: 20, bottom: 100, left: 80 }; // Adjusted bottom margin for more space for text
  const barWidth = n <= 20 ? 30 : 10;
  const spaceBar = n <= 20 ? 10 : 6;
  let svgWidth = (barWidth + spaceBar) * n + margin.left + margin.right; // Adjusted width based on number of bars
  let svgHeight = 300; // default height
  let highestFreq = Math.max(...classFrequencies);

  // Adjust svgHeight based on highest frequency
  svgHeight = 300; // Set a fixed height for the SVG
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const yAxisLabels = [];
  const yLabelStep = highestFreq / 4;
  for (let i = 0; i <= 4; i++) {
    yAxisLabels.push(svgHeight - margin.bottom - (i * yLabelStep * chartHeight) / highestFreq);
  }

  for (let i = 0; i < yAxisLabels.length; i++) {
    createText(margin.left - 5, yAxisLabels[i], Math.round(i * yLabelStep).toString(), {
      "text-anchor": "end",
      "dominant-baseline": "middle"
    });
  }

  const totalBarWidth = n * barWidth + (n - 1) * spaceBar;
  const startX = margin.left + (svgWidth - margin.left - margin.right - totalBarWidth) / 2;

  let xBars = [];
  for (let i = 0; i < n; i++) {
    xBars.push(startX + i * (barWidth + spaceBar));
  }

  for (let i = 0; i < n; i++) {
    const barHeight = (classFrequencies[i] * chartHeight) / highestFreq;
    const yBar = svgHeight - margin.bottom - barHeight;
    createRect(xBars[i], yBar, barWidth, barHeight, {
      fill: "blue" // Set the fill color to blue
    });
  }

  for (let i = 0; i < n; i++) {
    createText(xBars[i] + barWidth / 2, svgHeight - margin.bottom + 30, classNames[i], {
      "text-anchor": "middle",
      "dominant-baseline": "hanging",
      transform: `rotate(45, ${xBars[i] + barWidth / 2}, ${svgHeight - margin.bottom + 30})`
    });
  }

  createLine(margin.left, svgWidth - margin.right, svgHeight - margin.bottom, svgHeight - margin.bottom);
  createLine(margin.left, margin.left, margin.top, svgHeight - margin.bottom);

  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
}

export { createHistogram };
