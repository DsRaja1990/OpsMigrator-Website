# Web3Forms Setup Guide (Alternative to EmailJS)

**Web3Forms is completely FREE with UNLIMITED emails** - Perfect if you don't want any limits!

## Why Web3Forms?

- ✅ **100% Free** - No credit card required
- ✅ **Unlimited Submissions** - No monthly limits
- ✅ **No Registration** - Get started in 2 minutes
- ✅ **Spam Protection** - Built-in spam filtering
- ✅ **Email Notifications** - Instant email delivery
- ✅ **No Backend Required** - Perfect for static sites

## Quick Setup (2 Minutes)

### Step 1: Get Your Access Key

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Enter your email: **admin@opsmigrator.in**
3. Click **"Create Access Key"**
4. Check your email and copy the access key (looks like: `abc123-def456-ghi789`)

### Step 2: Update Configuration

Open `js/email-config.js` and update:

```javascript
const WEB3FORMS_CONFIG = {
    enabled: true, // Change to true
    accessKey: 'YOUR_ACCESS_KEY_HERE', // Paste your access key
    endpoint: 'https://api.web3forms.com/submit'
};
```

### Step 3: That's It!

Your contact form will now send emails to admin@opsmigrator.in using Web3Forms!

## Example Configuration

```javascript
const WEB3FORMS_CONFIG = {
    enabled: true,
    accessKey: 'abc123-def456-ghi789-klm012', // Your actual key
    endpoint: 'https://api.web3forms.com/submit'
};
```

## How It Works

1. User fills out the contact form
2. JavaScript sends data to Web3Forms API
3. Web3Forms delivers email to admin@opsmigrator.in
4. User sees success message

## Email Format

You'll receive emails like this:

```
From: John Doe (john@example.com)
Subject: New Contact Form: Jira Cloud → Azure DevOps

Company: Tech Corp Inc.
Migration Type: Jira Cloud → Azure DevOps

Message:
We need to migrate our Jira Cloud instance to Azure DevOps...
```

## Features Included

- ✅ Spam protection
- ✅ File attachments (optional)
- ✅ Custom email templates
- ✅ Auto-reply emails
- ✅ reCAPTCHA v3 integration
- ✅ Success/Error callbacks
- ✅ Redirect after submission

## Advanced: Add reCAPTCHA (Optional)

To prevent spam:

1. Get reCAPTCHA v3 keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Add to your HTML form:

```html
<input type="hidden" name="recaptcha_site_key" value="YOUR_SITE_KEY">
```

3. Web3Forms will automatically verify it!

## Switching Between EmailJS and Web3Forms

The code automatically chooses the service:

- If `WEB3FORMS_CONFIG.enabled = true` → Uses Web3Forms
- If `WEB3FORMS_CONFIG.enabled = false` → Uses EmailJS

You can switch anytime by changing the `enabled` flag!

## Comparison

| Feature | EmailJS | Web3Forms |
|---------|---------|-----------|
| Free Tier | 200/month | Unlimited |
| Setup Time | 10 mins | 2 mins |
| Registration | Required | Email only |
| Auto-Reply | Yes | Yes |
| Templates | Custom | Basic |
| Best For | Advanced features | Simple & Free |

## Troubleshooting

### Email not received?
1. Check spam folder
2. Verify access key is correct
3. Check Web3Forms dashboard for logs

### "Invalid access key" error?
- Make sure you copied the full access key
- No spaces before/after the key

### Want to use both services?
- Keep both configured
- Use Web3Forms as primary (free)
- EmailJS as backup (advanced features)

## Support

- Web3Forms Docs: https://docs.web3forms.com/
- Web3Forms Support: support@web3forms.com
- OpsMigrator: admin@opsmigrator.in

---

**Recommendation:** Start with Web3Forms (free, unlimited). Switch to EmailJS later if you need advanced features like custom templates or auto-replies.

**Last Updated:** November 13, 2025
