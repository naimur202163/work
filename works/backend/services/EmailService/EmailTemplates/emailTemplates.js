const config = require('../../../config/config');
const { getValue } = require('../../../utils/cacheProvide');

require('dotenv').config();

class EmailTemplates {
  templateLayout = (content) => {
    return `
    <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&display=swap"
            rel="stylesheet"
          />
            <title>Activate your account</title>
        
            <!-- styling -->
            <style>
              :root {
                Color-scheme: light dark;
                supported-color-schemes:light dark;
              }

              /* global */
              *,
              *::before,
              *::after {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              a {
                text-decoration: none;
              }
        
              body {
                font-family: "Poppins", sans-serif;
                height: auto;
              }
        
              /* header */
              .header {
                padding: 1.5rem 0;
                background-color: #202020;
              }
              .header a {
                text-align: center;
              }
        
              .header a img {
                width: auto;
                height: 3.5rem;
                margin: 1rem auto 0 auto;
                display: block;
              }
              .header a p {
                font-size: 0.75rem;
                text-transform: uppercase;
                font-weight: 500;
                font-family: "Poppins", sans-serif;
                color: #fe697c;
                text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
                cursor: pointer;
              }
        
              /* content */
              .wrapper {
                background-color: #202020;
                width: 100%;
              }

              .content {
                background-color: #181818;
                padding: 2rem 4rem;
                color: #fff;
                text-align: center;
                width: 80%;
                margin: 0 auto;
                border-radius: 1rem;
                box-shadow: rgba(255, 255, 255, 0.08) 0px 1px 4px;
              }
        
              .content p {
                margin-bottom: 1rem;
                font-size: 1.2rem;
                color: #fff;
              }
        
              .content button {
                background-image: linear-gradient(to bottom, #ff4883, #fdb769);
                outline: none;
                padding: 0.65rem 2rem;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                margin: 2rem 0 4rem 0;
              }

              .content button a {
                color: #fff;
                font-size: 1.5rem;
                font-weight: 300;
              }
        
              .content button:hover {
                transform: translateY(-0.3rem);
              }
        
              .content h2 {
                font-size: 1.2rem;
                font-weight: 400;
                cursor: pointer;
                color: #fe697c;
              }
        
              /* footer */
              .footer {
                background-color: #202020;
                padding: 1rem 0;
                color: rgb(179, 179, 179);
                text-align: center;
              }
        
              /* responsive */
              @media (max-width: 991px) {
                .header {
                  padding: 1rem 0;
                }
              }
        
              @media (max-width: 768px) {
                .content {
                  padding: 2rem 3rem;
                }
                .header a img {
                  height: 3rem;
                  margin-top: 0.5rem;
                }
                .header a p {
                  font-size: 0.7rem;
                }
                .footer span {
                  font-size: 0.9rem;
                }
              }
        
              @media (max-width: 600px) {
                .content {
                  padding: 2rem 2rem;
                  width: 90%;
                }
  
                .content p {
                  margin-bottom: 0.6rem;
                  font-size: 1rem;
                }
        
                .content button {
                  padding: 0.4rem 1.5rem;
                  font-size: 1.2rem;
                  margin: 2rem 0;
                }
        
                .content h2 {
                  font-size: 1rem;
                }
              }
        
              @media (max-width: 414px) {
                .content {
                  padding: 2rem 1rem;
                  width: 90%;
                }
                .header a p {
                  font-size: 0.7rem;
                }
        
                .header a img {
                  height: 2.5rem;
                }
        
                .content p {
                  margin-bottom: 0.5rem;
                  font-size: 0.8rem;
                }
        
                .content button {
                  padding: 0.4rem 1.5rem;
                  font-size: 1rem;
                  margin: 2rem 0;
                }
        
                .content h2 {
                  font-size: 0.8rem;
                }
                .footer span {
                  font-size: 0.75rem;
                }
              }

              @media (prefers-color-scheme: dark) {
                .header {
                  background-color: #202020 !important; 
                }
                .header a p {
                  color: #cc0000 !important;
                }
                .wrapper {
                  background-color: #202020 !important;
                }
                .content {
                  background-color: #181818 !important;
                }
          
                .content p {
                  color: #fff !important;
                }
          
                .content button {
                  background-image: linear-gradient(to bottom, #ff4883, #fdb769) !important;
                }
  
                .content button a {
                  color: #fff !important;
                }
          
                .content h2 {
                  color: #cc0000 !important;
                }
          
                /* footer */
                .footer {
                  background-color: #202020 !important;
                  color: rgb(179, 179, 179) !important;
                }
              }
            </style>
          </head>
          <body>
            <!-- header -->
            <div class="header">
              <a href="https://www.isutra.tv">
                <p>Create Amazing Content | Engage With Your Audience</p>
                <img
                  src="https://res.cloudinary.com/isutra/image/upload/v1628219923/static%20assets/iSUTRA_logo_clean_white_zwxpqr.png"
                  alt="Isutra"
                />
              </a>
            </div>
        
            <!-- content -->
            <div class="wrapper">
            ${content}
            </div>
            
        
            <!-- footer -->
            <div class="footer">
              <span>Copyright © 2021 iSUTRA LLC. All Rights Reserved.</span>
            </div>
          </body>
      </html>   
    `;
  };

  // account activate email
  newUserRegistration(emailVerificationToken) {
    const emailLink = `${config.BASE_URL}/emailverification/${emailVerificationToken}`;

    const content = `
    <div class="content">
    <p>Welcome!</p>

    <p>
      We are delighted you signed up for iSutra! To start exploring the full
      features of this Social Media Co-op, please confirm your email address.
    </p>

    <button>
      <a href=${emailLink}> Verify Now </a>
    </button>

    <h2>Welcome to iSutra</h2>
    <h2>The iSUTRA Team</h2>
  </div>
    `;

    return {
      subject: 'New User Signup',
      text: 'New User Signup',
      html: this.templateLayout(content),
    };
  }

  // password reset email
  passwordReset(passwordResetToken) {
    const emailLink = `${config.BASE_URL}/resetPassword/${passwordResetToken}`;

    const content = `
    <div class="content">

    <p>We received a request to change your password.</p>

    <button>
      <a href=${emailLink}> Reset Password </a>
    </button>

    <p>
     The password reset link above will expire in 24 hours. After that, you'll have to request a new one.
    </p>

    <p>
     Didn't reset your password? You can safely ignore this email.
    </p>

    <h2>The iSUTRA Team</h2>
  </div>
    `;

    return {
      subject: 'Password Reset',
      text: 'Reset Your Password',
      html: this.templateLayout(content),
    };
  }

  // tip template
  // Tip Received email TEMPLATE
  tipReceived(username, videoId, tipAmount, videoTitle, userId) {
    const myAccountPageLink = `${config.BASE_URL}/channel/${username}?tab=myaccount`;

    const actorUsername = getValue("sender_username")
    const content = `
    <div class="content">
    <p>🥳 Congratulations! You received karma from ${actorUsername} in the amount of $${tipAmount}!</p>

    <p>
     Karma was received on your video: ${videoTitle}.
    </p>

    <button>
      <a href=${myAccountPageLink}> View Transaction </a>
    </button>

  
    <p>
    We wish you all the best on your future video content! Keep creating quality content with iSutra. Have a great day!
   </p>
    <h2>The iSUTRA Team</h2>
  </div>
    `;

    return {
      subject: 'Congrats! You just received Karma!',
      text: 'Congrats! You just received Karma!',
      html: this.templateLayout(content),
    };
  }
  // tip template
}

module.exports.emailTemplates = new EmailTemplates();
