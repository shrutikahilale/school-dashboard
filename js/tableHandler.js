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
          paidDate: "17 Nov 2020",
          paymentMode: 'gpay',
        },
      ],
      contactDetails: {
        parentName: 'Gorge',
        parentPhone: '9000090000'
      },
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
          paidDate: "17 Oct 2020",
          paymentMode: 'cash',
        },
        {
          amount: 250,
          pendingAmount: 0,
          paidDate: "19 Oct 2020",
          paymentMode: 'cash',
        },
      ],
      contactDetails: {
        parentName: 'Gorge3',
        parentPhone: '9000090000'
      },
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
          paidDate: "17 Oct 2020",
          paymentMode: 'cheque',
        },
        {
          amount: 500,
          pendingAmount: 100,
          paidDate: "19 Oct 2020",
          paymentMode: 'cash',
        },
        {
          amount: 400,
          pendingAmount: 200,
          paidDate: "17 Oct 2020",
          paymentMode: 'gpay',
        },
        {
          amount: 200,
          pendingAmount: 0,
          paidDate: "19 Oct 2020",
          paymentMode: 'gpay',
        },
      ],
      contactDetails: {
        parentName: 'Gorge2',
        parentPhone: '9000090000'
      },
    },
  ];
  
  function populateTable() {
    const tableBody = document.querySelector("#feesCollection table tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    students.forEach((student) => {
      var numPaymentEntries = student.payments.length + 1;
      const row = document.createElement("tr");

       // Phone icon with tooltip for parent's name
    const parentNameWithPhone = `
    <span class="parent-name d-flex align-items-center flex-wrap">
      ${student.contactDetails.parentName}<br>+91-${student.contactDetails.parentPhone}
    </span>`;

      row.innerHTML = 
          `<td rowspan=${numPaymentEntries}>${student.studentId}</td>
          <td rowspan=${numPaymentEntries}>${student.studentName}</td>
          <td rowspan=${numPaymentEntries}>${parentNameWithPhone}</td>
          <td rowspan=${numPaymentEntries}>${student.studentClass}</td>
          <td rowspan=${numPaymentEntries}>${student.feesType}</td>`;
  
      tableBody.appendChild(row);
      student.payments.forEach((payment) => {
        const paymentRow = document.createElement("tr");
        const paymentStatusClassName = payment.pendingAmount == 0 ? 'paid' : 'unpaid';
        const paymentModeImgSrc =
        payment.paymentMode === "gpay"
          ? "assets/google-pay.png"
          : payment.paymentMode === "cash"
          ? "assets/cash.png"
          : "assets/cheque.png";

        paymentRow.innerHTML = `
          <td>${payment.amount}  <img src=${paymentModeImgSrc} style="width: 24px; height: 24px;"/></td>
          <td>${payment.pendingAmount}</td>
          <td>${payment.paidDate}</td>
          <td><span class="status-${paymentStatusClassName}">${paymentStatusClassName.toUpperCase()}</span></td>`;
  
        tableBody.appendChild(paymentRow);
      });

      // tableBody.appendChild(`<td>${student.studentId}</td>`);
    });
  }
  