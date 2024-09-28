import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Right arrow test (existing)
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // Expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeTruthy();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeNull();

  // Move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to show, but not the first
  expect(container.querySelector('img[alt="testing image 1"]')).toBeNull();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeTruthy();
});

// Left arrow test
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move to the second image by clicking the right arrow first
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Now expect the second image to be shown
  expect(container.querySelector('img[alt="testing image 2"]')).toBeTruthy();
  expect(container.querySelector('img[alt="testing image 1"]')).toBeNull();

  // Click the left arrow to move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Now expect the first image to be shown again
  expect(container.querySelector('img[alt="testing image 1"]')).toBeTruthy();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeNull();
});

// New Test: Left arrow should be hidden on the first image
it("hides the left arrow when on the first image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Left arrow should be hidden on the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow.classList.contains("hidden")).toBe(true);  // Check if 'hidden' class exists
});

// New Test: Right arrow should be hidden on the last image
it("hides the right arrow when on the last image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move to the last image by clicking the right arrow twice
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Right arrow should be hidden on the last image
  expect(rightArrow.classList.contains("hidden")).toBe(true);  // Check if 'hidden' class exists
});
