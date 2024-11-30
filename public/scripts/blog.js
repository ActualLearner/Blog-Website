let deleteBtn = document.querySelector(".delete");
let id = document.querySelector(".content").dataset.id;

deleteBtn.addEventListener("click", async () => {
  
  let url = `/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE"
    });

    if (response.status === 204) {
      console.log("Blog deleted successfully.");
      alert("Blog deleted successfully!");
      window.location.href = "/";
    } else {
      const data = await response.json();
      console.error("Error:", data.message);
      alert("Failed to delete blog.");
    }

  } catch (error) {
    console.error("Error:", error);  // Handle other errors
    alert("Failed to delete blog.");
  }
});


document.getElementById('updateForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = `/${id}`;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
      const response = await fetch(url, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
          alert('Blog updated successfully!');
          location.reload(); // Reload to show the updated content
      } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
      }
  } catch (error) {
      console.error('An error occurred:', error);
      alert('An unexpected error occurred.');
  }
});