# Contact Form Email Implementation

The OpsMigrator website contact form now supports sending emails to `admin@opsmigrator.in` using open-source JavaScript solutions.

## 📧 Available Options

### Option 1: Web3Forms (RECOMMENDED - Free & Unlimited) ⭐

**Best for:** Quick setup, no limits, completely free

- ✅ **FREE** - No credit card required
- ✅ **UNLIMITED** emails per month
- ✅ **2-minute setup** - Just need an access key
- ✅ Built-in spam protection

**Setup Guide:** See [WEB3FORMS_SETUP.md](./WEB3FORMS_SETUP.md)

### Option 2: EmailJS (Advanced Features)

**Best for:** Custom email templates, auto-replies, more control

- ✅ 200 emails/month free
- ✅ Custom HTML email templates
- ✅ Auto-reply functionality
- ✅ More customization options

**Setup Guide:** See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

## 🚀 Quick Start (Web3Forms - 2 Minutes)

1. Go to https://web3forms.com/
2. Enter `admin@opsmigrator.in` and get access key
3. Open `js/email-config.js`
4. Update:
   ```javascript
   const WEB3FORMS_CONFIG = {
       enabled: true,
       accessKey: 'YOUR_ACCESS_KEY_HERE',
       endpoint: 'https://api.web3forms.com/submit'
   };
   ```
5. Done! 🎉

## 📁 Files Added/Modified

### New Files
- `js/email-config.js` - Email service configuration
- `js/email-service.js` - Email service handler (supports both EmailJS and Web3Forms)
- `EMAILJS_SETUP.md` - Detailed EmailJS setup guide
- `WEB3FORMS_SETUP.md` - Detailed Web3Forms setup guide
- `README_EMAIL.md` - This file

### Modified Files
- `index.html` - Added EmailJS CDN and new script references
- `js/main.js` - Updated contact form handler to use email service

## 🔧 Configuration

Edit `js/email-config.js` to configure:

```javascript
const EMAIL_CONFIG = {
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY',
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        autoReplyTemplateId: 'YOUR_AUTOREPLY_TEMPLATE_ID'
    },
    recipientEmail: 'admin@opsmigrator.in',
    settings: {
        enableAutoReply: false,
        enableSpamProtection: true,
        maxMessageLength: 5000,
        requiredFields: ['name', 'email', 'message']
    }
};
```

## 🧪 Testing

1. Push changes to GitHub
2. Wait for deployment
3. Visit https://opsmigrator.in
4. Fill out contact form
5. Check admin@opsmigrator.in for email

## 🛡️ Features

### Spam Protection
- URL limit checking (max 2 URLs)
- Spam keyword filtering
- Message length validation (max 5000 chars)

### Form Validation
- Required field checking
- Email format validation
- Real-time error messages
- Loading states

### User Experience
- Success/error notifications
- Form reset after successful submission
- Disabled button during submission
- Spinner animation

## 🔄 Switching Services

The code automatically chooses the right service:

```javascript
// Priority: Web3Forms → EmailJS
if (WEB3FORMS_CONFIG.enabled) {
    // Use Web3Forms
} else {
    // Use EmailJS
}
```

To switch services, just update `enabled` flag in `js/email-config.js`.

## 📊 Comparison Table

| Feature | Web3Forms | EmailJS |
|---------|-----------|---------|
| **Price** | FREE | FREE (200/mo) |
| **Emails/Month** | UNLIMITED | 200 |
| **Setup Time** | 2 minutes | 10 minutes |
| **Registration** | Email only | Full account |
| **Custom Templates** | Basic | Advanced HTML |
| **Auto-Reply** | Yes | Yes |
| **Spam Protection** | Built-in | Manual |
| **Best For** | Simple & Free | Advanced control |

## 🐛 Troubleshooting

### Email not received?

1. **Check spam folder** in admin@opsmigrator.in
2. **Verify configuration** in `js/email-config.js`
3. **Check browser console** for errors (F12)
4. **Test with simple message** first

### Common Errors

| Error | Solution |
|-------|----------|
| "Email service not configured" | Update config in `js/email-config.js` |
| "Invalid public key" | Check EmailJS public key |
| "Invalid access key" | Check Web3Forms access key |
| "Failed to fetch" | Check internet connection |

### Still not working?

1. Check network tab in browser dev tools (F12)
2. Look for failed requests
3. Contact support: admin@opsmigrator.in

## 🌟 Recommended Setup

**For Production (Recommended):**
1. Start with **Web3Forms** (free, unlimited)
2. Takes only 2 minutes to setup
3. No monthly limits or restrictions

**For Advanced Features:**
1. Use **EmailJS** if you need:
   - Custom HTML email templates
   - Multiple email templates
   - More control over email styling

## 📚 Additional Resources

- [Web3Forms Documentation](https://docs.web3forms.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Contact Form Best Practices](https://web.dev/sign-up-form-best-practices/)

## 🤝 Support

Need help? Contact:
- Email: admin@opsmigrator.in
- GitHub Issues: [Create an issue](https://github.com/DsRaja1990/OpsMigrator-Website/issues)

---

**Last Updated:** November 13, 2025  
**Author:** OpsMigrator AI Team
