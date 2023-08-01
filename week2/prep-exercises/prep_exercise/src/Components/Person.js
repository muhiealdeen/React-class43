import React from 'react';

function Person({ person }) {
  if (!person) {
    return null; // Render nothing if person is null
  }

  return (
    <ul>
      <li>First Name:{person.name.first}</li>
      <li>Last Name:{person.name.last}</li>
      <li>Email: {person.email}</li>
    </ul>
  );
}

export default Person;
