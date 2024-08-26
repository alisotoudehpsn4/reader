// Import necessary libraries and components
import React, { useState, useEffect } from 'react'; // useState and useEffect are React hooks for state and side effects
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome icons for use in the UI
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons for file and trash (delete) operations
import './FileView.css'; // Importing CSS styles for this component

// The FileView component is a functional component
const FileView = ({ category, selectedFields }) => {
  // State to store files for each category
  const [categoryFiles, setCategoryFiles] = useState({});
  // State to store the currently selected file for viewing
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to manually trigger an animation (e.g., fade and scale effect)
  const triggerAnimation = () => {
    const element = document.querySelector('.animate-fade-scale'); // Select the element with the animation class
    element.classList.remove('animate-fade-scale'); // Remove the class to reset the animation
    void element.offsetWidth; // Trigger a reflow, forcing the browser to recalculate the layout
    element.classList.add('animate-fade-scale'); // Re-add the class to start the animation
  };

  // useEffect hook to run side effects when the component updates
  useEffect(() => {
    // Check if the selected category doesn't have files yet, and initialize it if necessary
    if (!categoryFiles[category]) {
      setCategoryFiles(prevState => ({
        ...prevState, // Keep the existing state
        [category]: [] // Add an empty array for the new category
      }));
    }
    // Reset the selected file when the category changes
    setSelectedFile(null);
    triggerAnimation(); // Manually trigger the animation whenever the category changes
  }, [category, categoryFiles]); // Dependencies array: this effect runs when either category or categoryFiles change

  // Handle file selection and upload
  const handleFileChange = (e) => {
    // Create an array of files from the input
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name, // File name
      fields: [], // Empty array for fields, to be filled later
      content: '', // Placeholder for file content
      file // The actual file object
    }));

    // Update the state with the new files for the selected category
    setCategoryFiles(prevState => ({
      ...prevState, // Keep the existing state
      [category]: [...prevState[category], ...newFiles] // Add new files to the current category
    }));

    e.target.value = null; // Reset the file input after handling files
  };

  // Handle the click on a file to view its content
  const handleFileClick = (file) => {
    const fileReader = new FileReader(); // Create a FileReader object to read file content

    // When the file is successfully read
    fileReader.onload = (e) => {
      const parser = new DOMParser(); // Create a DOMParser to parse XML content
      const xmlDoc = parser.parseFromString(e.target.result, "application/xml"); // Parse the file content as XML

      const fields = []; // Array to store field data from the XML

      // Extract all <field> elements from the XML and gather their names and values
      xmlDoc.querySelectorAll('field').forEach(field => {
        fields.push({
          name: field.getAttribute('name'), // Get the 'name' attribute of the field
          value: field.textContent // Get the text content of the field
        });
      });

      // Update the selected file state with the file name and its fields
      setSelectedFile({ name: file.name, fields: fields });
    };

    // Start reading the file as text to trigger the onload event
    fileReader.readAsText(file.file);
  };

  // Handle removing a file from the category
  const handleFileRemove = (fileName) => {
    // Update the state to remove the file with the specified name
    setCategoryFiles(prevState => ({
      ...prevState,
      [category]: prevState[category].filter(file => file.name !== fileName)
    }));
  };

  // The component's UI structure
  return (
    <div className="animate-fade-scale">
      {!selectedFile ? ( // If no file is selected, show the file list and upload option
        <div>
          <h2>{category}</h2> {/* Display the current category name */}
          {/* Custom file upload button */}
          <label className="custom-file-upload">
            <input 
              type="file" 
              multiple // Allow multiple file uploads at once
              onChange={handleFileChange} // Handle file selection
              className="file-input"
            />
            Upload Files
          </label>
          <div className="file-list">
            {/* Loop through the files in the current category and display them */}
            {categoryFiles[category]?.map((file, index) => (
              <div key={index} className="file-item">
                <div onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                  {/* File icon and name */}
                  <FontAwesomeIcon icon={faFileAlt} size="2x" />
                  <span>{file.name}</span>
                </div>
                {/* Remove button to delete the file */}
                <button className="remove-button" onClick={() => handleFileRemove(file.name)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : ( // If a file is selected, show its content
        <div className="file-content-view">
          <button className="back-button" onClick={() => setSelectedFile(null)}>Back to Files</button> {/* Button to go back to the file list */}
          <h3>{selectedFile.name}</h3> {/* Display the selected file name */}
          {/* Table to display the fields of the selected file */}
          <table className="file-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through the fields in the selected file and display only those that match selectedFields */}
              {selectedFile.fields.map((field, idx) => {
                if (selectedFields.includes(field.name.toLowerCase())) { // Check if the field is in the selectedFields list
                  return (
                    <tr key={idx}>
                      <td>{field.name}</td>
                      <td>{field.value}</td>
                    </tr>
                  );
                }
                return null; // Skip fields that are not in the selectedFields array
              })}
              {/* If no fields match, display a message */}
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

// Export the FileView component to be used in other parts of the app
export default FileView;
