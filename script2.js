// Your Firebase Realtime Database URL
const DATABASE_URL = "https://<YOUR-FIREBASE-APP>.firebaseio.com/users";

// DOM Elements
const usersTableBody = document.getElementById("users-body");
const editUserForm = document.getElementById("edit-user-form");
const messageElement = document.getElementById("message");
const editNameInput = document.getElementById("edit-name");
const editEmailInput = document.getElementById("edit-email");
const userIdInput = document.getElementById("user-id");
const cancelEditButton = document.getElementById("cancel-edit");

// Fetch and display users
function fetchUsers() {
  fetch(`${DATABASE_URL}.json`)
    .then((response) => response.json())
    .then((data) => {
      usersTableBody.innerHTML = ""; // Clear table body
      if (data) {
        for (const userId in data) {
          const user = data[userId];
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.textContent = user.name;

          const emailCell = document.createElement("td");
          emailCell.textContent = user.email;

          const actionsCell = document.createElement("td");
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.addEventListener("click", () => openEditForm(userId, user));
          actionsCell.appendChild(editButton);

          row.appendChild(nameCell);
          row.appendChild(emailCell);
          row.appendChild(actionsCell);
          usersTableBody.appendChild(row);
        }
      }
    })
    .catch((error) => {
      messageElement.style.color = "red";
      messageElement.textContent = `Error fetching users: ${error.message}`;
    });
}

// Open the edit form
function openEditForm(userId, user) {
  userIdInput.value = userId;
  editNameInput.value = user.name;
  editEmailInput.value = user.email;
  editUserForm.style.display = "block";
}

// Handle edit form submission
editUserForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const userId = userIdInput.value;
  const updatedUser = {
    name: editNameInput.value,
    email: editEmailInput.value,
  };

  fetch(`${DATABASE_URL}/${userId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      messageElement.style.color = "green";
      messageElement.textContent = "User updated successfully!";
      editUserForm.style.display = "none"; // Hide form
      fetchUsers(); // Refresh user table
    })
    .catch((error) => {
      messageElement.style.color = "red";
      messageElement.textContent = `Error updating user: ${error.message}`;
    });
});

// Cancel edit operation
cancelEditButton.addEventListener("click", () => {
  editUserForm.style.display = "none";
});

// Initial fetch of users
fetchUsers();
