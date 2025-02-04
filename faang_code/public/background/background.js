// const { GoogleGenerativeAI } = require("@google/generative-ai");
//require('dotenv').config({ path: '../.env' });
// console.log("starting");
//

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

    port.onMessage.addListener(async (message) => {
        console.log("Message received in background script:", message);

        if (message.action === "sendProblemData") {
            try {
                const prompt = await callGeminiAPI({
                    prompt: `You are an expert programmer. You will be given a coding problem and a solution to the problem. Your task is to analyze the code and determine if it is correct or not. If the code is correct, respond with "CORRECT". If the code is incorrect, respond with "INCORRECT" and provide a brief explanation of the error(s) in the code. The coding problem is as follows: ${message.problemDescription} and this is my code: ${message.problemCode}`
                });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: prompt
                });
            } catch (error) {
                console.error("API call failed:", error);
                port.postMessage({
                    status: "error",
                    message: error.toString()
                });
            }
        }
    });
});

async function callGeminiAPI(data) {
    // Recommendation: Store API key securely, not in code
    const GEMINI_API_KEY = ""; // KEY HERE
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: data.prompt }],
                }],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Gemini API error: ${response.status} ${errorBody}`);
        }

        const result = await response.json();
        return result.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}