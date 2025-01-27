console.log("hi");

let problemDescription = '';
let problemCode = '';

// Function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
const extractCode = () => {
    const codeLines = document.querySelectorAll('.view-line');
    if (codeLines.length > 0) {
        problemCode = '';
        codeLines.forEach(line => {
            problemCode += line.textContent + '\n';
        });
        console.log("Extracted Code:\n", problemCode);
    } else {
        console.log("Code editor not found or no lines detected!");
    }
};

window.addEventListener('load', async () => {
    console.log("Page loaded. Waiting for problem description and code...");

    // Wait 3 seconds for the description to load
    await wait(3000);
    extractDescription();

    // Wait an additional 2 seconds for the code to load
    await wait(2000);
    extractCode();

    // Log the final results
    console.log("Final Problem Description:", problemDescription);
    console.log("Final Problem Code:", problemCode);
});