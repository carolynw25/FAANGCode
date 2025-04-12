const port = chrome.runtime.connect({ name: "content-script" });


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
    //return problemTag;
    //console.log(problemTag);
}

// Function to extract the problem description
const extractDescription = () => {
    const descriptionElement = document.querySelector('[data-track-load="description_content"]');
    if (descriptionElement) {
        problemDescription = descriptionElement.textContent.trim();
        //console.log("Problem Description:", problemDescription);
    } else {
        //console.log("Problem description not found!");
    }
};

// Function to extract the code
const extractCode = async () => {
    const codeEditor = document.querySelector('.monaco-scrollable-element'); // Main scrollable container
    if (!codeEditor) {
        //console.log("Code editor container not found!");
        return '';
    }

    //scroll up to top
    codeEditor.scrollTop = 0;
    //console.log("Scrolling to the top of the code editor...");
    await wait(200); // Wait for the DOM to update

    const linesMap = new Map(); // Use a Map to store lines with unique top values

    //console.log("Starting code extraction...");

    let counter = 0; // Counter to limit the number of lines processed
    // Scroll through the container to ensure all lines are loaded
    while (true) {
        const codeLines = document.querySelectorAll('.view-line'); // Visible lines in the editor
        if (codeLines.length === 0) {
            //console.log("No code lines found!");
            break;
        }
        if (counter === 0)
        {
            codeEditor.scrollBy(0, -200);
        }
        //console.log(`Found ${codeLines.length} code lines.`);
        for (let i = 0; i < codeLines.length; i++) {
            const lineStyle = codeLines[i].getAttribute('style'); // Extract the style attribute
            const lineText = codeLines[i].textContent; // Extract the text content of the line
            const topMatch = lineStyle.match(/top:(\d+)px;/); // Extract the top value using regex
            //console.log(lineStyle, lineText); // Log the style and text for debugging
            if (topMatch) {
                const topValue = parseInt(topMatch[1], 10); // Parse the top value as an integer
                linesMap.set(topValue, lineText); // Store the line with its top value as the key
            }
        }

        // Scroll down
        codeEditor.scrollBy(0, 98); // Scroll down by 100px
        await wait(200); // Wait for the DOM to update

        counter++;
        if (counter === 5)
            break; // Limit to 5 iterations to avoid infinite scrolling
    }

    // Sort lines by the top value in ascending order
    const sortedLines = Array.from(linesMap.entries())
        .sort((a, b) => a[0] - b[0]) // Sort by the top value (key)
        .map(entry => entry[1]); // Extract the text (value)

    // Join the sorted lines into a single string
    const extractedCode = sortedLines.join('\n');
    //console.log("Extracted Code:\n", extractedCode);
    return extractedCode; // Return the extracted code
};

window.addEventListener('load', async () => {
    //console.log("Page loaded. Waiting for problem description and code...");

    // Wait 3 seconds for the description to load
    await wait(1000);
    extractDifficulty();
    extractDescription();

    // Wait an additional 2 seconds for the code to load
    await wait(2000);
    problemCode = await extractCode(); // Ensure the extracted code is assigned to the global variable

    // Log the final results
    console.log("Final Problem Description:", problemDescription);
    console.log("Final Problem Code:", problemCode);
    console.log("Final Problem Tag:", problemTag);
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
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "hintButtonClicked") {
        console.log("Hint button clicked in popup, handling in content script...");

        // Extract the latest code
        problemCode = await extractCode(); // Await the fresh extraction of code
       // console.log("Extracted Code for hint:", problemCode);

        // Send the updated data to the background script
        port.postMessage({
            action: "callGeminiAPIHint",
            problemTag: problemTag,
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }

    if (message.action === "debugButtonClicked") {

        console.log("Debug button clicked in popup, handling in content script...");
        problemCode = await extractCode(); // Await the fresh extraction of code

        port.postMessage({
            action: "callGeminiAPIDebug",
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }

    if (message.action === "complexityButtonClicked") {
        console.log("Complexity button clicked in popup, handling in content script...");

        problemCode = await extractCode(); // Await the fresh extraction of code

        port.postMessage({
            action: "callGeminiAPIComplexity",
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }
});