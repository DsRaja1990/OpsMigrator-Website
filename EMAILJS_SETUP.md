# EmailJS Setup Guide for OpsMigrator Contact Form

This guide will help you set up EmailJS to send emails from your contact form to admin@opsmigrator.in.

## What is EmailJS?

EmailJS is a free, open-source JavaScript library that allows you to send emails directly from client-side JavaScript without needing a backend server. Perfect for static websites hosted on GitHub Pages!

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (It's FREE - 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider (Gmail is recommended):
   - **Gmail**: Select Gmail and connect your admin@opsmigrator.in account
   - **Outlook**: If using Outlook/Office365
   - **Custom SMTP**: For custom email servers
4. Click **"Connect Account"** and authorize EmailJS
5. Note down your **Service ID** (e.g., `service_abc1234`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **"Create New Template"**
3. Set up the template:

### Template Name
```
OpsMigrator Contact Form
```

### Template Subject
```
New Contact Form Submission - {{migration_type}}
```

### Template Content (HTML)
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0066FF;">New Contact Form Submission</h2>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>From:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Company:</strong> {{company}}</p>
    <p><strong>Migration Type:</strong> {{migration_type}}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3>Message:</h3>
    <p style="white-space: pre-wrap;">{{message}}</p>
  </div>
  
  <hr style="margin: 30px 0;">
  
  <p style="color: #666; font-size: 12px;">
    This email was sent from the OpsMigrator website contact form.
    Reply to: {{from_email}}
  </p>
</div>
```

### Template Settings
- **To Email**: `admin@opsmigrator.in`
- **From Name**: `OpsMigrator Website`
- **Reply To**: `{{reply_to}}`

4. Click **"Save"**
5. Note down your **Template ID** (e.g., `template_xyz5678`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
3. Copy this key

## Step 5: Update the Website Code

Open `js/main.js` and replace the placeholder values:

### Line ~220: Replace Public Key
```javascript
// Find this line:
emailjs.init('YOUR_PUBLIC_KEY');

// Replace with:
emailjs.init('AbCdEfGhIjKlMnOp'); // Your actual public key
```

### Line ~270: Replace Service ID and Template ID
```javascript
// Find these lines:
const response = await emailjs.send(
    'YOUR_SERVICE_ID',      // Your EmailJS service ID
    'YOUR_TEMPLATE_ID',     // Your EmailJS template ID
    templateParams
);

// Replace with:
const response = await emailjs.send(
    'service_abc1234',      // Your actual service ID
    'template_xyz5678',     // Your actual template ID
    templateParams
);
```

## Step 6: (Optional) Create Auto-Reply Template

To send automatic confirmation emails to users:

1. Create another template in EmailJS
2. Template Name: `OpsMigrator Auto Reply`
3. Template Content:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0066FF;">Thank You for Contacting OpsMigrator AI!</h2>
  
  <p>Hi {{to_name}},</p>
  
  <p>We have received your inquiry about <strong>{{migration_type}}</strong> and will get back to you within 24 hours.</p>
  
  <p>In the meantime, feel free to explore our documentation:</p>
  <ul>
    <li><a href="https://opsmigrator.in/docs">Migration Guides</a></li>
    <li><a href="https://opsmigrator.in/#features">Features</a></li>
    <li><a href="https://opsmigrator.in/#pricing">Pricing</a></li>
  </ul>
  
  <p>Best regards,<br>The OpsMigrator AI Team</p>
  
  <hr style="margin: 30px 0;">
  <p style="color: #666; font-size: 12px;">
    OpsMigrator AI - Intelligent Enterprise Migration Platform<br>
    Website: <a href="https://opsmigrator.in">opsmigrator.in</a>
  </p>
</div>
```

4. Enable auto-reply in `js/main.js` (uncomment the section around line 290)

## Step 7: Test the Contact Form

1. Push your changes to GitHub
2. Wait for GitHub Pages to deploy
3. Visit your website: https://opsmigrator.in
4. Navigate to the Contact section
5. Fill out and submit the form
6. Check admin@opsmigrator.in for the email

## Troubleshooting

### Email not received?
1. Check your EmailJS dashboard → **Logs** to see if the email was sent
2. Check spam/junk folder in admin@opsmigrator.in
3. Verify all IDs are correct in `js/main.js`

### "Invalid public key" error?
- Make sure you copied the public key correctly from EmailJS dashboard
- Check for any extra spaces or missing characters

### Rate limit reached?
- EmailJS free tier: 200 emails/month
- Upgrade to paid plan or use a different service

### Gmail authorization issues?
- Make sure you've enabled "Less secure app access" or use App Passwords
- For Google Workspace, admin must enable API access

## Alternative Free Email Services

If you need more emails per month:

1. **FormSpree** - 50 submissions/month free
2. **Form-Data** - 100 submissions/month free  
3. **Formsubmit.co** - Unlimited, completely free
4. **Web3Forms** - Unlimited, free with attribution

## Security Notes

- Public key is safe to expose in client-side code
- Never expose Service ID or Template ID in public repos (they're already visible in network requests, but keep them in code)
- Consider adding reCAPTCHA to prevent spam
- Monitor your EmailJS dashboard for unusual activity

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Contact OpsMigrator Support: admin@opsmigrator.in

---

**Last Updated:** November 13, 2025
