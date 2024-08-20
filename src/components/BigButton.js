import React from 'react';

const BigButton = ({ onPress }) => {
    const handleClick = () => {
        onPress(); // This function will be passed from the App component to update isPressed
        // alert('Big Button was clicked!');
    };

    return (
        <button onClick={handleClick}>
            ServiceM8
        </button>
    );
};

export default BigButton;
