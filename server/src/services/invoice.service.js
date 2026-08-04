const PDFDocument = require("pdfkit");

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order.id}.pdf`
  );

  doc.pipe(res);

  // Header
  doc
    .fontSize(24)
    .text("BL CREATION", {
      align: "center",
    });

  doc
    .moveDown()
    .fontSize(18)
    .text("INVOICE", {
      align: "center",
    });

  doc.moveDown(2);

  // Order Details
  doc.fontSize(12);

  doc.text(`Invoice ID : ${order.id}`);

  doc.text(
    `Order Date : ${new Date(
      order.createdAt
    ).toLocaleDateString()}`
  );

  doc.text(`Status : ${order.status}`);

  doc.moveDown();

  // Customer
  doc.fontSize(14).text("Customer");

  doc.fontSize(12);

  doc.text(order.fullName);

  doc.text(order.phone);

  doc.text(order.address);

  doc.text(
    `${order.city}, ${order.state}`
  );

  doc.text(
    `${order.country} - ${order.pincode}`
  );

  doc.moveDown();

  // Products
  doc.fontSize(14).text("Products");

  doc.moveDown(0.5);

  order.orderItems.forEach((item) => {
    doc.text(
      `${item.product.name}  x${item.quantity}  -  ₹${(
        item.price * item.quantity
      ).toFixed(2)}`
    );
  });

  doc.moveDown();

  doc
    .fontSize(16)
    .text(
      `Total : ₹${order.total.toFixed(2)}`,
      {
        align: "right",
      }
    );

  doc.moveDown(2);

  doc
    .fontSize(11)
    .text(
      "Thank you for shopping with BL CREATION!",
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports = {
  generateInvoice,
};