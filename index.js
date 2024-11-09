const students = [
  {
    studentId: "PRE1234",
    studentName: "Nathan Humphries",
    studentClass: "Nursery Mercury",
    feesType: "Exam Fees",
    payments: [
      {
        amount: 278,
        pendingAmount: 0,
        paidDate: "17 Nov 2020"
      },
    ],
  },
  {
    studentId: "PRE1252",
    studentName: "Joe Kelley",
    studentClass: "Nursery Venus",
    feesType: "Transport Fees",
    payments: [
      {
        amount: 100,
        pendingAmount: 250,
        paidDate: "17 Oct 2020"
      },
      {
        amount: 250,
        pendingAmount: 0,
        paidDate: "19 Oct 2020"
      },
    ],
  },
  {
    studentId: "PRE1252",
    studentName: "Joe Kelley",
    studentClass: "Nursery Earth",
    feesType: "Admission Fees",
    payments: [
      {
        amount: 1000,
        pendingAmount: 500,
        paidDate: "17 Oct 2020"
      },
      {
        amount: 500,
        pendingAmount: 100,
        paidDate: "19 Oct 2020"
      },
      {
        amount: 400,
        pendingAmount: 200,
        paidDate: "17 Oct 2020"
      },
      {
        amount: 200,
        pendingAmount: 0,
        paidDate: "19 Oct 2020"
      },
    ],
  },
];

function populateTable() {
  const tableBody = document.querySelector("#feesCollection table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  students.forEach((student) => {
    var numPaymentEntries = student.payments.length + 1;
    const row = document.createElement("tr");
    row.innerHTML = 
        `<td rowspan=${numPaymentEntries}>${student.studentId}</td>
        <td rowspan=${numPaymentEntries}>${student.studentName}</td>
        <td rowspan=${numPaymentEntries}>${student.studentClass}</td>
        <td rowspan=${numPaymentEntries}>${student.feesType}</td>`;

    tableBody.appendChild(row);
    student.payments.forEach((payment) => {
      const paymentRow = document.createElement("tr");
      const paymentStatusClassName = payment.pendingAmount == 0 ? 'paid' : 'unpaid';
      paymentRow.innerHTML = `
        <td>${payment.amount}</td>
        <td>${payment.pendingAmount}</td>
        <td>${payment.paidDate}</td>
        <td><span class="status-${paymentStatusClassName}">${paymentStatusClassName.toUpperCase()}</span></td>`;

      tableBody.appendChild(paymentRow);
    });
  });
}

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
  const feesType = document.getElementById("feesType").value;
  const feesAmount = document.getElementById("feesAmount").value;
  const pendingAmount = document.getElementById("pendingAmount").value == '' || document.getElementById("pendingAmount").value == undefined ? 0 : document.getElementById("pendingAmount").value;
  const paidDate = document.getElementById("paidDate").value;
  const status = parseFloat(pendingAmount) === 0 ? "Paid" : "Unpaid";

  // Find the student or create a new one if it doesn't exist
  let student = students.find((s) => s.studentId === studentId);

  if (!student) {
    student = {
      studentId,
      studentName,
      studentClass,
      feesType,
      payments: [],
    };
    students.push(student);
  }

  // Add the new payment to the student's payment array
  student.payments.push({
    amount: feesAmount,
    pendingAmount,
    paidDate,
    status,
  });

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
  dateFormat: "d M Y",  // Format the date as date Mon year
  maxDate: "today",     // Prevent future dates
  defaultDate: "today", // Set default date to today
});