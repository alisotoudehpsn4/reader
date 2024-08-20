import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './FileView.css';

const FileView = ({ category, selectedFields }) => {
  const [categoryFiles, setCategoryFiles] = useState({}); // State to store files per category
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to trigger the animation manually
  const triggerAnimation = () => {
    const element = document.querySelector('.animate-fade-scale'); // Select the element with the animation class
    element.classList.remove('animate-fade-scale'); // Remove the class to reset the animation
    void element.offsetWidth; // Trigger a reflow, flushing the CSS changes
    element.classList.add('animate-fade-scale'); // Re-add the class to start the animation
  };

  // When the category changes, update the files based on the selected category
  useEffect(() => {
    if (!categoryFiles[category]) {
      setCategoryFiles(prevState => ({
        ...prevState,
        [category]: []
      }));
    }
    // Reset the selected file when the category changes
    setSelectedFile(null);
    triggerAnimation(); // Manually trigger the animation whenever the category changes
  }, [category, categoryFiles]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      fields: [],
      content: '',
      file
    }));

    setCategoryFiles(prevState => ({
      ...prevState,
      [category]: [...prevState[category], ...newFiles]
    }));

    e.target.value = null; // Reset file input
  };

  const handleFileClick = (file) => {
    const fileReader = new FileReader(); // Create a new FileReader to read the file

    // Define what happens when the file is successfully read
    fileReader.onload = (e) => {
      const parser = new DOMParser(); // Create a DOMParser to parse the XML content
      const xmlDoc = parser.parseFromString(e.target.result, "application/xml"); // Parse the XML into a document object

      const fields = []; // Array to store the fields and their values

      // Extract all <field> elements from the XML and their attributes/values
      xmlDoc.querySelectorAll('field').forEach(field => {
        fields.push({
          name: field.getAttribute('name'), // Get the field name attribute
          value: field.textContent // Get the field value (text content)
        });
      });

      // Update the selected file with the parsed fields for displaying later
      setSelectedFile({ name: file.name, fields: fields });
    };

    // Start reading the file as text (this triggers the onload event when done)
    fileReader.readAsText(file.file);
  };

  const handleFileRemove = (fileName) => {
    setCategoryFiles(prevState => ({
      ...prevState,
      [category]: prevState[category].filter(file => file.name !== fileName)
    }));
  };

  return (
    <div className="animate-fade-scale">
      {!selectedFile ? (
        <div>
          <h2>{category}</h2>
          {/* Custom file upload button */}
          <label className="custom-file-upload">
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              className="file-input"
            />
            Upload Files
          </label>
          <div className="file-list">
            {categoryFiles[category]?.map((file, index) => (
              <div key={index} className="file-item">
                <div onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                  {/* File icon and name */}
                  <FontAwesomeIcon icon={faFileAlt} size="2x" />
                  <span>{file.name}</span>
                </div>
                <button className="remove-button" onClick={() => handleFileRemove(file.name)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="file-content-view">
          <button className="back-button" onClick={() => setSelectedFile(null)}>Back to Files</button>
          <h3>{selectedFile.name}</h3>
          {/* Displaying the specified fields or a fallback message */}
          <table className="file-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {selectedFile.fields.map((field, idx) => {
                if (selectedFields.includes(field.name.toLowerCase())) {
                  return (
                    <tr key={idx}>
                      <td>{field.name}</td>
                      <td>{field.value}</td>
                    </tr>
                  );
                }
                return null; // Skip fields not in the selectedFields array
              })}
              {selectedFile.fields.every(field => !selectedFields.includes(field.name.toLowerCase())) && (
                <tr>
                  <td colSpan="2">No matching fields found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileView;
