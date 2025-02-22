import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

url = "https://leetcode-api.p.rapidapi.com/user/ajwang611"

headers = {
    "x-rapidapi-key": os.getenv("rapid_api"),
    "x-rapidapi-host": "leetcode-api.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())

response = requests.get(url, headers=headers)
dataStuff = response.json()

# Check if the response contains the expected data
if 'data' in dataStuff and 'matchedUser' in dataStuff['data'] and 'languageProblemCount' in dataStuff['data']['matchedUser']:
    # Extract the language and problems solved
    language_problem_count = dataStuff['data']['matchedUser']['languageProblemCount']

    # Print the language and problems solved
    for entry in language_problem_count:
        print(f"{entry['languageName']}: {entry['problemsSolved']}")

    # Calculate the total number of problems solved
    total_problems_solved = sum(entry['problemsSolved'] for entry in language_problem_count)
    print(f"Total problems solved: {total_problems_solved}")
else:
    print("Unexpected response format:", dataStuff)