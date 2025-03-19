chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected to:", port.name);

    port.onMessage.addListener(async (message) => {
        console.log("Message received in background script:", message);

        if (message.action === "sendProblemData") {
            try {
                const prompt = await callGeminiAPI({
                    prompt: `You are an expert programmer. You will be given a coding problem and a solution to the problem. Your task is to analyze the code and determine if it is correct or not. If the code is correct, respond with "CORRECT". If the code is incorrect, respond with "INCORRECT" and provide a brief explanation of the error(s) in the code. The coding problem is as follows: ${message.problemDescription} and this is my code: ${message.problemCode}. This is leetcode syntax style question.`
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
        } else if (message.action === "callGeminiAPIHint") {
            try {
                const prompt = `Looking at the problem description and the given code, provide a hint to fix any debugging issues.
                The hint should be a short and simple hint without being too long.
                If there are no debugging issues, say "The code looks good." If there is another optimal solution,
                give a hint towards it but do not give the solution outright.This is on leetcode so it follows leetcode syntax.
                The problem description is: ${message.problemDescription}. This is my code: ${message.problemCode}`;
                const response = await callGeminiAPI({ prompt });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });
            } catch (error) {
                console.error("API call failed:", error);
                port.postMessage({
                    status: "error",
                    message: error.toString()
                });

                // Send the error back to the popup script
                chrome.runtime.sendMessage({
                    status: "error",
                    message: error.toString()
                });
            }
        }
        else if (message.action === "callGeminiAPIDebug") {
            try {
                const prompt = `Analyze this code solution for the LeetCode problem:
Problem: ${message.problemDescription}
Code: ${message.problemCode}
Instructions:

First, determine if this solution would pass LeetCode tests as written
If it would pass, respond EXACTLY with: "SOLUTION PASSES - No critical errors"
If it would fail, identify ONLY the exact line causing failure

For failing solutions only:
CopyFAILING LINE: [exact line of code causing the issue]
REASON: [brief explanation of why it fails]
FIX: [minimal code change to fix]
Do not comment on:

Unused variables
Style issues
Optimizations
Any issue that doesn't prevent the code from passing tests`;
                const response = await callGeminiAPI({ prompt });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });
            } catch (error) {
                console.error("API call failed:", error);
                port.postMessage({
                    status: "error",
                    message: error.toString()
                });

                // Send the error back to the popup script
                chrome.runtime.sendMessage({
                    status: "error",
                    message: error.toString()
                });
            }
        }
        else if (message.action === "callGeminiAPIComplexity") {
            try {
                const prompt = `You are an expert programmer with a deep understanding of algorithms and computational complexity. Your task is to analyze a LeetCode-style coding problem and its corresponding solution. Carefully evaluate the code, considering built-in functions, language-specific optimizations, and problem constraints, and determine its time complexity and space complexity.

Pay special attention to:
- **Dynamic data structures** (e.g., vectors, hash maps, linked lists): If a vector (or equivalent resizable array) is created and stores n elements, the space complexity is **at least O(n)**.
- **Recursive function calls** and the additional space required for the call stack.
- **In-place modifications** versus auxiliary space usage.
- **Hidden complexities** in built-in functions or language-specific optimizations.

**Problem Description:**
${message.problemDescription}

**Code:**
${message.problemCode}

Provide your assessment in a single line using the following format:
Time Complexity: O(?), Space Complexity: O(?)

`;
                const response = await callGeminiAPI({ prompt });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response,
                    action: message.action
                });
            } catch (error) {
                console.error("API call failed:", error);
                port.postMessage({
                    status: "error",
                    message: error.toString()
                });

                // Send the error back to the popup script
                chrome.runtime.sendMessage({
                    status: "error",
                    message: error.toString()
                });
            }
        }
    });
});

async function callGeminiAPI(data) {

    // Key is something A8 IzaSyDM_uaNe9uD16fn63j1zIYj_zMiuVPaMN dsafasfa
    const GEMINI_API_KEY = ""; // KEY HERE

    const model = "gemini-2.0-flash-lite-001"; // Updated model
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

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

async function callGPTAPI(data) {
    const GPT_KEY = "your_gpt_api_key"; // Replace with your actual GPT API key
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GPT_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: data.prompt,
                },
            ],
        }),
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`GPT API error: ${response.status} ${errorBody}`);
        }
        const chatGPTResults = await response.json();
        return chatGPTResults.choices[0].message.content;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}