import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import DatePicker from "react-datepicker"; // Add this import
import "react-datepicker/dist/react-datepicker.css"; // Add this import
import { toast } from 'react-toastify';
const initialFormState = {
    fullName: "",
    email: "",
    gender: "Male",
    age: "",
    weight: "",
    weightUnit: "Kgs",
    location: "",
    maritalStatus: null,
    contactNumber: "",
    mainConcern: "",
    femaleFertilityHistory: {
      isFemale: false,
      marriedFemales: {
        tryingToConceiveFor: {
          value: "",
          unit: "months"
        },
        menstrualCycleLength: "",
        flow: "Light",
        cycleRegularity: "Regular",
        lastMenstrualPeriod: null,
        historyOfConditions: [],
        otherConditions: "",
        pregnancyHistory: {
          pregnancies: "",
          labour: "",
          miscarriage: ""
        }
      },
      unmarriedFemales: {
        cycleLength: "",
        flow: "Light",
        cycleRegularity: "Regular",
        lastMenstrualPeriod: null,
        historyOfConditions: [],
        otherConditions: "",
        concerns: []
      }
    },
    maleFertilityHistory: {
      isMale: false,
      tryingToConceiveFor: {
        value: "",
        unit: "months"
      },
      historyOfConditions: [],
      otherConditions: "",
      previousSemenAnalysis: "No",
      semenAnalysisResults: ""
    },
    medicalHistory: {
      associatedConditions: "",
      pastIssues: ""
    },
    currentMedications: "",
    mealsPerDay: "",
     dietAndHabits: {  // Add this object
    dietType: "Vegetarian",
    foodIntolerances: ""
  },
    foodIntolerances: "",
    familyHistory: {
      infertility: false,
      pcos: false,
      diabetes: false,
      thyroidDisorders: false,
      obesity: false,
      heartDisease: false
    },
    price: "",
  };
