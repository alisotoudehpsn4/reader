import React, { useState } from 'react';
import FileView from './FileView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Categories.css';

const Categories = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Staff'); // Default category
  const [selectedFields, setSelectedFields] = useState(['uuid']); // Default field selection
  const [inputField, setInputField] = useState(''); // Input field state

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
    setSelectedCategory(category);
  };

  // Handle field input changes
  const handleFieldChange = (e) => {
    setInputField(e.target.value); // Update inputField state with user input
  };

  // Handle submit button click to set selected fields
  const handleSubmitFields = () => {
    // Update selectedFields state with inputField values
    const fields = inputField.split(',').map(f => f.trim().toLowerCase());
    setSelectedFields(fields);
    setInputField(''); // Clear the input field after submission
  };

  return (
    <div className="categories-container">
      {/* Back Button */}
      <button className="back-button" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      {/* Categories Header */}
      <div className="categories-header">
        <div className="categories">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className={`category ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.name)}
            >
              <FontAwesomeIcon icon={cat.icon} size="2x" />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Field Selection Input and Button */}
      <div className="field-selection">
        <input 
          type="text" 
          placeholder="Enter field name(s) e.g., uuid, name" 
          value={inputField}
          onChange={handleFieldChange} 
        />
        <button onClick={handleSubmitFields}>Submit Fields</button>
        <p><strong>Selected Fields:</strong> {selectedFields.join(', ')}</p>
      </div>

      {/* Display the FileView component for the selected category */}
      <div className="file-view-container">
        <FileView category={selectedCategory} selectedFields={selectedFields} />
      </div>
    </div>
  );
};

export default Categories;
