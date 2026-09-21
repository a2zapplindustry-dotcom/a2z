/**
 * A To Z Appliance - Form Handler with Google Sheets Integration
 */

class DemoFormHandler {
  constructor() {
    this.form = document.getElementById('leadForm');
    this.submitBtn = document.getElementById('submitBtn');
    this.spinner = document.getElementById('spinner');
    this.googleSheetURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Update this
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.setupPhoneValidation();
  }
  
  setupPhoneValidation() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      if (e.target.value.length === 10) {
        e.target.classList.remove('is-invalid');
      }
    });
  }
  
  validateForm() {
    let isValid = true;
    const phone = document.getElementById('phone');
    const name = document.getElementById('name');
    const branch = document.getElementById('branch');
    
    // Name validation
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      isValid = false;
    } else {
      name.classList.remove('is-invalid');
    }
    
    // Phone validation (Indian numbers only)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.value)) {
      phone.classList.add('is-invalid');
      isValid = false;
    } else {
      phone.classList.remove('is-invalid');
    }
    
    // Branch validation
    if (!branch.value) {
      branch.classList.add('is-invalid');
      isValid = false;
    } else {
      branch.classList.remove('is-invalid');
    }
    
    return isValid;
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      this.showToast('Please fill all required fields correctly', 'error');
      return;
    }
    
    this.setLoading(true);
    
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      branch: document.getElementById('branch').value,
      product: document.getElementById('product').value,
      query: document.querySelector('textarea[name="query"]')?.value || '',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: window.location.href
    };
    
    try {
      const response = await this.submitToGoogleSheets(formData);
      this.showSuccess();
      this.form.reset();
      this.trackConversion();
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback: Show phone number
      this.showToast('Please call us directly at ' + BUSINESS_PHONE, 'info');
    } finally {
      this.setLoading(false);
    }
  }
  
  async submitToGoogleSheets(data) {
    if (this.googleSheetURL.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
      console.warn('Google Sheets URL not configured');
      // Simulate success for demo
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    const response = await fetch(this.googleSheetURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    return response;
  }
  
  setLoading(isLoading) {
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.spinner.classList.remove('d-none');
    } else {
      this.submitBtn.disabled = false;
      this.spinner.classList.add('d-none');
    }
  }
  
  showSuccess() {
    // Create success modal dynamically
    const modalHTML = `
      <div class="modal fade" id="successModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 rounded-4 p-4 text-center">
            <div class="modal-body">
              <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
              <h4 class="mt-3">Thank You!</h4>
              <p class="text-muted">We will call you back within <strong>30 minutes</strong>.</p>
              <p class="small text-muted">For urgent queries, call <a href="tel:7063686886">7063686886</a></p>
              <button class="btn btn-primary-custom mt-2" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Remove modal after close
    document.getElementById('successModal').addEventListener('hidden.bs.modal', function() {
      this.remove();
    });
  }
  
  showToast(message, type = 'info') {
    alert(message); // Simple fallback, can be replaced with proper toast
  }
  
  trackConversion() {
    // Google Ads Conversion Tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXX/XXXXXXXX',
        'event_callback': function() {}
      });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
  }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', () => {
  new DemoFormHandler();
});