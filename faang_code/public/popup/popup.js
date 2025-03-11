// document.addEventListener('DOMContentLoaded', () => {
//     const port = chrome.runtime.connect({ name: "popup-connection" });

//     // Add an event listener to the button to call api when clicked
//     /*document.getElementById("callApiButton").addEventListener('click', () => {
//         port.postMessage({ action: "sendProblemData" });
//         const message = document.createElement('p');
//         message.textContent = 'Button clicked!';
//         document.getElementById('messageContainer').appendChild(message);
//     });*/

//     // Add an event listener to the "Hint" button
//     document.getElementById("hintButton").addEventListener('click', () => {
//         port.postMessage({ action: "callGeminiAPI" });
//         const message = document.createElement('p');
//         message.textContent = 'Hint button clicked!';
//         document.getElementById('messageContainer').appendChild(message);

//         // Send a message to the content script
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "hintButtonClicked" });
//         });
//     });

//     port.onMessage.addListener((response) => {
//         const message = document.createElement('p');
//         if (response.status === "success") {
//             message.textContent = `API Response: ${response.GeminiAnswer}`;
//         } else {
//             message.textContent = `API Error: ${response.message}`;
//         }
//         document.getElementById('messageContainer').appendChild(message);
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    // Add an event listener to the "Hint" button
    document.getElementById("hintButton").addEventListener('click', () => {
        // Send a message to the content script to get the problem description and code
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "hintButtonClicked" });
        });
    });

    document.getElementById("debugButton").addEventListener('click', () => {
        // Send a message to the content script to get the problem description and code
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "debugButtonClicked" });
        });
    });

    document.getElementById("complexityButton").addEventListener('click', () => {
        // Send a message to the content script to get the problem description and code
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "complexityButtonClicked" });
        });
    });

    chrome.runtime.onMessage.addListener((response) => {
        const message = document.createElement('p');
        if (response.status === "success") {
            message.textContent = `API Response: ${response.GeminiAnswer}`;
        } else {
            message.textContent = `API Error: ${response.message}`;
        }
        document.getElementById('messageContainer').appendChild(message);
    });
});