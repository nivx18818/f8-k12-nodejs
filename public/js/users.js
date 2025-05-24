// Users handling functions
document.addEventListener("DOMContentLoaded", function () {
  // Delete user confirmation
  const deleteButtons = document.querySelectorAll(".delete-user");
  const confirmDeleteModal = document.getElementById("confirmDeleteModal");
  const cancelDeleteBtn = document.getElementById("cancelDelete");
  const confirmDeleteBtn = document.getElementById("confirmDelete");

  let currentUserId = null;

  // Open delete confirmation modal
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      currentUserId = this.getAttribute("data-id");
      const userName = this.getAttribute("data-name");

      // Update modal text with user name
      document.getElementById("deleteUserName").textContent = userName;

      // Show modal
      confirmDeleteModal.classList.add("show");
    });
  });

  // Close modal on cancel
  cancelDeleteBtn.addEventListener("click", function () {
    confirmDeleteModal.classList.remove("show");
  });

  // Handle delete confirmation
  confirmDeleteBtn.addEventListener("click", function () {
    // In a real app, you would send an AJAX request to delete the user
    console.log(`Deleting user with ID: ${currentUserId}`);

    // For demo: remove the user row from the table
    const userRow = document.querySelector(
      `tr[data-id="${currentUserId}"]`
    );
    if (userRow) {
      userRow.remove();
    }

    // Show success message (could be a toast notification in a real app)
    alert("User deleted successfully.");

    // Close modal
    confirmDeleteModal.classList.remove("show");
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === confirmDeleteModal) {
      confirmDeleteModal.classList.remove("show");
    }
  });

  // Filter functionality
  const filterForm = document.getElementById("filterForm");
  if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real application, you would gather form values and filter the data
      const name = document.getElementById("filterName").value;
      const category = document.getElementById("filterCategory").value;
      const status = document.getElementById("filterStatus").value;

      console.log("Filtering with:", { name, category, status });

      // For demo: show loading state
      document.querySelector(".table-container").classList.add("loading");

      // Simulate API call with timeout
      setTimeout(() => {
        // In a real app, this would update the table with filtered results
        document.querySelector(".table-container").classList.remove("loading");

        // For demo: show a message
        alert(
          `Applied filters: Name="${name}", Category="${category}", Status="${status}"`
        );
      }, 500);
    });
  }

  // Reset filters button
  const resetFiltersBtn = document.getElementById("resetFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", function () {
      // Reset form fields
      filterForm.reset();

      // In a real app, you would reset the data to unfiltered state
      console.log("Filters reset");
    });
  }

  // Pagination handling
  const paginationLinks = document.querySelectorAll(".pagination li a");
  if (paginationLinks) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all links
        paginationLinks.forEach((l) =>
          l.parentElement.classList.remove("active")
        );

        // Add active class to clicked link
        this.parentElement.classList.add("active");

        // In a real app, you would load the corresponding page data
        const page = this.getAttribute("data-page");
        console.log(`Loading page ${page}`);

        // For demo: show loading state
        document.querySelector(".table-container").classList.add("loading");

        // Simulate API call with timeout
        setTimeout(() => {
          document
            .querySelector(".table-container")
            .classList.remove("loading");
          document.querySelector(".pagination-info").textContent = `Showing ${
            page * 10 - 9
          }-${page * 10} of 56 users`;
        }, 300);
      });
    });
  }
});
