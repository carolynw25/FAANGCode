import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//ask alan if AI can grab link to leetcode question
//also store leetcode coding question title
//have a way to uniquely identify problems
//add a search bar later!

//1. should it be little button squares with just the question title->the user clicks and takes them to a separate page
//  where it shows their code and AI feedback and stuff
//  less cluttered that way
//2. -OR- should it be a scrollable list that shows all the problem details?
//  curr UI-> no need to navigate to another page

function ProblemList() {
    //if user not logged in, redirect
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    useEffect(() => {
        if (!username) {
            navigate('/login');  // Redirect if user not logged in
        }
    }, [username, navigate]);

    //these are hard coded now just to brainstorm UI
    //grab variables from back-end DB when we have data stored
    const problems = [
        {
            id: 1,
            title: "_Leetcode_Problem_Title_and_Link_here",
            link: "https://leetcode.com/problems/two-sum/",
            code: `def twoSum(nums, target): 
    for i in range(len(nums)): 
        for j in range(i + 1, len(nums)): 
            if nums[i] + nums[j] == target: 
                return [i, j]`,
            aiFeedback: "Consider using a dictionary (hash map) for O(n) time complexity."
        },
        {
            id: 2,
            title: "Reverse Linked List",
            link: "https://leetcode.com/problems/reverse-linked-list/",
            code: `class Solution: 
    def reverseList(self, head): 
        prev = None 
        curr = head 
        while curr: 
            temp = curr.next 
            curr.next = prev 
            prev = curr 
            curr = temp 
        return prev`,
            aiFeedback: "u suck try harder"
        }
    ];

    return (
        <div>
            <h1>Problem History</h1>
            <div className="problem-history-container">
                <div className="problem-list">
                    {problems.map((problem) => (
                        <div key={problem.id} className="problem-card">
                            {/* display title and link here*/}
                            <h2>
                                <a href={problem.link} target="_blank" rel="noopener noreferrer"> {problem.title} </a>
                            </h2>
                            {/*display user's code here*/}
                            <pre>{problem.code}</pre>
                            <div className="feedback-box">
                                {/*iterate and display ai hints here*/}
                                <strong>AI Feedback:</strong> {problem.aiFeedback}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProblemList;