document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const formData = new FormData(event.target);

  try {
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
      window.location.href = 'createprofile.html';
    } else {
      console.log('Error during registration:', response.status);
    }
  } catch (error) {
    console.log('Network error:', error.message);
  }
});