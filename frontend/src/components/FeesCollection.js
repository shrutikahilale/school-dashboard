import React from 'react';
import { students } from '../data/students';
import googlePayImage from './assets/google-pay.png';
import cashImage from './assets/cash.png';
import chequeImage from './assets/cheque.png';
import * as XLSX from "xlsx"; // Import the xlsx library

const FeesCollection = ({ showContent }) => {
  const downloadExcel = () => {
    // Define the data structure
    const data = [];

    // Iterate over each student to structure the data for Excel
    students.forEach((student) => {
      student.payments.forEach((payment) => {
        data.push({
          "Student ID": student.studentId,
          "Student Name": student.studentName,
          "Parent Name": student.contactDetails.parentName,
          "Contact Number": student.contactDetails.parentPhone,
          "Class": student.studentClass,
          "Fees Type": student.feesType,
          "Amount": payment.amount,
          "Payment Mode": payment.paymentMode.toUpperCase(),
          "Pending Amount": payment.pendingAmount,
          "Paid Date": payment.paidDate,
          "Status": payment.pendingAmount === 0 ? "Paid" : "Unpaid",
        });
      });
    });

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fees Collection");

    // Generate an Excel file and prompt download
    XLSX.writeFile(workbook, "FeesCollection.xlsx");
  };

  return (
    <div id="feesCollection">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Fees Collections</h2>
        <div className="d-flex justify-content-between align-items-center me-2 flex-wrap">
          <button className="btn btn-primary m-2" onClick={downloadExcel}>
            <i className="fas fa-download"></i> Download
          </button>
          <button className="btn btn-primary m-2" onClick={() => showContent('addFees')}>
            <i className="fas fa-plus"></i> Add Fees
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Details</th>
            <th>Class</th>
            <th>Fees Type</th>
            <th>Amount</th>
            <th>Pending</th>
            <th>Paid Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, studentIndex) => {
            const numPaymentEntries = student.payments.length + 1; // +1 for the initial row
            return student.payments.map((payment, paymentIndex) => {
              // Tooltip with parent's phone number and name
              const parentNameWithPhone = (
                <span className="parent-name d-flex align-items-center flex-wrap">
                  {student.contactDetails.parentName}<br />+91-{student.contactDetails.parentPhone}
                </span>
              );

              // Payment status class
              const paymentStatusClassName = payment.pendingAmount === 0 ? 'paid' : 'unpaid';
              // Determine payment method image
              const paymentModeImgSrc =
                payment.paymentMode === "gpay"
                  ? googlePayImage
                  : payment.paymentMode === "cash"
                  ? cashImage
                  : chequeImage;

              // Handle the rendering of the initial student row (for first payment entry)
              if (paymentIndex === 0) {
                return (
                  <React.Fragment key={studentIndex + '-' + paymentIndex}>
                    <tr>
                      <td rowSpan={numPaymentEntries}>{student.studentId}</td>
                      <td rowSpan={numPaymentEntries}>{student.studentName}</td>
                      <td rowSpan={numPaymentEntries}>{parentNameWithPhone}</td>
                      <td rowSpan={numPaymentEntries}>{student.studentClass}</td>
                      <td rowSpan={numPaymentEntries}>{student.feesType}</td>
                    </tr>
                    {/* Payment Row */}
                    <tr>
                      <td>
                        {payment.amount}{" "}
                        <img src={paymentModeImgSrc} alt={payment.paymentMode} style={{ width: "24px", height: "24px" }} />
                      </td>
                      <td>{payment.pendingAmount}</td>
                      <td>{payment.paidDate}</td>
                      <td>
                        <span className={`status-${paymentStatusClassName}`}>
                          {paymentStatusClassName.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              }

              // Render additional payment rows
              return (
                <tr key={studentIndex + '-' + paymentIndex}>
                  <td>
                    {payment.amount}{" "}
                    <img src={paymentModeImgSrc} alt={payment.paymentMode} style={{ width: "24px", height: "24px" }} />
                  </td>
                  <td>{payment.pendingAmount}</td>
                  <td>{payment.paidDate}</td>
                  <td>
                    <span className={`status-${paymentStatusClassName}`}>
                      {paymentStatusClassName.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeesCollection;
