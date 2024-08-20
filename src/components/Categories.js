import React, { useState } from 'react';
import FileDrop from './FileDrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faUserTie, 
  faBox, 
  faMapMarkerAlt, 
  faTools, 
  faTasks, 
  faFileAlt, 
  faBuilding, 
  faPaperclip 
} from '@fortawesome/free-solid-svg-icons';

const Categories = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const icons = {
    home: <FontAwesomeIcon icon={faHouse} />,
    staff: <FontAwesomeIcon icon={faUserTie} />,
    material: <FontAwesomeIcon icon={faBox} />,
    location: <FontAwesomeIcon icon={faMapMarkerAlt} />,
    jobMaterial: <FontAwesomeIcon icon={faTools} />,
    jobActivity: <FontAwesomeIcon icon={faTasks} />,
    job: <FontAwesomeIcon icon={faFileAlt} />,
    dbNote: <FontAwesomeIcon icon={faFileAlt} />,
    company: <FontAwesomeIcon icon={faBuilding} />,
    attachments: <FontAwesomeIcon icon={faPaperclip} />,
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <button onClick={() => handleCategoryClick('Staff')}>{icons.staff} Staff</button>
      <button onClick={() => handleCategoryClick('Material')}>{icons.material} Material</button>
      <button onClick={() => handleCategoryClick('Location')}>{icons.location} Location</button>
      <button onClick={() => handleCategoryClick('Job-Material')}>{icons.jobMaterial} Job-Material</button>
      <button onClick={() => handleCategoryClick('Job-Activity')}>{icons.jobActivity} Job-Activity</button>
      <button onClick={() => handleCategoryClick('Job')}>{icons.job} Job</button>
      <button onClick={() => handleCategoryClick('DB-Note')}>{icons.dbNote} DB-Note</button>
      <button onClick={() => handleCategoryClick('Company')}>{icons.company} Company</button>
      <button onClick={() => handleCategoryClick('Attachments')}>{icons.attachments} Attachments</button>
      <button onClick={onBack}>{icons.home} Home</button>

      {selectedCategory && (
        <div>
          <h2>Upload files for {selectedCategory}</h2>
          <FileDrop />
        </div>
      )}
    </div>
  );
};

export default Categories;
