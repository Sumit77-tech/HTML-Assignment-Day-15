const deleteUser = (key) => {
    fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("User deleted successfully");
  
        // Remove user row from the table
        const userRow = document.getElementById(`user-${key}`);
        if (userRow) {
          userRow.remove();
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };
  