'use client';

import React, { useState } from 'react';

function DynamicForm() {
  const [formType, setFormType] = useState('basic');

  const renderFormFields = () => {
    switch (formType) {
      case 'basic':
        return (
          <>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </>
        );
      case 'advanced':
        return (
          <>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Company" />
            <input type="text" placeholder="Position" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <select onChange={(e) => setFormType(e.target.value)}>
        <option value="basic">Basic</option>
        <option value="advanced">Advanced</option>
      </select>
      <form>
        {renderFormFields()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
