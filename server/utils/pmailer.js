const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = async (order) => {
  try {
    const productsRows = order.products.map(p => `
      <tr>
        <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf;">${p.productName || 'Product'}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:center;">${p.variation || '—'}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:center;">${p.quantity}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:right;">Rs. ${p.price.toLocaleString()}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f2d2cf; text-align:right; font-weight:bold;">Rs. ${p.subtotal.toLocaleString()}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"/></head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; background:#f9f9f9; margin:0; padding:0;">
        <div style="max-width:620px; margin:30px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1a1a1a,#2d2020); padding:32px 32px 24px;">
            <h1 style="color:#f2d2cf; margin:0; font-size:22px;">🛒 New Order Received!</h1>
            <p style="color:rgba(242,210,207,0.7); margin:6px 0 0; font-size:13px;">
              Order ID: <strong style="color:#f2d2cf;">#${order._id}</strong>
            </p>
          </div>

          <!-- Customer Info -->
          <div style="padding:24px 32px; border-bottom:1px solid #f2d2cf;">
            <h2 style="color:#c9706b; font-size:15px; margin:0 0 14px; text-transform:uppercase; letter-spacing:1px;">Customer Details</h2>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr><td style="padding:5px 0; color:#888; width:130px;">Name</td><td style="color:#1a1a1a; font-weight:600;">${order.customerName}</td></tr>
              <tr><td style="padding:5px 0; color:#888;">Email</td><td style="color:#1a1a1a;">${order.customerEmail}</td></tr>
              <tr><td style="padding:5px 0; color:#888;">Phone</td><td style="color:#1a1a1a;">${order.customerPhone}</td></tr>
              <tr><td style="padding:5px 0; color:#888;">Address</td><td style="color:#1a1a1a;">${order.customerAddress}${order.customerCity ? ', ' + order.customerCity : ''}</td></tr>
              <tr><td style="padding:5px 0; color:#888;">Payment</td><td style="color:#1a1a1a; text-transform:capitalize;">${order.paymentMethod.replace('_',' ')}</td></tr>
              ${order.customerNote ? `<tr><td style="padding:5px 0; color:#888;">Note</td><td style="color:#1a1a1a;">${order.customerNote}</td></tr>` : ''}
            </table>
          </div>

          <!-- Products Table -->
          <div style="padding:24px 32px; border-bottom:1px solid #f2d2cf;">
            <h2 style="color:#c9706b; font-size:15px; margin:0 0 14px; text-transform:uppercase; letter-spacing:1px;">Ordered Products</h2>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <thead>
                <tr style="background:#fff5f5;">
                  <th style="padding:10px 12px; text-align:left; color:#888; font-weight:600;">Product</th>
                  <th style="padding:10px 12px; text-align:center; color:#888; font-weight:600;">Variant</th>
                  <th style="padding:10px 12px; text-align:center; color:#888; font-weight:600;">Qty</th>
                  <th style="padding:10px 12px; text-align:right; color:#888; font-weight:600;">Price</th>
                  <th style="padding:10px 12px; text-align:right; color:#888; font-weight:600;">Subtotal</th>
                </tr>
              </thead>
              <tbody>${productsRows}</tbody>
            </table>
          </div>

          <!-- Total -->
          <div style="padding:20px 32px; background:#fff5f5; border-bottom:1px solid #f2d2cf;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:15px; color:#888;">Total Amount</span>
              <span style="font-size:24px; font-weight:900; color:#c9706b;">Rs. ${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding:20px 32px; text-align:center;">
            <p style="color:#888; font-size:12px; margin:0;">
              Dr. Aisha Lakhwani — Order Management System<br/>
              Please process this order at the earliest.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    const response = await resend.emails.send({
      from:    'Dr. Aisha Orders <onboarding@resend.dev>',
      to:      process.env.OWNER_EMAIL,
      replyTo: order.customerEmail,
      subject: `🛒 New Order #${order._id} — Rs. ${order.totalAmount.toLocaleString()} — ${order.customerName}`,
      html,
    });

    console.log('Order email sent:', response);
    return response;
  } catch (error) {
    console.error('Order email error:', error);
    // email fail hone se order fail na ho
  }
};

module.exports = sendOrderEmail;