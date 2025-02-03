// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config({ path: '../.env' });
// console.log("starting");
// var apiKey = process.env.GEMINI_API_KEY;

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = `You are an expert programmer. You will be given a coding problem and a solution to the problem. Your task is to analyze the code and determine if it is correct or not. If the code is correct, respond with "CORRECT". If the code is incorrect, respond with "INCORRECT" and provide a brief explanation of the error(s) in the code. The coding problem is as follows: and this is my code:`;

// async function generateContent(problemDescription, problemCode) {
//     const fullPrompt = `${prompt}\n\nProblem Description: ${problemDescription}\n\nCode: ${problemCode}`;
//     const result = await model.generateContent(fullPrompt);
//     console.log(result.response.text());
// }

// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "sendProblemData") {
//         // Extract the data from the message
//         const problemDescription = message.problemDescription;
//         const problemCode = message.problemCode;

//         // Log the data in the background script
//         console.log("Received Problem Description in Background:", problemDescription);
//         console.log("Received Problem Code in Background:", problemCode);

//         // Call the generateContent function with the received data
//         generateContent(problemDescription, problemCode);
//     }
// });

chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected to:", port.name);

    port.onMessage.addListener((message) => {
        console.log("Message received in background script:", message);

        if (message.action === "sendProblemData") {
            console.log("Received Problem Description:", message.problemDescription);
            console.log("Received Problem Code:", message.problemCode);

            port.postMessage({ status: "Data received successfully!" });
        }
    });
});

chrome.aiOrgin