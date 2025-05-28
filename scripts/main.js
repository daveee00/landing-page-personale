// Import player-related functions
import { playerCheck, gradientsCheck, crossCheckPlayer } from './player.js';

const pictureArray = [
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_4.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/oswald-1.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/oswald-2.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_8.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_7.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_6.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_5.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_3.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/Immagine_2.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/array/IMG_0489.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/mickey.png",
  "https://cdn.jsdelivr.net/gh/daveee00/drawings/selfPt.png",
];

const textListElement = [
  "li-01",
  "li-02",
  "li-03",
  "li-04",
  "li-05",
  "li-06",
  "li-07",
  "li-08",
  "li-09",
  "li-10",
  "li-11",
  "li-12",
  "li-13",
];

function logPictureArrayIndices() {}

function logTextListElementIndices() {}

function crossCheck(clickedId) {
  const index = textListElement.indexOf(clickedId);
  if (index !== -1) {
  }
}

function sketchbookShow(clickedId) {
  const index = textListElement.indexOf(clickedId);
  if (index !== -1) {
    const sketchbookImage = document.querySelector("#skt-canvas img");
    if (sketchbookImage) {
      sketchbookImage.src = pictureArray[index];
      console.log(`Updated sketchbook image to: ${pictureArray[index]}`);
      
      // Handle responsive image sizing
      const handleImageSize = () => {
        if (window.matchMedia("(max-width: 1000px)").matches) {
          // Wait for image to load before calculating dimensions
          sketchbookImage.onload = () => {
            const containerHeight = sketchbookImage.parentElement.clientHeight;
            const containerWidth = sketchbookImage.parentElement.clientWidth;
            const imageRatio = sketchbookImage.naturalWidth / sketchbookImage.naturalHeight;
            
            // Calculate dimensions to fit height while maintaining aspect ratio
            let newHeight = containerHeight;
            let newWidth = newHeight * imageRatio;
            
            // If width is too large, scale based on width instead
            if (newWidth > containerWidth) {
              newWidth = containerWidth;
              newHeight = newWidth / imageRatio;
            }
            
            sketchbookImage.style.maxHeight = `${newHeight}px`;
            sketchbookImage.style.maxWidth = `${newWidth}px`;
            sketchbookImage.style.width = "auto";
            sketchbookImage.style.height = "auto";
            sketchbookImage.style.objectFit = "contain";
          };
        } else {
          // Reset styles for larger screens
          sketchbookImage.style.maxHeight = "";
          sketchbookImage.style.maxWidth = "";
          sketchbookImage.style.width = "";
          sketchbookImage.style.height = "";
          sketchbookImage.style.objectFit = "";
        }
      };

      // Set initial size
      handleImageSize();
      
      // Update size on window resize
      window.addEventListener("resize", handleImageSize);
    }
  }
}

function updateButtonClasses(clickedId) {
  // Remove classes from all buttons and their spans
  textListElement.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.classList.remove("list-element-after");
      button.classList.remove("button-after");
      const span = button.querySelector("span");
      if (span) {
        span.classList.remove("list-artist-after");
      }
    }
  });

  // Add classes to clicked button and its span
  const clickedButton = document.getElementById(clickedId);
  if (clickedButton) {
    clickedButton.classList.add("list-element-after");
    clickedButton.classList.add("button-after");
    const span = clickedButton.querySelector("span");
    if (span) {
      span.classList.add("list-artist-after");
    }
  }
}

function resetButtonClasses() {
  textListElement.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.classList.remove("list-element-after");
      button.classList.remove("button-after");
      const span = button.querySelector("span");
      if (span) {
        span.classList.remove("list-artist-after");
      }
    }
  });
}

// Add click event listeners to all list elements
window.addEventListener("load", () => {
  logPictureArrayIndices();
  logTextListElementIndices();

  crossCheckPlayer();

  // Add click listeners to all list elements
  textListElement.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from bubbling up
        crossCheck(id);
        sketchbookShow(id);
        updateButtonClasses(id);
      });
    }
  });

  // Add click listener to document for click-outside functionality
  document.addEventListener("click", (event) => {
    const sketchbookArea = document.querySelector(".sketchbook-canvas-area");
    if (sketchbookArea && !sketchbookArea.contains(event.target)) {
      resetButtonClasses();
    }
  });
});
