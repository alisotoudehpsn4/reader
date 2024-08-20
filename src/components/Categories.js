import React from 'react'

const Categories = ({onBack}) => {


  return (
    <div>
      <button>Staff</button>
      <button>Material</button>
      <button>Location</button>
      <button>Job-Material</button>
      <button>Job-Activity</button>
      <button>Job</button>
      <button>DB-Note</button>
      <button>Company</button>
      <button>Attachments</button>
      <button onClick={onBack}>Back</button>
    </div>
    
  )
}

export default Categories
