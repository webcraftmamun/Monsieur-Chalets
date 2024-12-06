// Mobile menu toggle functionality
const toggleOpen = document.getElementById("toggleOpen"); // Button to open the mobile menu
const toggleClose = document.getElementById("toggleClose"); // Button to close the mobile menu
const collapseMenu = document.getElementById("collapseMenu"); // The mobile menu to be toggled

function handleClick() {
  // Check the current display status of the menu and toggle it
  if (collapseMenu.style.display === "block") {
    collapseMenu.style.display = "none"; // Hide the menu if it is currently visible
  } else {
    collapseMenu.style.display = "block"; // Show the menu if it is currently hidden
  }
}

// Add click event listeners to toggle the mobile menu open and close
toggleOpen.addEventListener("click", handleClick);
toggleClose.addEventListener("click", handleClick);

// Handle multiple language dropdowns
document.querySelectorAll(".language-button").forEach((button) => {
  const dropdown = button.nextElementSibling; // Target the dropdown element adjacent to the button

  // Toggle the visibility of the dropdown when the button is clicked
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the window
    dropdown.classList.toggle("hidden"); // Show/hide the dropdown
  });

  // Close the dropdown when clicking outside the button and dropdown
  window.addEventListener("click", (e) => {
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden"); // Hide the dropdown if the click is outside
    }
  });
});

function toggleAccordion(id) {
  // Select the content and icon for the specified accordion ID
  const content = document.getElementById(`content-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  const isOpen = content.style.maxHeight; // Check if the accordion is open by its max-height

  // Close all accordions
  document.querySelectorAll('[id^="content-"]').forEach((el) => {
    el.style.maxHeight = null; // Reset the height to close the accordion
  });
  document.querySelectorAll('[id^="icon-"]').forEach((el) => {
    el.classList.remove("rotate-180"); // Remove rotation from all icons
  });

  // Open the clicked accordion if it is not already open
  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + "px"; // Set height to its scroll height to expand
    icon.classList.add("rotate-180"); // Rotate the icon to indicate expansion
  }
}
