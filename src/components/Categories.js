// Import necessary libraries and components
import React, { useState } from 'react'; // useState is a React hook to manage state in functional components
import FileView from './FileView'; // Importing a custom component to display files
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome icons for use in UI
import { faFolder, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons for folder and back button
import './Categories.css'; // Importing CSS styles for this component

// The Categories component is a functional component
const Categories = ({ onBack }) => {
  // State to keep track of the selected category, initialized to 'Staff'
  const [selectedCategory, setSelectedCategory] = useState('Staff'); 
  // State to keep track of the selected fields, initialized to an array with one element 'uuid'
  const [selectedFields, setSelectedFields] = useState(['uuid']); 
  // State to keep track of the input field value
  const [inputField, setInputField] = useState(''); 

  // Array of category objects, each with a name and an icon
  const categories = [
    { name: 'Staff', icon: faFolder },
    { name: 'Material', icon: faFolder },
    { name: 'Location', icon: faFolder },
    { name: 'Job-Material', icon: faFolder },
    { name: 'Job-Activity', icon: faFolder },
    { name: 'Job', icon: faFolder },
    { name: 'DB-Note', icon: faFolder },
    { name: 'Company', icon: faFolder },
    { name: 'Attachments', icon: faFolder }
  ];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update selectedCategory state with the chosen category
  };

  // Function to handle changes in the input field where users type in field names
  const handleFieldChange = (e) => {
    setInputField(e.target.value); // Update inputField state with the current value in the input box
  };

  // Function to handle the submission of fields entered by the user
  const handleSubmitFields = () => {
    // Split the input by commas, trim spaces, convert to lowercase, and update selectedFields state
    const fields = inputField.split(',').map(f => f.trim().toLowerCase());
    setSelectedFields(fields); // Update selectedFields state with the processed fields
    setInputField(''); // Clear the input field after submission
  };

  // The component's UI structure
  return (
    <div className="categories-container">
      {/* Back Button to navigate back */}
      <button className="back-button" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back {/* Display the back arrow icon */}
      </button>

      {/* Categories Header Section */}
      <div className="categories-header">
        <div className="categories">
          {/* Loop through each category and display it as a clickable item */}
          {categories.map((cat, index) => (
            <div 
              key={index} // Unique key for each element in the list
              className={`category ${selectedCategory === cat.name ? 'active' : ''}`} // Add 'active' class if this category is selected
              onClick={() => handleCategorySelect(cat.name)} // Handle category click
            >
              <FontAwesomeIcon icon={cat.icon} size="2x" /> {/* Display the folder icon */}
              <span>{cat.name}</span> {/* Display the category name */}
            </div>
          ))}
        </div>
      </div>

      {/* Field Selection Section */}
      <div className="field-selection">
        <input 
          type="text" 
          placeholder="Enter field name(s) e.g., uuid, name" // Placeholder text in the input box
          value={inputField} // Bind the input value to inputField state
          onChange={handleFieldChange} // Update state on input change
        />
        <button onClick={handleSubmitFields}>Submit Fields</button> {/* Button to submit the field names */}
        <p><strong>Selected Fields:</strong> {selectedFields.join(', ')}</p> {/* Display the selected fields */}
      </div>

      {/* Display the FileView component for the selected category */}
      <div className="file-view-container">
        <FileView category={selectedCategory} selectedFields={selectedFields} /> {/* Pass the selected category and fields as props */}
      </div>
    </div>
  );
};

// Export the Categories component to be used in other parts of the app
export default Categories;