const Consult = () => {
  const [formData, setFormData] = useState(initialFormState);

  const [error, setError] = useState("");

  // Female History Conditions
  const femaleMarriedConditions = [
    'PCOS', 'Endometriosis', 'Fibroids', 'Recurrent miscarriages',
    'Thyroid disorders', 'High prolactin', 'Adenomyosis', 
    'Blocked tubes', 'Diabetes', 'Autoimmune Disease'
  ];

  const femaleUnmarriedConditions = [
    'PCOS', 'Endometriosis', 'Fibroids', 'Thyroid disorders',
    'High prolactin', 'Adenomyosis', 'Blocked tubes', 
    'Autoimmune disorder'
  ];

  const femaleConcerns = [
    'Hormonal imbalance', 'Weight issues', 
    'Irregular periods', 'Skin/hair changes'
  ];

  // Male History Conditions
  const maleConditions = [
    'Hormonal imbalance', 'Erectile dysfunction', 'Varicocele',
    'Azoospermia', 'Oligospermia', 'Pyospermia', 'Cholesterol',
    'Thyroid disorder', 'Diabetes', 'Weight issues'
  ];

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => {
    const newData = { ...prev };
    if (name.includes('.')) {
      const keys = name.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    } else {
      newData[name] = value;
    }

    // Special handling for gender change
    if (name === 'gender') {
      // Set marital status only for Female, otherwise null
      newData.maritalStatus = value === 'Female' ? 'Married' : null;
      newData.femaleFertilityHistory.isFemale = value === 'Female';
      newData.maleFertilityHistory.isMale = value === 'Male';
    }

    return newData;
  });
};

 const handleArrayChange = (field, value) => {
  setFormData(prev => {
    const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
    const keys = field.split('.');
    let current = newData;
    
    // Navigate to parent object
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const lastKey = keys[keys.length - 1];
    // Create new array instead of mutating
    const array = [...current[lastKey]];
    const index = array.indexOf(value);
    
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
    
    current[lastKey] = array; // Assign new array
    return newData;
  });
};
const handleCheckboxChange = (field) => {
  setFormData(prev => {
    const newData = JSON.parse(JSON.stringify(prev));
    const keys = field.split('.');
    let current = newData;
    
    // Navigate to parent object
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const lastKey = keys[keys.length - 1];
    current[lastKey] = !current[lastKey]; // Toggle boolean
    
    return newData;
  });
};
  const handleDateChange = (date, field) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = field.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = date;
      return newData;
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Transform data to match schema
    const transformedData = {
      fullName: formData.fullName,
      email: formData.email,
      gender: formData.gender,
      age: Number(formData.age),
      weight: Number(formData.weight),
      weightUnit: formData.weightUnit,
      location: formData.location,
      // Only include maritalStatus if gender is Female
      ...(formData.gender === 'Female' && { maritalStatus: formData.maritalStatus }),
      contactNumber: formData.contactNumber,
      mainConcern: formData.mainConcern,
      
      // Transform female fertility history if gender is Female
      femaleFertilityHistory: formData.gender === 'Female' ? {
        isFemale: true,
        marriedFemales: formData.maritalStatus === 'Married' ? {
          tryingToConceiveFor: {
            value: Number(formData.femaleFertilityHistory.marriedFemales.tryingToConceiveFor.value),
            unit: formData.femaleFertilityHistory.marriedFemales.tryingToConceiveFor.unit
          },
          menstrualCycleLength: Number(formData.femaleFertilityHistory.marriedFemales.menstrualCycleLength),
          flow: formData.femaleFertilityHistory.marriedFemales.flow,
          cycleRegularity: formData.femaleFertilityHistory.marriedFemales.cycleRegularity,
          lastMenstrualPeriod: formData.femaleFertilityHistory.marriedFemales.lastMenstrualPeriod,
          historyOfConditions: formData.femaleFertilityHistory.marriedFemales.historyOfConditions,
          otherConditions: formData.femaleFertilityHistory.marriedFemales.otherConditions,
          pregnancyHistory: {
            pregnancies: Number(formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.pregnancies),
            labour: Number(formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.labour),
            miscarriage: Number(formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.miscarriage)
          }
        } : null,
        unmarriedFemales: formData.maritalStatus !== 'Married' ? {
          cycleLength: Number(formData.femaleFertilityHistory.unmarriedFemales.cycleLength),
          flow: formData.femaleFertilityHistory.unmarriedFemales.flow,
          cycleRegularity: formData.femaleFertilityHistory.unmarriedFemales.cycleRegularity,
          lastMenstrualPeriod: formData.femaleFertilityHistory.unmarriedFemales.lastMenstrualPeriod,
          historyOfConditions: formData.femaleFertilityHistory.unmarriedFemales.historyOfConditions,
          otherConditions: formData.femaleFertilityHistory.unmarriedFemales.otherConditions,
          concerns: formData.femaleFertilityHistory.unmarriedFemales.concerns
        } : null
      } : null,
      
      // Transform male fertility history if gender is Male
      maleFertilityHistory: formData.gender === 'Male' ? {
        isMale: true,
        tryingToConceiveFor: {
          value: Number(formData.maleFertilityHistory.tryingToConceiveFor.value),
          unit: formData.maleFertilityHistory.tryingToConceiveFor.unit
        },
        historyOfConditions: formData.maleFertilityHistory.historyOfConditions,
        otherConditions: formData.maleFertilityHistory.otherConditions,
        previousSemenAnalysis: formData.maleFertilityHistory.previousSemenAnalysis,
        semenAnalysisResults: formData.maleFertilityHistory.semenAnalysisResults
      } : null,
      
      // Medical History
      medicalHistory: {
        associatedConditions: formData.medicalHistory.associatedConditions,
        pastIssues: formData.medicalHistory.pastIssues
      },
      
      // Current Medications
      currentMedications: formData.currentMedications,
      
      // Diet & Eating Habits
      mealsPerDay: Number(formData.mealsPerDay),
      dietType: formData.dietAndHabits.dietType,
      foodIntolerances: formData.dietAndHabits.foodIntolerances,
      
      // Family History - convert to boolean values
      familyHistory: Object.keys(formData.familyHistory).reduce((acc, key) => ({
        ...acc,
        [key]: Boolean(formData.familyHistory[key])
      }), {}),
      price: formData.price
    };

    // console.log('Submitting data:', transformedData);

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}api/addcustomer`, 
      transformedData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      setError("");
      alert("Form submitted successfully!");
      // Optional: Reset form
      setFormData(initialFormState);
      
    }

  } catch (err) {
    console.error("Submission error:", err.response?.data || err);
    setError(err.response?.data?.error || "Error submitting form. Please check all required fields.");
  }
};

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary to-ternary px-6 py-8 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-900 duration-200">
        <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow-xl shadow-ternary/50">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Consultation Form</h2>
          
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Basic Information</h3>
              
              {/* Full Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  required
                />
              </div>
                <div>
    <label className="block text-lg font-medium text-gray-700">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
      required
    />
  </div>
              {/* Gender */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  required
                />
              </div>

              {/* Weight with unit selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Unit</label>
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  >
                    <option value="Kgs">Kgs</option>
                    <option value="Pounds">Pounds</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  required
                />
              </div>

              {/* Marital Status */}
               {formData.gender === "Female" && (
    <div>
      <label className="block text-lg font-medium text-gray-700">Select Marital Status</label>
      <select
        name="maritalStatus"
        value={formData.maritalStatus}
        onChange={handleChange}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
        required
      >
        
        <option value="Married">Married</option>
        <option value="Unmarried">Unmarried</option>
        <option value="Other">Other</option>
      </select>
    </div>
  )}

              {/* Contact Number */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  required
                />
              </div>

              {/* Main Concern */}
              <div>
                <label className="block text-lg font-medium text-gray-700">Main Concern</label>
                <textarea
                  name="mainConcern"
                  value={formData.mainConcern}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  rows="4"
                  required
                  placeholder="Please describe your main concern"
                />
              </div>
            </div>

            {/* Female Fertility History Section */}
            {formData.gender === "Female" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">Female Fertility History</h3>
                
                {formData.maritalStatus === "Married" ? (
                  // Married Female Section
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-medium text-gray-700">Trying to Conceive For </label>
                      <input
      type="number"
      name="femaleFertilityHistory.marriedFemales.tryingToConceiveFor.value"
      value={formData.femaleFertilityHistory.marriedFemales.tryingToConceiveFor.value}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
    />
                    </div>
<div>
    <label className="block text-lg font-medium text-gray-700">Unit</label>
    <select
      name="femaleFertilityHistory.marriedFemales.tryingToConceiveFor.unit"
      value={formData.femaleFertilityHistory.marriedFemales.tryingToConceiveFor.unit}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
    >
      <option value="months">Months</option>
      <option value="years">Years</option>
    </select>
  </div>
                    <div>
                      <label className="block text-lg font-medium text-gray-700">Menstrual Cycle Length (days)</label>
                      <input
                        type="number"
                        name="femaleFertilityHistory.marriedFemales.menstrualCycleLength"
                        value={formData.femaleFertilityHistory.marriedFemales.menstrualCycleLength}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Flow</label>
                      <select
                        name="femaleFertilityHistory.marriedFemales.flow"
                        value={formData.femaleFertilityHistory.marriedFemales.flow}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                      >
                        <option value="Light">Light</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Heavy">Heavy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Cycle Regularity</label>
                      <select
                        name="femaleFertilityHistory.marriedFemales.cycleRegularity"
                        value={formData.femaleFertilityHistory.marriedFemales.cycleRegularity}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                      >
                        <option value="Regular">Regular</option>
                        <option value="Irregular">Irregular</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Last Menstrual Period</label>
                      <DatePicker
                        selected={formData.femaleFertilityHistory.marriedFemales.lastMenstrualPeriod}
                        onChange={(date) => handleDateChange(date, 'femaleFertilityHistory.marriedFemales.lastMenstrualPeriod')}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                        dateFormat="MM/dd/yyyy"
                      />
                    </div>

                    {/* History of Conditions */}
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">History of Conditions</label>
                      <div className="space-y-2">
                       {femaleMarriedConditions.map((condition) => (
    <div key={condition} className="flex items-center">
      <input
        type="checkbox"
        id={`condition-${condition}`}
        checked={formData.femaleFertilityHistory.marriedFemales.historyOfConditions.includes(condition)}
        onChange={() => handleArrayChange(
          'femaleFertilityHistory.marriedFemales.historyOfConditions',
          condition
        )}
        className="h-4 w-4 text-ternary focus:ring-ternary border-gray-300 rounded"
      />
      <label htmlFor={`condition-${condition}`} className="ml-2 block text-sm text-gray-900">
        {condition}
      </label>
    </div>
  ))}
                      </div>
                    </div>

                    {/* Pregnancy History */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-700">Pregnancy History</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pregnancies</label>
                        <input
                          type="number"
                          name="femaleFertilityHistory.marriedFemales.pregnancyHistory.pregnancies"
                          value={formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.pregnancies}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Labour</label>
                        <input
                          type="number"
                          name="femaleFertilityHistory.marriedFemales.pregnancyHistory.labour"
                          value={formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.labour}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Miscarriage</label>
                        <input
                          type="number"
                          name="femaleFertilityHistory.marriedFemales.pregnancyHistory.miscarriage"
                          value={formData.femaleFertilityHistory.marriedFemales.pregnancyHistory.miscarriage}
                          onChange={handleChange}
                          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Unmarried Female Section
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-medium text-gray-700">Cycle Length (days)</label>
                      <input
                        type="number"
                        name="femaleFertilityHistory.unmarriedFemales.cycleLength"
                        value={formData.femaleFertilityHistory.unmarriedFemales.cycleLength}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700">Flow</label>
                      <select
                        name="femaleFertilityHistory.unmarriedFemales.flow"
                        value={formData.femaleFertilityHistory.unmarriedFemales.flow}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                      >
                        <option value="Light">Light</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Heavy">Heavy</option>
                      </select>
                    </div>
                    {/* Cycle Regularity */}
  <div>
    <label className="block text-lg font-medium text-gray-700">Cycle Regularity</label>
    <select
      name="femaleFertilityHistory.unmarriedFemales.cycleRegularity"
      value={formData.femaleFertilityHistory.unmarriedFemales.cycleRegularity}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
    >
      <option value="Regular">Regular</option>
      <option value="Irregular">Irregular</option>
    </select>
  </div>
  {/* Last Menstrual Period */}
  <div>
    <label className="block text-lg font-medium text-gray-700">Last Menstrual Period</label>
    <DatePicker
      selected={formData.femaleFertilityHistory.unmarriedFemales.lastMenstrualPeriod}
      onChange={(date) => handleDateChange(date, 'femaleFertilityHistory.unmarriedFemales.lastMenstrualPeriod')}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
      dateFormat="MM/dd/yyyy"
    />
  </div>

  {/* History of Conditions */}
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">History of Conditions</label>
    <div className="space-y-2">
      {femaleUnmarriedConditions.map((condition) => (
        <div key={condition} className="flex items-center">
          <input
            type="checkbox"
            id={`unmarried-condition-${condition}`}
            checked={formData.femaleFertilityHistory.unmarriedFemales.historyOfConditions.includes(condition)}
            onChange={() => handleArrayChange(
              'femaleFertilityHistory.unmarriedFemales.historyOfConditions',
              condition
            )}
            className="h-4 w-4 text-ternary focus:ring-ternary border-gray-300 rounded"
          />
          <label htmlFor={`unmarried-condition-${condition}`} className="ml-2 block text-sm text-gray-900">
            {condition}
          </label>
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700">Other</label>
        <input
          type="text"
          name="femaleFertilityHistory.unmarriedFemales.otherConditions"
          value={formData.femaleFertilityHistory.unmarriedFemales.otherConditions}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
        />
      </div>
    </div>
  </div>
   {/* Concerns */}
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">Concerns about</label>
    <div className="space-y-2">
      {femaleConcerns.map((concern) => (
        <div key={concern} className="flex items-center">
          <input
            type="checkbox"
            id={`concern-${concern}`}
            checked={formData.femaleFertilityHistory.unmarriedFemales.concerns.includes(concern)}
            onChange={() => handleArrayChange(
              'femaleFertilityHistory.unmarriedFemales.concerns',
              concern
            )}
            className="h-4 w-4 text-ternary focus:ring-ternary border-gray-300 rounded"
          />
          <label htmlFor={`concern-${concern}`} className="ml-2 block text-sm text-gray-900">
            {concern}
          </label>
        </div>
      ))}
    </div>
  </div>
                    {/* Add other unmarried female specific fields */}
                  </div>
                )}
              </div>
            )}

           {/* Male Fertility History Section */}
{formData.gender === "Male" && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-700">Male Fertility History</h3>
    
    {/* Trying to Conceive */}
    <div className="space-y-4">
      <div>
        <label className="block text-lg font-medium text-gray-700">Trying to Conceive For</label>
        <input
          type="number"
          name="maleFertilityHistory.tryingToConceiveFor.value"
          value={formData.maleFertilityHistory.tryingToConceiveFor.value}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">Unit</label>
        <select
          name="maleFertilityHistory.tryingToConceiveFor.unit"
          value={formData.maleFertilityHistory.tryingToConceiveFor.unit}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
        >
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>
    </div>

    {/* History of Conditions */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">History of Conditions</label>
      <div className="space-y-2">
        {maleConditions.map((condition) => (
          <div key={condition} className="flex items-center">
            <input
              type="checkbox"
              id={`male-condition-${condition}`}
              checked={formData.maleFertilityHistory.historyOfConditions.includes(condition)}
              onChange={() => handleArrayChange(
                'maleFertilityHistory.historyOfConditions',
                condition
              )}
              className="h-4 w-4 text-ternary focus:ring-ternary border-gray-300 rounded"
            />
            <label htmlFor={`male-condition-${condition}`} className="ml-2 block text-sm text-gray-900">
              {condition}
            </label>
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">Other</label>
          <input
            type="text"
            name="maleFertilityHistory.otherConditions"
            value={formData.maleFertilityHistory.otherConditions}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
          />
        </div>
      </div>
    </div>

    {/* Previous Semen Analysis */}
    <div>
      <label className="block text-lg font-medium text-gray-700">Previous Semen Analysis</label>
      <select
        name="maleFertilityHistory.previousSemenAnalysis"
        value={formData.maleFertilityHistory.previousSemenAnalysis}
        onChange={handleChange}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* Semen Analysis Results */}
    {formData.maleFertilityHistory.previousSemenAnalysis === "Yes" && (
      <div>
        <label className="block text-lg font-medium text-gray-700">Semen Analysis Results</label>
        <textarea
          name="maleFertilityHistory.semenAnalysisResults"
          value={formData.maleFertilityHistory.semenAnalysisResults}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
          rows="4"
          placeholder="Please enter your semen analysis results"
        />
      </div>
    )}
  </div>
)}

            {/* Medical History Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Medical History</h3>
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Associated Medical Conditions</label>
                <textarea
                  name="medicalHistory.associatedConditions"
                  value={formData.medicalHistory.associatedConditions}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Past Medical Issues</label>
                <textarea
                  name="medicalHistory.pastIssues"
                  value={formData.medicalHistory.pastIssues}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  rows="4"
                />
              </div>
            </div>

            {/* Current Medications */}
            <div>
              <label className="block text-lg font-medium text-gray-700">Current Medications</label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                rows="4"
              />
            </div>

            {/* Diet & Eating Habits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Diet & Eating Habits</h3>
              
              <div>
                <label className="block text-lg font-medium text-gray-700">Meals per Day</label>
                <input
                  type="number"
                  name="mealsPerDay"
                  value={formData.mealsPerDay}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Diet Type</label>
                <select
                  name="dietAndHabits.dietType"
                  value={formData.dietAndHabits.dietType}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Food Intolerances/Allergies</label>
                <textarea
                  name="dietAndHabits.foodIntolerances"
                  value={formData.dietAndHabits.foodIntolerances}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ternary"
                  rows="4"
                />
              </div>
            </div>

            {/* Family History */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Family History</h3>
              
              <div className="space-y-2">
                {Object.entries(formData.familyHistory).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`family-${key}`}
                      checked={value}
                      onChange={() => handleCheckboxChange(`familyHistory.${key}`)}
                      className="h-4 w-4 text-ternary focus:ring-ternary border-gray-300 rounded"
                    />
                    <label htmlFor={`family-${key}`} className="ml-2 block text-sm text-gray-900">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                  </div>
                ))}
              </div>
              
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-ternary text-black font-medium rounded-md hover:bg-ternary/80 focus:outline-none focus:ring-2 focus:ring-ternary focus:ring-offset-2 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Consult;