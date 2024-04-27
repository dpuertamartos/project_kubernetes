# File: random_string_service.py
from flask import Flask, jsonify
import string
import random
import requests  # Import the requests library
import os

MESSAGE = os.getenv('MESSAGE', 'Default message if not provided')

app = Flask(__name__)

def generate_random_string(string_length=10):
    """
    Generates a random string of string_length size
    """
    all_alphanum_chars = list(string.ascii_lowercase + string.ascii_uppercase + string.digits)
    random_str = "".join(random.choice(all_alphanum_chars) for _ in range(string_length))
    return random_str

@app.route('/')
def random_string():
    """
    Endpoint to generate and show a random string
    """
    random_str = generate_random_string()
    timestamp = "Not available"
    # Default message in case the file can't be read

    try:
        with open("./files/storage.txt", "r") as f:
            timestamp = f.read().strip()  # Read and strip any leading/trailing whitespace
    except Exception as e:
        print(f"Error reading from storage.txt: {e}")

    counter = "Not available"
    try:
        # Make request to the counter service
        response = requests.get("http://flask-app-counter-svc:2346/pingpong")
        if response.status_code == 200:
            counter = response.json().get('counter', 'Not available')  # Assuming the service returns a JSON with a 'counter' key
        else:
            print(f"Error obtaining counter: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error obtaining counter: {e}")

    return jsonify({'message': MESSAGE, 'timestamp': timestamp, 'random_string': random_str, 'counter': counter})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
