import React from 'react';

const Response = ({ response }) => {
  if (!response) {
    console.log('no response', response);
    return null; // Don't display anything if there's no response yet
  }
  console.log('i got the response ', response);
  return (

    <div className="response bg-gray-100 border border-gray-300 rounded-md p-4 mt-4">
      <h3 className="font-bold mb-2">Assistant's Response:</h3>
      <p className="r-field text-gray-800" style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
    </div>
  );
};

export default Response;