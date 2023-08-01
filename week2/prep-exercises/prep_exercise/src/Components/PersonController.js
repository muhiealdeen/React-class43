import React, { useState, useEffect } from 'react';
import Person from './Person';

function PersonController() {
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    try {
      const response = await fetch('https://www.randomuser.me/api?results=1');
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setPerson(data.results[0]);
      } else {
        console.error('No person data found in the API response.');
      }
    } catch (error) {
      console.error('Error fetching person data:', error);
    }
  };

  useEffect(() => {
    getPerson(); // Call getPerson only once when the component mounts
  }, []);

  return (
    <div>
      <Person person={person} />
    </div>
  );
}

export default PersonController;
