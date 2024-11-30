let updateBtn = document.querySelector(".update");
let deleteBtn = document.querySelector(".delete");
let id = document.querySelector(".content").dataset.id;

deleteBtn.addEventListener("click", async () => {

  await fetch(`http://localhost:3000/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.status === 204) {
        console.log("Blog deleted successfully.");
        alert("Blog deleted successfully!");
        window.location.href = "/"; // Redirect to home page after deletion
      } else {
        return response.json(); // Parse the error message from response
      }
    })
    .then(data => {
      if (data) {
        // If there's an error message, log it
        console.error("Error:", data.message);
        alert("Failed to delete blog.");
      }
    })
    .catch(error => {
      console.error("Error:", error);  // Handle other errors
      alert("Failed to delete blog.");
    });
})