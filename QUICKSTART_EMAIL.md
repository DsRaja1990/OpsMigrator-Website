# 🚀 Quick Start: Enable Contact Form Emails in 2 Minutes

## Step-by-Step Guide

### Step 1: Choose Your Email Service

**Option A: Web3Forms** (Recommended - Free & Unlimited) ⭐
- No sign-up required
- Unlimited emails
- 2-minute setup

**Option B: EmailJS** (Advanced features)
- 200 emails/month free
- Custom templates
- More control

---

## 🎯 For Web3Forms (EASIEST - 2 Minutes)

### 1. Get Access Key
Visit: https://web3forms.com/

Enter: `admin@opsmigrator.in`

Click: **"Create Access Key"**

Check your email and copy the key (like: `abc123-def456-ghi789`)

### 2. Update Config
Open: `js/email-config.js`

Find these lines:
```javascript
const WEB3FORMS_CONFIG = {
    enabled: false,
    accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
```

Change to:
```javascript
const WEB3FORMS_CONFIG = {
    enabled: true,
    accessKey: 'abc123-def456-ghi789', // Your actual key
```

### 3. Test
```bash
git add .
git commit -m "Enable contact form emails with Web3Forms"
git push
```

Wait 2 minutes for deployment, then test at https://opsmigrator.in

**Done! ✅**

---

## 📧 For EmailJS (Advanced - 10 Minutes)

### 1. Create Account
- Visit: https://www.emailjs.com/
- Sign up (free)
- Verify email

### 2. Add Email Service
- Dashboard → **Email Services**
- Click **"Add New Service"**
- Choose **Gmail**
- Connect `admin@opsmigrator.in`
- Copy **Service ID**

### 3. Create Template
- Dashboard → **Email Templates**
- Click **"Create New Template"**
- Name: `OpsMigrator Contact Form`
- Copy **Template ID**

Use this template:
```
Subject: New Contact: {{migration_type}}

From: {{from_name}} ({{from_email}})
Company: {{company}}
Type: {{migration_type}}

Message:
{{message}}
```

### 4. Get Public Key
- Dashboard → **Account** → **General**
- Copy your **Public Key**

### 5. Update Config
Open: `js/email-config.js`

Update:
```javascript
const EMAIL_CONFIG = {
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY',        // Paste here
        serviceId: 'YOUR_SERVICE_ID',        // Paste here
        templateId: 'YOUR_TEMPLATE_ID',      // Paste here
    },
```

### 6. Test
```bash
git add .
git commit -m "Enable contact form emails with EmailJS"
git push
```

**Done! ✅**

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Form submission shows "Sending..." spinner
- [ ] Success message appears after submission
- [ ] Email received at admin@opsmigrator.in
- [ ] Form resets after successful submission
- [ ] No errors in browser console (F12)

---

## 🐛 Quick Troubleshooting

### Email not received?
1. ✅ Check spam folder
2. ✅ Wait 2-3 minutes
3. ✅ Check configuration is correct

### Error in console?
1. ✅ Check if access key/public key is correct
2. ✅ No spaces before/after keys
3. ✅ Files are saved and deployed

### Form not submitting?
1. ✅ Clear browser cache (Ctrl+Shift+R)
2. ✅ Check internet connection
3. ✅ Try different browser

---

## 📞 Need Help?

**Option 1:** Check detailed guides
- Web3Forms: See `WEB3FORMS_SETUP.md`
- EmailJS: See `EMAILJS_SETUP.md`

**Option 2:** Contact support
- Email: admin@opsmigrator.in
- Check browser console for errors (F12 → Console)

---

## 🎉 You're All Set!

Your contact form is now ready to receive emails at `admin@opsmigrator.in`

Test it at: **https://opsmigrator.in/#contact**

---

**Last Updated:** November 13, 2025
