// Email Configuration for OpsMigrator Contact Form
// This file contains the EmailJS configuration

const EMAIL_CONFIG = {
    // EmailJS Configuration
    // Get these values from https://dashboard.emailjs.com/
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY',        // Replace with your EmailJS public key
        serviceId: 'YOUR_SERVICE_ID',        // Replace with your EmailJS service ID
        templateId: 'YOUR_TEMPLATE_ID',      // Replace with your EmailJS template ID
        autoReplyTemplateId: 'YOUR_AUTOREPLY_TEMPLATE_ID', // Optional: for auto-reply
    },
    
    // Target email address
    recipientEmail: 'admin@opsmigrator.in',
    
    // Form settings
    settings: {
        enableAutoReply: false,  // Set to true to enable auto-reply emails
        enableSpamProtection: true,
        maxMessageLength: 5000,
        requiredFields: ['name', 'email', 'message']
    }
};

// Alternative: Web3Forms Configuration (Completely Free, Unlimited)
// Sign up at https://web3forms.com/ to get your access key
const WEB3FORMS_CONFIG = {
    enabled: true, // Set to true to use Web3Forms instead of EmailJS
    accessKey: '36a2e501-6650-4065-abbe-5805b7ca170e', // Get from https://web3forms.com/
    endpoint: 'https://api.web3forms.com/submit'
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
    window.WEB3FORMS_CONFIG = WEB3FORMS_CONFIG;
}
