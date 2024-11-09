function downloadExcel() {
    // Define the data structure
    const data = [];
  
    // Iterate over each student to structure the data for Excel
    students.forEach((student) => {
      student.payments.forEach((payment, index) => {
        data.push({
          "Student ID": student.studentId,
          "Student Name": student.studentName,
          "Parent Name": student.contactDetails.parentName,
          "Class": student.studentClass,
          "Fees Type": student.feesType,
          "Amount": payment.amount,
          "Payment Mode": payment.paymentMode.toUpperCase(),
          "Pending Amount": payment.pendingAmount,
          "Paid Date": payment.paidDate,
          "Status": payment.pendingAmount === 0 ? "Paid" : "Unpaid"
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
  }
  