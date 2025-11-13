// ===========================
// Email Service Handler
// Supports both EmailJS and Web3Forms
// ===========================

class EmailService {
    constructor(config) {
        this.config = config;
        this.isEmailJSInitialized = false;
    }

    // Initialize EmailJS if needed
    initEmailJS() {
        if (!this.isEmailJSInitialized && typeof emailjs !== 'undefined') {
            emailjs.init(this.config.emailjs.publicKey);
            this.isEmailJSInitialized = true;
            console.log('EmailJS initialized successfully');
        }
    }

    // Send email using EmailJS
    async sendWithEmailJS(formData) {
        this.initEmailJS();

        const templateParams = {
            to_email: this.config.recipientEmail,
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company || 'Not provided',
            migration_type: formData.migrationType || 'Not specified',
            message: formData.message,
            reply_to: formData.email
        };

        const response = await emailjs.send(
            this.config.emailjs.serviceId,
            this.config.emailjs.templateId,
            templateParams
        );

        // Send auto-reply if enabled
        if (this.config.settings.enableAutoReply && this.config.emailjs.autoReplyTemplateId) {
            try {
                const autoReplyParams = {
                    to_email: formData.email,
                    to_name: formData.name,
                    from_name: 'OpsMigrator AI Team',
                    migration_type: formData.migrationType || 'migration services'
                };

                await emailjs.send(
                    this.config.emailjs.serviceId,
                    this.config.emailjs.autoReplyTemplateId,
                    autoReplyParams
                );
                console.log('Auto-reply sent successfully');
            } catch (error) {
                console.warn('Auto-reply failed:', error);
                // Don't throw error, main email was sent successfully
            }
        }

        return response;
    }

    // Send email using Web3Forms
    async sendWithWeb3Forms(formData) {
        const payload = {
            access_key: window.WEB3FORMS_CONFIG.accessKey,
            subject: `New Contact Form: ${formData.migrationType || 'General Inquiry'}`,
            from_name: formData.name,
            email: formData.email,
            company: formData.company || 'Not provided',
            migration_type: formData.migrationType || 'Not specified',
            message: formData.message,
            to_email: this.config.recipientEmail
        };

        const response = await fetch(window.WEB3FORMS_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to send email via Web3Forms');
        }

        return await response.json();
    }

    // Main send method - automatically chooses the right service
    async send(formData) {
        // Validate form data
        const validation = this.validateFormData(formData);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }

        try {
            // Check if Web3Forms is enabled and configured
            if (window.WEB3FORMS_CONFIG && 
                window.WEB3FORMS_CONFIG.enabled && 
                window.WEB3FORMS_CONFIG.accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                console.log('Using Web3Forms service');
                return await this.sendWithWeb3Forms(formData);
            }
            
            // Otherwise use EmailJS
            if (this.config.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
                throw new Error('Email service not configured. Please check EMAILJS_SETUP.md for setup instructions.');
            }
            
            console.log('Using EmailJS service');
            return await this.sendWithEmailJS(formData);
            
        } catch (error) {
            console.error('Email sending error:', error);
            throw error;
        }
    }

    // Validate form data
    validateFormData(formData) {
        const requiredFields = this.config.settings.requiredFields;

        for (const field of requiredFields) {
            if (!formData[field] || !formData[field].trim()) {
                return {
                    isValid: false,
                    message: `Please fill in the ${field} field.`
                };
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address.'
            };
        }

        // Message length validation
        if (formData.message.length > this.config.settings.maxMessageLength) {
            return {
                isValid: false,
                message: `Message is too long. Maximum ${this.config.settings.maxMessageLength} characters allowed.`
            };
        }

        // Basic spam protection
        if (this.config.settings.enableSpamProtection) {
            const suspiciousPatterns = [
                /https?:\/\//gi, // URLs (more than 2)
                /\b(viagra|cialis|casino|lottery|winner)\b/gi // Common spam words
            ];

            const urlMatches = (formData.message.match(suspiciousPatterns[0]) || []).length;
            if (urlMatches > 2) {
                return {
                    isValid: false,
                    message: 'Your message contains too many links.'
                };
            }

            const spamWords = (formData.message.match(suspiciousPatterns[1]) || []).length;
            if (spamWords > 0) {
                return {
                    isValid: false,
                    message: 'Your message contains suspicious content.'
                };
            }
        }

        return { isValid: true };
    }
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.EmailService = EmailService;
}
