import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddPerson() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [editableRows, setEditableRows] = useState([]);

  useEffect(() => {
    const storedPeople = JSON.parse(localStorage.getItem("people") || "[]");
    setPeople(storedPeople);
  }, []);

  const addRow = () => {
    setPeople((prevPeople) => [
      ...prevPeople,
      { name: "", dob: "", aadhar: "", mobile: "", age: "" },
    ]);
    setEditableRows((prevEditableRows) => [...prevEditableRows, people.length]);
  };

  const updatePerson = (index, field, value) => {
    setPeople((prevPeople) => {
      const newPeople = [...prevPeople];
      newPeople[index][field] = value;

      if (field === "dob") {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        newPeople[index].age = age.toString();
      }

      localStorage.setItem("people", JSON.stringify(newPeople));
      return newPeople;
    });
  };

  const savePerson = (index) => {
    const person = people[index];
    if (!person.name || !person.dob || !person.aadhar || !person.mobile) {
      alert("All fields are required");
      return;
    }
    if (person.aadhar.length !== 12) {
      alert("Aadhar Number should be 12 digits");
      return;
    }
    if (person.mobile.length !== 10) {
      alert("Mobile Number should be 10 digits");
      return;
    }
    localStorage.setItem("people", JSON.stringify(people));
    alert("Person saved successfully");
    setEditableRows((prevEditableRows) =>
      prevEditableRows.filter((row) => row !== index)
    );
  };

  const deletePerson = (index) => {
    setPeople((prevPeople) => {
      const newPeople = prevPeople.filter((_, i) => i !== index);
      localStorage.setItem("people", JSON.stringify(newPeople));
      return newPeople;
    });
    setEditableRows((prevEditableRows) =>
      prevEditableRows.filter((row) => row !== index)
    );
  };

  return (
    <div className=" border border-black w-[100%]  mx-auto relative">
      <h2 className="text-2xl mb-4 border border-black w-[200px]">
        Add New Person
      </h2>
      <div className="overflow-x-auto w-[90%] mx-auto mb-20">
        <div className="inline-block min-w-full shadow-md  overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 hidden sm:table-header-group">
              <tr className=" bg-blue-600 text-white font-sans">
                <th className="border border-blue-400 p-2">Name</th>
                <th className="border border-blue-400 p-2">Date of Birth</th>
                <th className="border border-blue-400 p-2">Aadhar Number</th>
                <th className="border border-blue-400 p-2">Mobile Number</th>
                <th className="border border-blue-400 p-2">Age</th>
                <th className="border border-blue-400 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <tr key={index} className="sm:table-row block">
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Name:'] before:font-bold before:mr-2 sm:before:content-none">
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        updatePerson(index, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 border-none p-2 focus:outline-none text-center"
                      readOnly={!editableRows.includes(index)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Date_of_Birth:'] before:font-bold before:mr-2 sm:before:content-none">
                    <input
                      type="date"
                      value={person.dob}
                      onChange={(e) =>
                        updatePerson(index, "dob", e.target.value)
                      }
                      className="w-full border-none p-2 focus:outline-none text-center"
                      readOnly={!editableRows.includes(index)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Aadhar_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                    <input
                      type="text"
                      value={person.aadhar}
                      onChange={(e) =>
                        updatePerson(index, "aadhar", e.target.value)
                      }
                      className="w-full border-none p-2 focus:outline-none text-center"
                      readOnly={!editableRows.includes(index)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Mobile_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                    <input
                      type="text"
                      value={person.mobile}
                      onChange={(e) =>
                        updatePerson(index, "mobile", e.target.value)
                      }
                      className="w-full border-none p-2 focus:outline-none text-center"
                      readOnly={!editableRows.includes(index)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Age:'] before:font-bold before:mr-2 sm:before:content-none text-center">
                    {person.age}
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Actions:'] before:font-bold before:mr-2 sm:before:content-none">
                    {editableRows.includes(index) ? (
                      <button
                        onClick={() => savePerson(index)}
                        className=" text-blue-500 px-2 py-1 mr-2 text-center underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => deletePerson(index)}
                        className=" text-blue-500 px-2 py-1 text-center underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 w-[100px] text-white px-4 py-2 border border-black absolute  bottom-2 right-2"
      >
        Add 
      </button>
    </div>
  );
}

export default AddPerson;
