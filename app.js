// Get the search input and search button elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");

// Add event listeners
searchButton.addEventListener("click", searchImages);
searchInput.addEventListener("keyup", handleKeyPress);
document.getElementById("clearButton").addEventListener("click", function () {
  resultsContainer.innerHTML = "";
});

// Function to handle image search
function searchImages() {
  const query = searchInput.value;

  if (!query) {
    displayErrorMessage("Please type something");
    return;
  }

  // Make a request to the Pexels API
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: "d3mgFTRyPdzTWXs6HIkOxRwxiAQ2ZCwWCzsm15yu0BnrjHicNa6BajF7", // Replace with your API key
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.photos.length === 0) {
        displayNoResultsMessage();
      } else {
        displayImages(data.photos);
      }
    });
}

// Function to display a message for empty results
function displayNoResultsMessage() {
  resultsContainer.innerHTML = "No results found.";
}

// Function to display an error message
function displayErrorMessage(message) {
  resultsContainer.innerHTML = message;
}

// Function to display the images
function displayImages(photos) {
  // Clear previous search results
  resultsContainer.innerHTML = "";

  // Loop through the photos and create image elements
  photos.forEach((photo) => {
    const imageElement = document.createElement("img");
    imageElement.src = photo.src.large;
    imageElement.alt = photo.photographer;
    resultsContainer.appendChild(imageElement);
  });
}

// Function to handle key press event
function handleKeyPress(event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    searchImages();
  }
}
