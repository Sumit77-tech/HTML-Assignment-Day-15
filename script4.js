// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // DOM Elements
  const usersTableBody = document.getElementById("users-body");
  
  // Fetch and display users with a timestamp
  function fetchUsers() {
    const usersRef = db.ref("users");
  
    usersRef.on("child_added", (snapshot) => {
      const user = snapshot.val();
      const key = snapshot.key;
      const row = document.createElement("tr");
      row.id = `user-${key}`;
  
      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;
  
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
  
      const lastUpdatedCell = document.createElement("td");
      lastUpdatedCell.textContent = new Date(user.timestamp).toLocaleString();
  
      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteUser(key);
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(lastUpdatedCell);
      row.appendChild(actionsCell);
      usersTableBody.appendChild(row);
    });
  
    usersRef.on("child_changed", (snapshot) => {
      const user = snapshot.val();
      const key = snapshot.key;
      const row = document.getElementById(`user-${key}`);
  
      if (row) {
        row.cells[0].textContent = user.name;
        row.cells[1].textContent = user.email;
        row.cells[2].textContent = new Date(user.timestamp).toLocaleString();
      }
    });
  
    usersRef.on("child_removed", (snapshot) => {
      const key = snapshot.key;
      const row = document.getElementById(`user-${key}`);
      if (row) {
        row.remove();
      }
    });
  }
  
  // Delete a user from Firebase
  function deleteUser(key) {
    const userRef = db.ref(`users/${key}`);
    userRef.remove()
      .then(() => {
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
  
  // Initial fetch of users
  fetchUsers();
  