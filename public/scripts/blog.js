let updateBtn = document.querySelector(".update");
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
