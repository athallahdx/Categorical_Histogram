import { createLine, createRect, createText, removeChild } from "./svg.js";

const svg = document.getElementById("histogram");

function createHistogram(classNames, classFrequencies) {
  // Clear existing SVG content
  removeChild();

  const n = classNames.length;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const barWidth = n <= 20 ? 30 : 10;
  const spaceBar = n <= 20 ? 10 : 6; // Adjust spacing between bars
  const svgWidth = (barWidth + spaceBar) * n + margin.left + margin.right;
  let svgHeight = 300; // Default height, can adjust as needed
  let xBars = [];
  let highestFreq = Math.max(...classFrequencies);

  // Calculate y-axis label positions
  const yAxisLabels = [];
  const yLabelStep = highestFreq / 4; // Divide the y-axis into 4 steps
  for (let i = 0; i <= 4; i++) {
    yAxisLabels.push(svgHeight - margin.bottom - (i * yLabelStep * 100 * 4) / highestFreq);
  }

  // Create y-axis labels
  for (let i = 0; i < yAxisLabels.length; i++) {
    createText(margin.left - 5, yAxisLabels[i], (i * yLabelStep).toString());
  }

  // Calculate x-coordinates for bars with spacing
  for (let i = 0; i < n; i++) {
    xBars.push(margin.left + i * (barWidth + spaceBar));
  }

  // Create bars/rectangles with spacing
  for (let i = 0; i < n; i++) {
    const barHeight = (classFrequencies[i] * 100 * 4) / highestFreq;
    const yBar = svgHeight - margin.bottom - barHeight;

    createRect(xBars[i], yBar, barWidth, barHeight, classNames[i]);
  }

  // Create x-axis labels with staggered positioning
  for (let i = 0; i < n; i++) {
    const stagger = i % 2 === 0 ? 15 : -15; // Stagger every other label
    createText(xBars[i] + barWidth / 2, svgHeight - margin.bottom + stagger, classNames[i]);
  }

  // Create axis lines
  createLine(margin.left, svgWidth - margin.right, svgHeight - margin.bottom, svgHeight - margin.bottom); // x-axis
  createLine(margin.left, margin.left, margin.top, svgHeight - margin.bottom); // y-axis

  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
}

export { createHistogram };
