// Your Firebase Realtime Database URL
const DATABASE_URL = "https://<YOUR-FIREBASE-APP>.firebaseio.com/users.json";

document.addEventListener("DOMContentLoaded", fetchUsers);

function fetchUsers() {
  const errorMessageElement = document.getElementById("error-message");
  const usersTableBody = document.getElementById("users-body");

  fetch(DATABASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        errorMessageElement.textContent = "No users found in the database.";
        return;
      }

      // Clear any previous error messages
      errorMessageElement.textContent = "";

      // Populate the table with user data
      for (const userId in data) {
        const user = data[userId];
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        usersTableBody.appendChild(row);
      }
    })
    .catch((error) => {
      errorMessageElement.textContent = `Error fetching users: ${error.message}`;
    });
}
