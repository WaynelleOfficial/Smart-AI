import React from 'react';
import './LoadingSpinner.module.css';

// const LoadingSpinner = () => {
//   return (
//     <div className="loading-spinner">
//       <div className="dot dot1">.</div>
//       <div className="dot dot2">.</div>
//       <div className="dot dot3">.</div>
//     </div>
//   );
// };
const LoadingSpinner = () => (
    <div className="loading-txt text-center mt-4">
      <p className="text-gray-700">Loading...</p>
    </div>
  );

export default LoadingSpinner;