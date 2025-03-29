document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('messageContainer');
    const messageQueue = []; // Array to store the most recent 5 messages

    // Add an event listener to the "Hint" button
    document.getElementById("hintButton").addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "hintButtonClicked" });
        });
    });

    // Add an event listener to the "Debug" button
    document.getElementById("debugButton").addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "debugButtonClicked" });
        });
    });

    // Add an event listener to the "Complexity" button
    document.getElementById("complexityButton").addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "complexityButtonClicked" });
        });
    });

    chrome.runtime.onMessage.addListener((response) => {
        const message = document.createElement('p');

        // Set the message text
        if (response.status === "success") {
            message.textContent = response.GeminiAnswer;

            // Apply highlight class based on the action
            if (response.action === "callGeminiAPIHint") {
                message.classList.add('highlight-hint');
            } else if (response.action === "callGeminiAPIDebug") {
                message.classList.add('highlight-debug');
            } else if (response.action === "callGeminiAPIComplexity") {
                message.classList.add('highlight-complexity');
            }
        } else {
            message.textContent = `API Error: ${response.message}`;
        }

        // Add the new message to the queue
        messageQueue.push(message);

        // If the queue exceeds 5 messages, remove the oldest one
        if (messageQueue.length > 5) {
            messageQueue.shift();
        }

        // Clear the container and re-render the most recent 5 messages
        messageContainer.innerHTML = '';
        messageQueue.slice().reverse().forEach((msg, index) => {
            if (index === 0) {
                msg.classList.add('most-recent'); // Add a special class for the most recent message
            } else {
                msg.classList.remove('most-recent'); // Ensure older messages don't have this class
            }
            messageContainer.appendChild(msg);
        });
    });
});