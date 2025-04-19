let port;

// Function to establish and reconnect the port
function connectToBackground() {
    port = chrome.runtime.connect({ name: "content-script" });

    port.onDisconnect.addListener(() => {
        console.warn("Port disconnected. Attempting to reconnect...");
        setTimeout(connectToBackground, 1000);
    });

    port.onMessage.addListener((response) => {
        console.log("Response from background:", response);
    });
}

// Connect to background at start
connectToBackground();

let problemDescription = '';
let problemCode = ''; // Global variable to store the extracted code
let problemTag = '';

// Function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to extract the difficulty tag
const extractDifficulty = () => {
    const difficultyClasses = ["text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"];
    const tagElement = document.querySelector(`.relative.inline-flex.items-center.justify-center.text-caption.px-2.py-1.gap-1.rounded-full.bg-fill-secondary.${difficultyClasses.join(", .")}`);
    if (tagElement) {
        problemTag = tagElement.textContent.trim();
    }
};

// Function to extract the problem description
const extractDescription = () => {
    const descriptionElement = document.querySelector('[data-track-load="description_content"]');
    if (descriptionElement) {
        problemDescription = descriptionElement.textContent.trim();
    }
};

// Function to extract the code
const extractCode = async () => {
    const codeEditor = document.querySelector('.monaco-scrollable-element');
    if (!codeEditor) return '';

    codeEditor.scrollTop = 0;
    await wait(200);

    const linesMap = new Map();
    let counter = 0;

    while (true) {
        const codeLines = document.querySelectorAll('.view-line');
        if (codeLines.length === 0) break;
        if (counter === 0) codeEditor.scrollBy(0, -200);

        for (let i = 0; i < codeLines.length; i++) {
            const lineStyle = codeLines[i].getAttribute('style');
            const lineText = codeLines[i].textContent;
            const topMatch = lineStyle.match(/top:(\d+)px;/);
            if (topMatch) {
                const topValue = parseInt(topMatch[1], 10);
                linesMap.set(topValue, lineText);
            }
        }

        codeEditor.scrollBy(0, 98);
        await wait(200);

        counter++;
        if (counter === 5) break;
    }

    const sortedLines = Array.from(linesMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(entry => entry[1]);

    return sortedLines.join('\n');
};

window.addEventListener('load', async () => {
    await wait(1000);
    extractDifficulty();
    extractDescription();

    await wait(2000);
    problemCode = await extractCode();

    console.log("Final Problem Description:", problemDescription);
    console.log("Final Problem Code:", problemCode);
    console.log("Final Problem Tag:", problemTag);

    if (port) {
        port.postMessage({
            action: "sendProblemData",
            problemTag: problemTag,
            problemDescription: problemDescription,
            problemCode: problemCode
        });
    }
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "hintButtonClicked") {
        console.log("Hint button clicked in popup, handling in content script...");
        problemCode = await extractCode();

        if (port) {
            port.postMessage({
                action: "callGeminiAPIHint",
                problemTag: problemTag,
                problemDescription: problemDescription,
                problemCode: problemCode
            });
        }
    }

    if (message.action === "debugButtonClicked") {
        console.log("Debug button clicked in popup, handling in content script...");
        problemCode = await extractCode();

        if (port) {
            port.postMessage({
                action: "callGeminiAPIDebug",
                problemDescription: problemDescription,
                problemCode: problemCode
            });
        }
    }

    if (message.action === "complexityButtonClicked") {
        console.log("Complexity button clicked in popup, handling in content script...");
        problemCode = await extractCode();

        if (port) {
            port.postMessage({
                action: "callGeminiAPIComplexity",
                problemDescription: problemDescription,
                problemCode: problemCode
            });
        }
    }
});
