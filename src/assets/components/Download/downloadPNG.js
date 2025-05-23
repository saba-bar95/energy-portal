import html2canvas from "html2canvas";

const downloadPNG = (e) => {
  // Find the closest parent element with the class 'main-chart'
  const chartElement = e.target.closest(".main-chart");
  if (!chartElement) return; // Ensure the element exists

  // Hide the dropdown content
  const dropdownContent = e.target
    .closest(".download-container")
    .querySelector(".dropdown-content");
  if (dropdownContent) {
    dropdownContent.style.display = "none"; // Hide the dropdown
  }

  html2canvas(chartElement).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // Convert canvas to PNG
    link.download = "chart.png"; // Set the file name
    link.click(); // Trigger the download

    // Show the dropdown content again after the download
    if (dropdownContent) {
      dropdownContent.style.display = "block"; // Show the dropdown again
    }
  });
};

export default downloadPNG;
