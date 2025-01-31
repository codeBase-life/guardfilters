gsap.registerPlugin(ScrollTrigger);

// Function to animate number increments
function animateNumber(element, finalValue, duration) {
  gsap.fromTo(
    element,
    { innerText: 0 }, // Start from 0
    {
      innerText: finalValue, // Animate to the final value
      duration: duration, // Duration of the animation
      snap: { innerText: 1 }, // Snap to whole numbers
      ease: "power1.out", // Smooth easing
      scrollTrigger: {
        trigger: element, // Trigger element
        start: "top 80%", // Start animation when the top of the element is 80% into the viewport
        end: "bottom 20%", // End animation when the bottom of the element is 20% into the viewport
        toggleActions: "play none none none", // Play the animation once, no reset or replay
      },
    }
  );
}

// Animate each number
animateNumber("#inc_number1", 174, 2); // Animate #inc_number1 from 0 to 174
animateNumber("#inc_number2", 170, 2.5); // Animate #inc_number2 from 0 to 170
animateNumber("#inc_number3", 99, 2); // Animate #inc_number3 from 0 to 99
animateNumber("#inc_number4", 10, 2); // Animate #inc_number4 from 0 to 10
