'use client'; // This directive is important for client-side interactivity

import React, { useState } from 'react';

const Inputs = ({ onResponse, onError, setLoading }) => {
    
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!prompt.trim()) {
      onError('Please enter a goal for your business.');
      return;
    }
    console.log('inputs.py: 3');

    setLoading(true);
    console.log('inputs.py: 4');
    onError(''); // Clear any previous errors

    try {
        const response = await fetch('/api/bedrock', { // Your Next.js API route
        // const response = await fetch('http://127.0.0.1:8000/chat/model/chat/anthropic.claude-v2/invoke', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      console.log('inputs.py: 5');

      if (!response.ok) {
        const errorData = await response.json();
        console.log('inputs.py: 6');
        throw new Error(`Failed to send prompt: ${response.status} - ${errorData?.detail || response.statusText}`);
      }
      const data = await response.json();
      console.log('Inputs.js: Data received from /api/bedrock:', data);
      onResponse(data.response); //based on the route.js completion --> route
    } catch (error) {
      console.error('Error sending prompt to backend:', error);
      onError(error.message);
    } finally {
        console.log('inputs.py: 9');
      setLoading(false);
    }

    //  clear the input field after submission
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">
          Enter your goal for your business:
        </label>
        <textarea
          id="prompt"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
          value={prompt}
          onChange={handleInputChange}
          placeholder="Clear goals means more productivity..."
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Inputs;