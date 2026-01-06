export function createOtpEmailBody(otpCode, name) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Code</title>
</head>

<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

  <!-- HEADER -->
  <div style="background: linear-gradient(to right, #369adc, #e55b84); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <img 
      src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" 
      alt="Messenger Logo"
      style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;"
    />
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
      Verify Your Email
    </h1>
  </div>

  <!-- BODY -->
  <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">

    <p style="font-size: 18px; color: #5B86E5;">
      <strong>Hello ${name},</strong>
    </p>

    <p>
      Please verify your email address for your ChatApp account.
      Use the OTP below to complete your verification.
    </p>

    <!-- OTP BOX -->
    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin: 30px 0; text-align: center; border-left: 4px solid #62d5f2;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
        Your verification code
      </p>

      <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #333;">
        ${otpCode}
      </div>

      <p style="margin-top: 15px; font-size: 13px; color: #999;">
        This code will expire in <strong>10 minutes</strong>.
      </p>
    </div>

    <p>
      If you did not request this verification, please ignore this email.
      Your account remains secure.
    </p>

    <p style="margin-top: 25px; margin-bottom: 0;">
      Best regards,<br>
      <strong>The ChatApp Team</strong>
    </p>
  </div>

  <!-- FOOTER -->
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>© 2025 Messenger. All rights reserved.</p>
    <p>
      <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
    </p>
  </div>

</body>
</html>
`
}