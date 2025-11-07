// Replace this with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydHh6TBfN96hIBvwEW-uIzS-tQ3XKMVZQvkkKx5NiukIlhwzA--FVbGpstKkUCEntBeg/exec';

document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMessage');
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusMsg.style.display = 'none';
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        college: document.getElementById('college').value,
        event: document.getElementById('event').value,
        timestamp: new Date().toLocaleString()
    };
    
    try {
        // Send data to Google Sheets
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        statusMsg.textContent = 'Registration successful! We will contact you soon.';
        statusMsg.style.display = 'block';
        statusMsg.style.backgroundColor = '#d4edda';
        statusMsg.style.color = '#155724';
        statusMsg.style.border = '1px solid #c3e6cb';
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        // Show error message
        statusMsg.textContent = 'Registration failed. Please try again.';
        statusMsg.style.display = 'block';
        statusMsg.style.backgroundColor = '#f8d7da';
        statusMsg.style.color = '#721c24';
        statusMsg.style.border = '1px solid #f5c6cb';
        
        console.error('Error:', error);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 5000);
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
    }
});