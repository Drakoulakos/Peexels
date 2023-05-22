// Image Search
const imageSearchInput = document.getElementById("searchInput");
const imageSearchButton = document.getElementById("imageSearchButton");
const imageResultsContainer = document.getElementById("resultsContainer");

imageSearchButton.addEventListener("click", searchImages);
imageSearchInput.addEventListener("keyup", handleImageKeyPress);
document
  .getElementById("clearImageButton")
  .addEventListener("click", clearImageResults);

function searchImages() {
  const query = imageSearchInput.value;

  if (!query) {
    displayImageErrorMessage("Please type something");
    return;
  }

  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: "d3mgFTRyPdzTWXs6HIkOxRwxiAQ2ZCwWCzsm15yu0BnrjHicNa6BajF7",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.photos.length === 0) {
        displayNoImageResultsMessage();
      } else {
        displayImages(data.photos);
      }
    });
}

function clearImageResults() {
  imageResultsContainer.innerHTML = "";
}

function displayNoImageResultsMessage() {
  imageResultsContainer.innerHTML = "No results found.";
}

function displayImageErrorMessage(message) {
  imageResultsContainer.innerHTML = message;
}

function displayImages(photos) {
  clearImageResults();

  photos.forEach((photo) => {
    const imageElement = document.createElement("img");
    imageElement.src = photo.src.large;
    imageElement.alt = photo.photographer;
    imageResultsContainer.appendChild(imageElement);
  });
}

function handleImageKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchImages();
  }
}

// Video Search
const videoSearchInput = document.getElementById("videoSearchInput");
const videoSearchButton = document.getElementById("videoSearchButton");
const videoResultsContainer = document.getElementById("videoResultsContainer");

videoSearchButton.addEventListener("click", searchVideos);
videoSearchInput.addEventListener("keyup", handleVideoKeyPress);
document
  .getElementById("clearVideoButton")
  .addEventListener("click", clearVideoResults);

function searchVideos() {
  const query = videoSearchInput.value;

  if (!query) {
    displayVideoErrorMessage("Please type something");
    return;
  }

  fetch(`https://api.pexels.com/videos/search?query=${query}`, {
    headers: {
      Authorization: "d3mgFTRyPdzTWXs6HIkOxRwxiAQ2ZCwWCzsm15yu0BnrjHicNa6BajF7",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.videos.length === 0) {
        displayNoVideoResultsMessage();
      } else {
        displayVideos(data.videos);
      }
    });
}

function clearVideoResults() {
  videoResultsContainer.innerHTML = "";
}

function displayNoVideoResultsMessage() {
  videoResultsContainer.innerHTML = "No video results found.";
}

function displayVideoErrorMessage(message) {
  videoResultsContainer.innerHTML = message;
}

function displayVideos(videos) {
  clearVideoResults();

  videos.forEach((video) => {
    const videoElement = document.createElement("video");
    videoElement.src = video.video_files[0].link;
    videoElement.controls = true;
    videoResultsContainer.appendChild(videoElement);
  });
}

function handleVideoKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchVideos();
  }
}
