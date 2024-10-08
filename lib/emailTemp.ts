// an email template that can be used with Nodemailer to send emails

const HTML_TEMPLATE = ({
    name,
    message,
    email,
    subjectLine,
  }: {
    name: string;
    message: string;
    email: string;
    subjectLine: string;
  }) => {
    return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>NodeMailer Email Template</title>
              <style>
                .container {
                  width: 100%;
                  height: 100%;
                  padding: 20px;
                  background-color: #f4f4f4;
                }
                .email {
                  width: 80%;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                }
                .email-header {
                  background-color: #0f172a;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
                .email-body {
                  padding: 20px;
                }
                .email-footer {
                  background-color: #0f172a;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="email">
                  <div class="email-header">
                    <h1>${subjectLine}</h1>
                  </div>
                  <div class="email-body">
                
                          ${message}
                 
                  </div>
                  <div class="email-footer">
                    <p>Cheers!!</p>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;
  };
  
  export default HTML_TEMPLATE;
  