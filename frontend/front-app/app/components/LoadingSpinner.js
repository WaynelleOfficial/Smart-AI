import React from 'react';
import './LoadingSpinner.module.css'; // Import the CSS module

// const LoadingSpinner = () => {
//   return (
//     <div className="loading-spinner">
//       <div className="dot dot1"></div>
//       <div className="dot dot2"></div>
//       <div className="dot dot3"></div>
//     </div>
//   );
// };
const LoadingSpinner = () => (
    <div className="text-center mt-4">
      <p className="text-gray-600">Loading...</p>
    </div>
  );

export default LoadingSpinner;