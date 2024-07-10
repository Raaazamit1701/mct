import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPerson from "./AddPerson";
import RetrieveInfo from "./RetrievePerson";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("add-person");
  const navigate = useNavigate();

  const handleCheck = () => {
    setActiveTab("retrieve-info");
    navigate("/retrieve");
  };

  const handleSet = () => {
    setActiveTab("add-person");
    navigate("/");
  };

  return (
    <>
      <h2 className="h-[60px] w-[100%] text-center flex items-center justify-center text-xl bg-blue-700 text-white font-bold">
        Amit Raj Directory App
      </h2>
      <div className="container mx-auto p-4 max-w-8xl ">
        <div className="flex flex-col sm:flex-row mb-4 gap-10 ">
          <button
            className={`px-4 py-2 text-white  ${
              activeTab === "add-person" ? "bg-blue-600" : "bg-blue-600"
            }`}
            onClick={handleSet}
          >
            Add New Person
          </button>
          <button
            className={`px-4 py-2 text-white ${
              activeTab === "retrieve-info" ? "bg-blue-600" : "bg-blue-600"
            }`}
            onClick={handleCheck}
          >
            Retrieve Information
          </button>
        </div>
        {activeTab === "add-person" ? <AddPerson /> : <RetrieveInfo />}
      </div>
    </>
  );
};

export default Navbar;
