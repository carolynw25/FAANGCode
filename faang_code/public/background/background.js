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
                    GeminiAnswer: response
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response
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
                const prompt = `You are an expert programmer with a deep understanding of debugging and error identification in LeetCode-style coding problems. Your task is to analyze a given piece of code and identify only the errors that will break the code (e.g., syntax errors, runtime errors, or logical flaws that prevent the code from functioning correctly). Ignore formatting issues, stylistic improvements, or minor optimizations that don’t affect functionality.

Problem Description:
${message.problemDescription}

Code:
${message.problemCode}

Instructions:
Carefully analyze the code line by line, focusing on syntax errors, runtime errors, and logical flaws that will cause the code to fail or produce incorrect results.

Identify the exact line(s) where the error occurs.

Explain the nature of the error and why it will break the code.

If applicable, provide a minimal fix to resolve the error.

Provide your response in the following format:

Error Line: [Line number or code snippet]

Error Type: [Type of error, e.g., Syntax Error, Runtime Error, Logical Error]

Explanation: [Brief explanation of why the error will break the code]

Fix (if applicable): [Minimal fix to resolve the error]

Example Input:
cpp
Copy
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector <int> values;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target)
                    values.push_back(i);
                    values.push_back(j);
                    return values;
            }
        }
    }
};
Example Output:
Error Line: if (nums[i] + nums[j] == target)

Error Type: Logical Error

Explanation: The if statement is missing curly braces {} to group the statements that should execute when the condition is true. As a result, only values.push_back(i); is part of the if block, and the remaining lines execute unconditionally, leading to incorrect behavior.

Fix (if applicable):

cpp
Copy
if (nums[i] + nums[j] == target) {
    return {i, j}; // Directly return the indices
}
Error Line: The function does not return a value in all control paths.

Error Type: Logical Error

Explanation: If no pair is found, the function does not return a value, which will result in undefined behavior or a compilation error in some languages.

Fix (if applicable): Add a return statement at the end of the function:

cpp
Copy
return {}; `;
                const response = await callGeminiAPI({ prompt });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: response
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response
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
Problem Description:
${message.problemDescription}

Code:
${message.problemCode}
Provide your assessment in a single line using the following format:
Time Complexity: O(?), Space Complexity: O(?)

`;
                const response = await callGeminiAPI({ prompt });

                port.postMessage({
                    status: "success",
                    GeminiAnswer: response
                });

                // Send the response back to the popup script
                chrome.runtime.sendMessage({
                    status: "success",
                    GeminiAnswer: response
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