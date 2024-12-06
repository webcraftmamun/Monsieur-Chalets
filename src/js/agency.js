// Select elements
const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const container = document.querySelector("#testimonialContainer > .flex");
const testimonialContainerItems = document.querySelector(
  ".testimonialContainerItems"
);

// Generate Dots Navigation dynamically based on testimonials length
const dotsContainer = document.querySelector(".dots-container");
const dots = [];

// Calculate dynamic width based on the number of items
testimonialContainerItems.style.width = `${testimonials.length * 100}%`;

// Create dots dynamically
for (let i = 0; i < testimonials.length; i++) {
  const dot = document.createElement("button");
  dot.classList.add("dot", "w-7", "h-1", "bg-gray-300", "transition-all");
  dotsContainer.appendChild(dot);
  dots.push(dot);
}

let currentIndex = 0;

// Update slider position and active dot
function updateSlider(index) {
  const offset = -(index * (100 / testimonials.length)); // Dynamic calculation
  container.style.transform = `translateX(${offset}%)`;

  // Update active dot
  dots.forEach((dot, idx) => {
    dot.classList.toggle("bg-blue-500", idx === index);
    dot.classList.toggle("bg-gray-300", idx !== index);
  });
}

// Navigate to next testimonial
function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateSlider(currentIndex);
}

// Navigate to previous testimonial
function prevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateSlider(currentIndex);
}

// Dot navigation
dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    currentIndex = idx;
    updateSlider(currentIndex);
  });
});

// Add event listeners
nextButton.addEventListener("click", nextTestimonial);
prevButton.addEventListener("click", prevTestimonial);

// Initialize
updateSlider(currentIndex);
