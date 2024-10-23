
export function getEmailTemplate(data) {
  // Helper function to format date
  const formatDate = (day, month, year) => `${day}/${month}/${year}`;

  // Generate child rows HTML
  const generateChildrenRows = (children) => {
    if (!children || children.length === 0) return '';
    
    return children.map(child => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${child.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${child.gender}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">
          ${formatDate(child.birth_day, child.birth_month, child.birth_year)}
        </td>
        <td style="padding: 8px; border: 1px solid #ddd;">
          ${2024 - Number(child.birth_year)}
        </td>
      </tr>
    `).join('');
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Waiver Form Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          border-bottom: 2px solid #337ab7;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          font-size: 34px;
          margin: 0;
        }
        .valid-date {
          color: #22c55e;
          font-size: 24px;
        }
        .personal-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 20px 0;
        }
        .info-item {
          margin-bottom: 15px;
        }
        .info-label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .info-value {
          background-color: #f3f4f6;
          padding: 8px;
          border-radius: 4px;
        }
        .children-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .children-table th {
          background-color: #11085a;
          color: white;
          padding: 12px;
          text-align: left;
        }
        .signature-section {
          text-align: center;
          margin: 30px 0;
        }
        .signature-box {
          max-width: 300px;
          margin: 0 auto;
          border: 1px solid #000;
          padding: 20px;
        }
        .consent-checkbox {
          margin: 15px 0;
          padding-left: 25px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Waiver Form</h1>
          <p class="valid-date">Valid Till Date: 21-10-2025</p>
        </div>

        <div class="personal-info">
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">${data.email || ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Name</div>
            <div class="info-value">${data.name || ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Gender</div>
            <div class="info-value">${data.gender || ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Phone Number</div>
            <div class="info-value">${data.phone || ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">City</div>
            <div class="info-value">${data.city || ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Country</div>
            <div class="info-value">India</div>
          </div>
          <div class="info-item">
            <div class="info-label">Age</div>
            <div class="info-value">${data.age || ''}</div>
          </div>
        </div>

        <h2>Child List:</h2>
        <table class="children-table">
          <thead>
            <tr>
              <th style="width: 30%">Name</th>
              <th style="width: 22%">Gender</th>
              <th style="width: 25%">Birth Date</th>
              <th style="width: 23%">Age</th>
            </tr>
          </thead>
          <tbody>
            ${generateChildrenRows(data.children)}
          </tbody>
        </table>

        <div class="consent-checkbox">
          ☑️ I certify that I am the parent or legal guardian of the above child and confirm that the information I entered is accurate and true.
        </div>
        <div class="consent-checkbox">
          ☑️ I am at least 18 years old and I have read and agree to the terms of the above agreement.
        </div>

       
      </div>
    </body>
    </html>
  `;
}