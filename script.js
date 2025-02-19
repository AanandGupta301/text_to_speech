document.addEventListener("DOMContentLoaded", function () {
    // Get required elements
    const button = document.getElementById("contentBtn");
    const speechsynth = window.speechSynthesis;
    const textInput = document.getElementById("textconvert");
    const error = document.getElementById("error-para");

    // Check if Speech Synthesis API is supported
    if (!("speechSynthesis" in window)) {
        error.textContent = "Speech Synthesis is not supported in this browser.";
        return;
    }

    // Button Click Event
    button.addEventListener("click", function () {
        const enteredText = textInput.value.trim();

        if (enteredText.length === 0) {
            error.textContent = "Nothing to convert";
            return;
        } else {
            error.textContent = ""; // Clear error message
        }

        if (speechsynth.speaking) {
            speechsynth.cancel(); // Stop previous speech
        }

        const newUtterance = new SpeechSynthesisUtterance(enteredText);
        speechsynth.speak(newUtterance);
        button.textContent = "Sound is playing...";

        // Reset button text after speech finishes
        newUtterance.onend = () => {
            button.textContent = "Play converted sound";
        };
    });
});