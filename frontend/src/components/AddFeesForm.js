import React, { useState, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";  // Don't forget to import the CSS
import "../addFeesForm.css";
import googlePayImage from './assets/google-pay.png';
import cashImage from './assets/cash.png';
import chequeImage from './assets/cheque.png';
import { students } from '../data/students';

const AddFeesForm = ({ showContent }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentClass: "",
    feesType: "",
    feesAmount: "",
    pendingAmount: "",
    paidDate: "",
    paymentMode: "",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    const paidDateInput = document.getElementById("paidDate");
    flatpickr(paidDateInput, {
      dateFormat: "d M Y", // Set the date format
      maxDate: "today",
      defaultDate: "today", // Default date for the input
      onChange: (selectedDates) => {
        const formattedDate = flatpickr.formatDate(selectedDates[0], "d M Y");
        setFormData((prevState) => ({ ...prevState, paidDate: formattedDate }));
      },
    });
  }, []); // The empty array means this effect runs once on mount

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePaymentModeChange = (e) => {
    setFormData({ ...formData, paymentMode: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if student already exists based on studentId
    let student = students.find((s) => s.studentId === formData.studentId);

    console.log(student);

    if (!student) {
      // If the student doesn't exist, create a new student object
      student = {
        studentId: formData.studentId,
        studentName: formData.studentName,
        studentClass: formData.studentClass,
        feesType: formData.feesType,
        payments: [],
        contactDetails: {},
      };

      // Add the new student to the students array
      students.push(student);
    }

    // Add the new payment to the student's payment array
    student.payments.push({
      amount: formData.feesAmount,
      pendingAmount: formData.pendingAmount || 0, // Default to 0 if empty
      paidDate: formData.paidDate,
      paymentMode: formData.paymentMode,
    });

    // Update the student's contact details
    student.contactDetails = {
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
    };

    // Log the updated students array (or handle it further as required)
    console.log(students);

    // Optionally, switch the view after submitting the form
    showContent('feesCollection');
  };

  return (
    <div id="addFees" className="content-section">
      <h2>Add Fees</h2>
      <div className="card p-4 mt-3">
        <form onSubmit={handleSubmit} id="addFeesForm">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="studentId" className="form-label">
                Student ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Enter Student ID"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="studentName" className="form-label">
                Student Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter Student Name"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="studentClass" className="form-label">
                Class <span className="text-danger">*</span>
              </label>
              <select
                id="studentClass"
                className="form-select"
                value={formData.studentClass}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Division</option>
                <option>Nursery Mercury</option>
                <option>Junior KG Mars</option>
                <option>Senior KG Uranus</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="feesType" className="form-label">
                Fees Type <span className="text-danger">*</span>
              </label>
              <select
                id="feesType"
                className="form-select"
                value={formData.feesType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option>Exam Fees</option>
                <option>Transport Fees</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="feesAmount" className="form-label">
                Fees Amount <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="feesAmount"
                value={formData.feesAmount}
                onChange={handleInputChange}
                placeholder="Enter Fees Amount"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="pendingAmount" className="form-label">
                Pending Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="pendingAmount"
                value={formData.pendingAmount}
                onChange={handleInputChange}
                placeholder="Enter Pending Amount"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="paidDate" className="form-label">
                Paid Date <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control flatpickr-input"
                id="paidDate"
                value={formData.paidDate}
                onChange={handleInputChange}  // Ensure onChange handler
                placeholder="DD-MM-YYYY"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Payment method <span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-4">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="gpay"
                    name="payment"
                    value="gpay"
                    checked={formData.paymentMode === "gpay"}
                    onChange={handlePaymentModeChange}
                    required
                  />
                  <label htmlFor="gpay">
                    <img src={googlePayImage} alt="GPay" height="40" />
                  </label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={formData.paymentMode === "cash"}
                    onChange={handlePaymentModeChange}
                  />
                  <label htmlFor="cash">
                    <img src={cashImage} alt="Cash" height="40" />
                  </label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cheque"
                    name="payment"
                    value="cheque"
                    checked={formData.paymentMode === "cheque"}
                    onChange={handlePaymentModeChange}
                  />
                  <label htmlFor="cash">
                    <img src={chequeImage} alt="Cheque" height="40" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mt-4">Contact Details</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="parentName" className="form-label">
                Parent's Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                placeholder="Enter Parent's Name"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="parentPhone" className="form-label">
                Parent's Phone Number <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">+91</span>
                <input
                  type="tel"
                  className="form-control"
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  placeholder="Enter Contact Number"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeesForm;
