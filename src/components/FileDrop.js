import React from 'react';

const FileDrop = () => {
    
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log('Selected files:', files);
      
      for (let i = 0; i < files.length; i++) {
        console.log(`File ${i+1}:`, files[i]);
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}

export default FileDrop;
