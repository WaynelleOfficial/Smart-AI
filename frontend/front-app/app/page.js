// export default function Landing() {
//   return (
//     <main>
//       <img src="/logo.png" alt="A server surrounded by magic sparkles." />
//       <h1>Welcome to BuizGoals AI!</h1>
//       <p>Lets get started!</p>
//       <p>Please enter your buissness name:</p>
//       <p>Please enter a descrpition of your buissness: </p>
//     </main>
//   );
// }

'use client';

import React, { useState } from 'react';
import Inputs from './components/Inputs'; // Renamed from BedrockForm
import Response from './components/Response'; // Your new response display component
import LoadingSpinner from './components/LoadingSpinner'; // Optional

const HomePage = () => {
  const [bedrockResponse, setBedrockResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResponse = (response) => {
    console.log('page.js: handleResponse called with:', response);
    setBedrockResponse(response);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setBedrockResponse('');
  };
  // console.log('bedrockResponse state:', bedrockResponse); Yay no longer undefined

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BuizGoals AI</h1>
      <Inputs
        onResponse={handleResponse}
        onError={handleError}
        setLoading={setLoading}
      />

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      

      {bedrockResponse && <Response response={bedrockResponse} />}
    </div>
  );
};

export default HomePage;

