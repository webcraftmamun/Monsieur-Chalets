function updateSlider() {
  const items = document.querySelectorAll(".item");
  const totalItems = items.length;

  items.forEach((item, index) => {
    const position = index - Math.floor(totalItems / 2);
    const offset = 102; // Adjust spacing to account for 30px gap
    const zIndex = totalItems - Math.abs(position); // Higher zIndex for centered items
    const opacity = Math.max(0, 1 - Math.abs(position) / 3); // Fade items further away

    item.style.transform = `translate(${position * offset}%)`;
    item.style.zIndex = zIndex;
    item.style.opacity = opacity;
    item.style.backgroundPosition = `${50 + position * 20}% 50%`;
  });
}

document.getElementById("next").onclick = function () {
  const slide = document.getElementById("slide");
  slide.appendChild(slide.firstElementChild);
  updateSlider();
};

document.getElementById("prev").onclick = function () {
  const slide = document.getElementById("slide");
  slide.prepend(slide.lastElementChild);
  updateSlider();
};

// Initial setup
updateSlider();

const prevButton = document.getElementById("cottagesPrev");
const nextButton = document.getElementById("cottagesNext");
const carousel = document.getElementById("cottagesFiltering");

let currentIndex = 0; // Current starting index
let itemsToShow = 7; // Default number of visible items

// Dynamically set the number of visible items based on screen size
function updateItemsToShow() {
  const width = window.innerWidth;
  if (width < 768) {
    itemsToShow = 2; // Mobile
  } else if (width < 1024) {
    itemsToShow = 4; // Tablet
  } else {
    itemsToShow = 6; // PC
  }
}

// Update carousel position
function updateCarouselPosition() {
  const itemWidth =
    document.getElementById("cottagesFilteringWrapper").offsetWidth /
    itemsToShow;
  const offset = -(currentIndex * itemWidth);
  carousel.style.transform = `translateX(${offset}px)`;
}

// Handle "Next" button click
nextButton.addEventListener("click", () => {
  const totalItems = carousel.children.length;
  const maxIndex = totalItems - itemsToShow;

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarouselPosition();
  }
});

// Handle "Previous" button click
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
  }
});

// Update items to show and position on resize
window.addEventListener("resize", () => {
  updateItemsToShow();
  updateCarouselPosition();
});

// Initial setup
updateItemsToShow();
updateCarouselPosition();

document.querySelectorAll(".slider-container").forEach((container) => {
  const gallery = container.querySelector(".productGallery");
  const slides = gallery.querySelectorAll(".slide");
  const dotContainer = container.querySelector(".imageDot");

  let activeIndex = 0;

  // Create dots dynamically based on the number of images
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("productGalleryDot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index; // Store the index for the dot
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll(".productGalleryDot");

  // Function to update the slider
  function updateSlider(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    activeIndex = index;
  }

  // Add click event to dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateSlider(Number(dot.dataset.index));
    });
  });

  // Initialize the first slide
  updateSlider(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const experiencesSliderTrack = document.querySelector(
    ".experiences-slider-track"
  );
  const experiencesSlides = document.querySelectorAll(".experiences-slide");
  const experiencesPrevButton = document.querySelector("#experiencesPrev");
  const experiencesNextButton = document.querySelector("#experiencesNext");
  const experiencesCurrentPageEl = document.getElementById(
    "experiences-current-page"
  );
  const experiencesTotalPagesEl = document.getElementById(
    "experiences-total-pages"
  );

  let experiencesVisibleSlides = getVisibleSlides(); // Number of visible slides
  const experiencesTotalSlides = experiencesSlides.length;
  let experiencesSlideWidth =
    experiencesSlides[0].getBoundingClientRect().width;
  let experiencesCurrentIndex = 0;

  // Function to determine visible slides based on screen size
  function getVisibleSlides() {
    if (window.innerWidth >= 1024) {
      return 4; // Desktop
    } else if (window.innerWidth >= 768) {
      return 2; // Tablet
    } else {
      return 1; // Mobile
    }
  }

  // Update the track transform and pagination
  const experiencesMoveToIndex = (index) => {
    experiencesCurrentIndex = index;
    experiencesSliderTrack.style.transform = `translateX(-${
      index * experiencesSlideWidth
    }px)`;
    updatePagination();
  };

  // Update pagination
  const updatePagination = () => {
    const totalPages = Math.ceil(
      experiencesTotalSlides / experiencesVisibleSlides
    );
    const currentPage =
      Math.ceil(experiencesCurrentIndex / experiencesVisibleSlides) + 1;

    experiencesCurrentPageEl.textContent = currentPage;
    experiencesTotalPagesEl.textContent = totalPages;
  };

  // Adjust the slider settings on window resize
  const updateResponsiveSettings = () => {
    experiencesVisibleSlides = getVisibleSlides();
    experiencesSlideWidth = experiencesSlides[0].getBoundingClientRect().width;
    experiencesMoveToIndex(0); // Reset to the first slide
  };

  // Event listeners for navigation buttons
  experiencesNextButton.addEventListener("click", () => {
    const maxIndex = experiencesTotalSlides - experiencesVisibleSlides; // Update max index based on visible slides
    if (experiencesCurrentIndex < maxIndex) {
      experiencesMoveToIndex(experiencesCurrentIndex + 1);
    }
  });

  experiencesPrevButton.addEventListener("click", () => {
    if (experiencesCurrentIndex > 0) {
      experiencesMoveToIndex(experiencesCurrentIndex - 1);
    }
  });

  // Initialize slider
  updateResponsiveSettings();
  updatePagination();

  // Listen for window resize to adjust settings
  window.addEventListener("resize", updateResponsiveSettings);
});
