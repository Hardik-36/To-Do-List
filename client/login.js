document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      console.log('Form data:', formData);
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
  
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = "createprofile.html";
        }
      } else {
        console.log('Error during login:', response.status);
      }
    } catch (error) {
      console.log('Network error:', error.message);
    }
  });
  