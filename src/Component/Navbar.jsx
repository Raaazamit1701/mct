import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPerson from './AddPerson';
import RetrieveInfo from './RetrievePerson';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('add-person');
  const navigate = useNavigate();

  const handleCheck = () => {
    setActiveTab('retrieve-info');
    navigate('/retrieve');
  };

  const handleSet = () => {
    setActiveTab('add-person');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'add-person' ? 'bg-gray-300' : 'bg-gray-200'}`}
          onClick={handleSet}
        >
          Add New Person
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'retrieve-info' ? 'bg-gray-300' : 'bg-gray-200'}`}
          onClick={handleCheck}
        >
          Retrieve Information
        </button>
      </div>
      {activeTab === 'add-person' ? <AddPerson /> : <RetrieveInfo />}
    </div>
  );
};

export default Navbar;
