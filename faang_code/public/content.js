const port = chrome.runtime.connect({ name: "content-script" });

console.log("hi");

let problemDescription = '';
let problemCode = ''; // Global variable to store the extracted code
let problemTag = '';

// Function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Function to extract the difficulty tag
const extractDifficulty = () => {
    const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"];
    const tagElement = document.querySelector(`.relative.inline-flex.items-center.justify-center.text-caption.px-2.py-1.gap-1.rounded-full.bg-fill-secondary.${difficultyClasses.join(", .")}`);
    problemTag = tagElement.textContent.trim()
    console.log(problemTag);
}

// Function to extract the problem description
const extractDescription = () => {
    const descriptionElement = document.querySelector('[data-track-load="description_content"]');
    if (descriptionElement) {
        problemDescription = descriptionElement.textContent.trim();
        console.log("Problem Description:", problemDescription);
    } else {
        console.log("Problem description not found!");
    }
};

// Function to extract the code
const extractCode = async () => {
    const codeEditor = document.querySelector('.monaco-scrollable-element'); // Main scrollable container
    if (!codeEditor) {
        console.log("Code editor container not found!");
        return '';
    }

    let extractedCode = ''; // Temporary variable to store the extracted code
    let previousScrollTop = -1;

    // Scroll through the container to ensure all lines are loaded
    while (true) {
        const codeLines = document.querySelectorAll('.view-line'); // Visible lines in the editor
        for (let i = 0; i < codeLines.length; i++) {
            extractedCode += codeLines[i].textContent + '\n';
        }

        // Scroll down
        codeEditor.scrollBy(0, 100); // Scroll down by 100px
        await wait(200); // Wait for the DOM to update

        // Check if scrolling has reached the bottom
        if (codeEditor.scrollTop === previousScrollTop) {
            break; // Exit the loop if no new content is loaded
        }
        previousScrollTop = codeEditor.scrollTop;
    }

    console.log("Extracted Code:\n", extractedCode);
    return extractedCode; // Return the extracted code
};

window.addEventListener('load', async () => {
    console.log("Page loaded. Waiting for problem description and code...");

    // Wait 3 seconds for the description to load
    await wait(3000);
    extractDifficulty();
    extractDescription();

    // Wait an additional 2 seconds for the code to load
    await wait(2000);
    problemCode = await extractCode(); // Ensure the extracted code is assigned to the global variable

    // Log the final results
    console.log("Final Problem Description:", problemDescription);
    console.log("Final Problem Code:", problemCode);

    port.postMessage({
        action: "sendProblemData",
        problemTag: problemTag,
        problemDescription: problemDescription,
        problemCode: problemCode
    });

    port.onMessage.addListener((response) => {
        console.log("Response from background:", response);
    });
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "hintButtonClicked") {
        console.log("Hint button clicked in popup, handling in content script...");
        port.postMessage({
            action: "callGeminiAPIHint",
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }

    if (message.action === "debugButtonClicked") {
        console.log("Debug button clicked in popup, handling in content script...");
        port.postMessage({
            action: "callGeminiAPIDebug",
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }

    if (message.action === "complexityButtonClicked") {
        console.log("Complexity button clicked in popup, handling in content script...");
        port.postMessage({
            action: "callGeminiAPIComplexity",
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }
});