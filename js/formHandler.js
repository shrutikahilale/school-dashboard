// Call this function to populate the table initially
populateTable();

// Show content sections based on navigation
function showContent(sectionId) {
  document.querySelectorAll(".content-section").forEach(function (section) {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}
function addFeeEntry(event) {
  event.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const studentName = document.getElementById("studentName").value;
  const studentClass = document.getElementById("studentClass").value;
  const parentName = document.getElementById("parentName").value;
  const parentPhone = document.getElementById("parentPhone").value;
  const feesType = document.getElementById("feesType").value;
  const feesAmount = document.getElementById("feesAmount").value;
  const pendingAmount =
    document.getElementById("pendingAmount").value == "" ||
    document.getElementById("pendingAmount").value == undefined
      ? 0
      : document.getElementById("pendingAmount").value;
  const paidDate = document.getElementById("paidDate").value;
  const paymentModeSelected = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  // Find the student or create a new one if it doesn't exist
  let student = students.find((s) => s.studentId === studentId);

  if (!student) {
    student = {
      studentId,
      studentName,
      studentClass,
      feesType,
      payments: [],
      contactDetails: {},
    };
    students.push(student);
  }

  // Add the new payment to the student's payment array
  student.payments.push({
    amount: feesAmount,
    pendingAmount,
    paidDate,
    paymentModeSelected,
  });

  // Add the new payment to the student's payment array
  student.contactDetails = {
    parentName: parentName,
    parentPhone: parentPhone,
  };

  // Re-populate the table
  populateTable();

  console.log(student);
  console.log(students);

  // Clear the form fields
  document.querySelector("#addFees form").reset();

  // Switch to Fees Collection view
  showContent("feesCollection");
}

flatpickr("#paidDate", {
  dateFormat: "d M Y", // Format the date as date Mon year
  maxDate: "today", // Prevent future dates
  defaultDate: "today", // Set default date to today
});
