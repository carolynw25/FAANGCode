document.addEventListener('DOMContentLoaded', () => {
    const port = chrome.runtime.connect({ name: "popup-connection" });

    // Add an event listener to the button to call api when clicked
    document.getElementById("callApiButton").addEventListener('click', () => {
        port.postMessage({ action: "sendProblemData" })
        const message = document.createElement('p');
        message.textContent = 'Button clicked!';
        contentDiv.appendChild(message);
    });
});