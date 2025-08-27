const mongoose = require("mongoose");

const customerModelSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  weightUnit: { type: String, enum: ['Kgs', 'Pounds'], required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  maritalStatus: {
    type: String,
    enum: ['Married', 'Unmarried', 'Other'],
    required: function() { return this.gender === 'Female'; }
  },
  contactNumber: { type: String, required: true },
  mainConcern: { type: String, required: true },

  // Female Fertility History
 femaleFertilityHistory: {
    isFemale: { type: Boolean, default: false },
    marriedFemales: {
      tryingToConceiveFor: { 
        value: { type: Number },
        unit: { type: String, enum: ['months', 'years'] }
      },
      menstrualCycleLength: { type: Number },
      flow: { type: String, enum: ['Light', 'Moderate', 'Heavy'] },
      cycleRegularity: { type: String, enum: ['Regular', 'Irregular'] },
      lastMenstrualPeriod: { type: Date },
      historyOfConditions: {
        type: [String],
        enum: [
          'PCOS', 'Endometriosis', 'Fibroids', 'Recurrent miscarriages',
          'Thyroid disorders', 'High prolactin', 'Adenomyosis', 
          'Blocked tubes', 'Diabetes', 'Autoimmune Disease', 'Other'
        ]
      },
      otherConditions: { type: String },
      pregnancyHistory: {
        pregnancies: { type: Number },
        labour: { type: Number },
        miscarriage: { type: Number }
      }
    },
    unmarriedFemales: {
      cycleLength: { type: Number },
      flow: { type: String, enum: ['Light', 'Moderate', 'Heavy'] },
      cycleRegularity: { type: String, enum: ['Regular', 'Irregular'] },
      lastMenstrualPeriod: { type: Date },
       historyOfConditions: {
        type: [String],
        enum: [
          'PCOS', 'Endometriosis', 'Fibroids', 'Thyroid disorders',
          'High prolactin', 'Adenomyosis', 'Blocked tubes', 
          'Autoimmune disorder', 'Other'
        ]
      },
      otherConditions: { type: String },
      concerns: {
        type: [String],
        enum: [
          'Hormonal imbalance', 'Weight issues', 
          'Irregular periods', 'Skin/hair changes'
        ]
      }
    },
  },

  // Male Fertility History
   maleFertilityHistory: {
    isMale: { type: Boolean, default: false },
    tryingToConceiveFor: { 
      value: { type: Number },
      unit: { type: String, enum: ['months', 'years'] }
    },
    historyOfConditions: {
      type: [String],
      enum: [
        'Hormonal imbalance', 'Erectile dysfunction', 'Varicocele',
        'Azoospermia', 'Oligospermia', 'Pyospermia', 'Cholesterol',
        'Thyroid disorder', 'Diabetes', 'Weight issues', 'Other'
      ]
    },
    otherConditions: { type: String },
    previousSemenAnalysis: { type: String, enum: ['Yes', 'No'] },
    semenAnalysisResults: { type: String }
  },
  // Medical History
  medicalHistory: {
    associatedConditions: { type: String },
    pastIssues: { type: String }
  },

  // Medications
  currentMedications: { type: String },

  // Diet & Eating Habits
  mealsPerDay: { type: Number },
  dietType: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Mixed'] },
  foodIntolerances: { type: String },

  // Family History
  familyHistory: {
    infertility: { type: Boolean, default: false },
    pcos: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    thyroidDisorders: { type: Boolean, default: false },
    obesity: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false },
  },

  // Additional Fields
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },
  price: { type: Number, required: false },
  orderDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },

}, { timestamps: true });

// Generate a simple user ID
customerModelSchema.methods.generateSimpleId = function () {
  // Convert ObjectId to a simple string (e.g., use a part of the ObjectId or create a custom hash)
  return `user-${this._id.toString().slice(-5)}`; // Using the last 5 characters of the ObjectId for simplicity
};

const Customer = mongoose.model("Customer", customerModelSchema);

module.exports = Customer;
