const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (
  userEmail,
  userName,
  order
) => {
  const productRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">
          ${item.product.name}
        </td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">
          ₹${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #eee;padding:30px;">
      <h1 style="text-align:center;color:#111;">
        BL CREATION
      </h1>

      <h2>Hello ${userName},</h2>

      <p>
        Thank you for shopping with <strong>BL CREATION</strong>.
      </p>

      <p>
        Your order has been placed successfully.
      </p>

      <hr/>

      <p><strong>Order ID:</strong> ${order.id}</p>

      <p><strong>Order Date:</strong>
      ${new Date(order.createdAt).toLocaleString()}</p>

      <p><strong>Status:</strong> ${order.status}</p>

      <table
        style="width:100%;border-collapse:collapse;margin-top:20px;"
      >
        <thead>
          <tr style="background:#111;color:#fff;">
            <th style="padding:10px;">Product</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${productRows}
        </tbody>
      </table>

      <h2 style="text-align:right;margin-top:25px;">
        Total : ₹${order.total.toFixed(2)}
      </h2>

      <hr/>

      <p>
        We appreciate your purchase and hope you enjoy your order.
      </p>

      <p>
        Regards,<br/>
        <strong>BL CREATION Team</strong>
      </p>
  </div>
  `;
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

  await transporter.sendMail({
    from: `"BL CREATION" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Order Confirmation - ${order.id}`,
    html,
  });
};

module.exports = {
  sendOrderConfirmationEmail,
};