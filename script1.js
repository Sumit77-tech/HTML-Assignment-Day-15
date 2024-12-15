// Your Firebase Realtime Database URL
const DATABASE_URL = "https://<YOUR-FIREBASE-APP>.firebaseio.com/users.json";

// Reference to the form
const userForm = document.getElementById("user-form");
const messageElement = document.getElementById("message");

// Handle form submission
userForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Create the user object
  const newUser = { name, email };

  // Send a POST request to Firebase
  fetch(DATABASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Show success message
      messageElement.style.color = "green";
      messageElement.textContent = "User added successfully!";
      userForm.reset(); // Clear the form
    })
    .catch((error) => {
      // Show error message
      messageElement.style.color = "red";
      messageElement.textContent = `Error adding user: ${error.message}`;
    });
});
