import React from 'react';

const BigButton = () => {
    // Function that handles the button click
    const handleClick = () => {
        alert('Big Button was clicked!');
    };

    // Return statement inside the function
    return (
        <button onClick={handleClick}>
            ServiceM8
        </button>
    );
};

// Export the component
export default BigButton;
